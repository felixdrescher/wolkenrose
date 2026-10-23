import exifr from 'exifr';

function formatShutterSpeed(exposureTime) {
  if (!exposureTime || typeof exposureTime !== 'number' || exposureTime <= 0) {
    return '';
  }
  if (exposureTime >= 1) {
    return `${Number(exposureTime.toFixed(1))}s`;
  }
  const denominator = Math.round(1 / exposureTime);
  return `1/${denominator}s`;
}

function formatAperture(fNumber) {
  if (!fNumber || typeof fNumber !== 'number' || fNumber <= 0) {
    return '';
  }
  const rounded = Math.round(fNumber * 10) / 10;
  return `f/${rounded}`;
}

function formatFocalLength(focal) {
  if (!focal || typeof focal !== 'number' || focal <= 0) {
    return '';
  }
  return `${Math.round(focal)}mm`;
}

function formatExifDate(rawDate) {
  if (!rawDate) return { dateTaken: '', timeTaken: '' };
  let dateObj = null;

  if (rawDate instanceof Date && !Number.isNaN(rawDate.getTime())) {
    dateObj = rawDate;
  } else if (typeof rawDate === 'string') {
    // Handle EXIF string format "YYYY:MM:DD HH:MM:SS"
    const normalized = rawDate.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3');
    const parsed = new Date(normalized);
    if (!Number.isNaN(parsed.getTime())) {
      dateObj = parsed;
    }
  }

  if (!dateObj) return { dateTaken: '', timeTaken: '' };

  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const hh = String(dateObj.getHours()).padStart(2, '0');
  const min = String(dateObj.getMinutes()).padStart(2, '0');

  return {
    dateTaken: `${yyyy}-${mm}-${dd}`,
    timeTaken: `${hh}:${min} Uhr`
  };
}

async function reverseGeocode(lat, lon) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
        lat
      )}&lon=${encodeURIComponent(lon)}&zoom=12&accept-language=de`,
      {
        signal: controller.signal,
        headers: {
          Accept: 'application/json'
        }
      }
    );
    clearTimeout(timeout);
    if (!res.ok) return '';
    const data = await res.json();
    const addr = data?.address || {};
    const locality =
      addr.natural ||
      addr.peak ||
      addr.mountain_range ||
      addr.national_park ||
      addr.island ||
      addr.village ||
      addr.town ||
      addr.city ||
      addr.municipality ||
      addr.county ||
      data?.name ||
      '';
    const region = addr.state || addr.region || '';
    const country = addr.country || '';

    const parts = [locality, region, country].filter(Boolean);
    // Deduplicate identical adjacent parts
    const uniqueParts = parts.filter((part, idx) => parts.indexOf(part) === idx);
    return uniqueParts.slice(0, 2).join(', ');
  } catch {
    return '';
  }
}

/**
 * Extracts EXIF optical parameters, creation date/time,
 * and place of creation from an image File object.
 */
export async function extractImageMetadata(file) {
  const result = {
    foundExif: false,
    dateTaken: '',
    timeTaken: '',
    location: '',
    exif: {
      camera: '',
      lens: '',
      focalLength: '',
      aperture: '',
      shutterSpeed: '',
      iso: ''
    },
    exifNote: ''
  };

  if (!file) return result;

  try {
    const parsed = await exifr.parse(file, {
      tiff: true,
      exif: true,
      gps: true,
      iptc: true,
      xmp: true
    });

    if (!parsed) return result;

    // 1. Camera Make + Model
    const make = (parsed.Make || '').toString().trim();
    const model = (parsed.Model || '').toString().trim();
    let camera = '';
    if (make && model) {
      if (model.toLowerCase().startsWith(make.toLowerCase())) {
        camera = model;
      } else {
        camera = `${make} ${model}`;
      }
    } else {
      camera = model || make;
    }

    // 2. Lens
    const lens = (
      parsed.LensModel ||
      parsed.Lens ||
      parsed.LensInfo ||
      ''
    )
      .toString()
      .trim();

    // 3. Focal length, Aperture, Shutter Speed, ISO
    const focalLength = formatFocalLength(
      parsed.FocalLength || parsed.FocalLengthIn35mmFormat
    );
    const aperture = formatAperture(parsed.FNumber || parsed.ApertureValue);
    const shutterSpeed = formatShutterSpeed(parsed.ExposureTime);
    const rawIso =
      parsed.ISO ??
      parsed.ISOSpeedRatings ??
      parsed.PhotographicSensitivity ??
      '';
    const iso = Array.isArray(rawIso)
      ? String(rawIso[0] || '')
      : rawIso
        ? String(rawIso)
        : '';

    // 4. Date & Time of creation
    const rawDate =
      parsed.DateTimeOriginal || parsed.CreateDate || parsed.ModifyDate;
    const { dateTaken, timeTaken } = formatExifDate(rawDate);

    // 5. Place of creation
    const lat = parsed.latitude;
    const lon = parsed.longitude;

    // Check IPTC / XMP location fields first
    const iptcParts = [
      parsed.SubLocation || parsed.Location,
      parsed.City,
      parsed.ProvinceState || parsed.State,
      parsed.CountryPrimaryLocationName || parsed.Country
    ]
      .map((s) => (s ? String(s).trim() : ''))
      .filter(Boolean);

    let location = iptcParts.slice(0, 2).join(', ');

    if (!location && typeof lat === 'number' && typeof lon === 'number') {
      location = await reverseGeocode(lat, lon);
    }

    result.exif = {
      camera,
      lens,
      focalLength,
      aperture,
      shutterSpeed,
      iso
    };
    result.dateTaken = dateTaken;
    result.timeTaken = timeTaken;
    result.location = location;

    const noteParts = [
      camera,
      lens,
      focalLength,
      aperture,
      shutterSpeed,
      iso ? `ISO ${iso}` : '',
      location,
      dateTaken ? (timeTaken ? `${dateTaken} (${timeTaken})` : dateTaken) : ''
    ].filter(Boolean);

    result.exifNote = noteParts.join(' · ');
    result.foundExif = Boolean(
      camera ||
        lens ||
        focalLength ||
        aperture ||
        shutterSpeed ||
        iso ||
        dateTaken ||
        location
    );

    return result;
  } catch {
    return result;
  }
}
