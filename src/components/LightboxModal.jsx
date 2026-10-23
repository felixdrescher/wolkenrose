import React, { useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  Calendar,
  Download
} from 'lucide-react';

function hasAnyExif(exif) {
  if (!exif) return false;
  return Boolean(
    exif.camera ||
      exif.lens ||
      exif.focalLength ||
      exif.aperture ||
      exif.shutterSpeed ||
      exif.iso
  );
}

export default function LightboxModal({
  photo,
  photos,
  onClose,
  onSelectPhoto
}) {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = () => {
    if (!photos || photos.length <= 1) return;
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIdx]);
  };

  const handleNext = () => {
    if (!photos || photos.length <= 1) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos]);

  const showExifSection = hasAnyExif(photo.exif);
  const hasOpticalParams = Boolean(
    photo.exif?.focalLength ||
      photo.exif?.aperture ||
      photo.exif?.shutterSpeed ||
      photo.exif?.iso
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden"
      onClick={onClose}
    >
      {/* Left/Center High-Res Image Viewport */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 min-h-[55vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prev Arrow */}
        {photos && photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-[var(--accent-primary)] text-white hover:text-[#0B0E0C] border border-white/15 transition-all cursor-pointer"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="max-h-[84vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
        />

        {/* Next Arrow */}
        {photos && photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-[var(--accent-primary)] text-white hover:text-[#0B0E0C] border border-white/15 transition-all cursor-pointer"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Right Technical & Story Inspection Sidebar */}
      <aside
        className="w-full lg:w-[420px] bg-[var(--bg-secondary)] text-[var(--text-primary)] border-t lg:border-t-0 lg:border-l border-[var(--border-color)] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header & Close */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
            <span
              style={{
                borderColor: 'var(--accent-primary)',
                color: 'var(--accent-primary)',
                backgroundColor: 'var(--surface-subtle)'
              }}
              className="px-3 py-1 rounded-full text-xs font-telemetry border"
            >
              {photo.category || 'Fotografie'}
            </span>
            <div className="flex items-center gap-2">
              {photos && photos.length > 1 && currentIndex !== -1 && (
                <span className="font-telemetry text-xs text-[var(--text-secondary)]">
                  {currentIndex + 1} / {photos.length}
                </span>
              )}
              <button
                onClick={onClose}
                className="hidden lg:inline-flex p-2 rounded-full bg-[var(--surface-subtle)] hover:opacity-80 text-[var(--text-primary)] border border-[var(--border-color)] transition-colors cursor-pointer"
                aria-label="Schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title & Location */}
          <div className="space-y-2">
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[var(--text-primary)] leading-tight">
              {photo.title}
            </h2>
            {(photo.location || photo.dateTaken) && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)]">
                {photo.location && (
                  <span className="flex items-center gap-1.5 text-[var(--accent-secondary)]">
                    <MapPin className="w-3.5 h-3.5" />
                    {photo.location}
                  </span>
                )}
                {photo.location && photo.dateTaken && <span>•</span>}
                {photo.dateTaken && (
                  <span className="flex items-center gap-1 font-telemetry">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    {photo.dateTaken}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Story Behind the Shot */}
          {photo.story && (
            <div className="space-y-2 bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)]">
              <span className="font-telemetry text-[10px] uppercase tracking-widest text-[var(--accent-primary)] block">
                Beschreibung
              </span>
              <p className="text-sm text-[var(--text-primary)] opacity-90 leading-relaxed">
                {photo.story}
              </p>
            </div>
          )}

          {/* Optical & Camera EXIF Telemetry (only shown when present) */}
          {showExifSection && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                <Camera className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Technische EXIF-Daten</span>
              </div>

              {(photo.exif?.camera || photo.exif?.lens) && (
                <div className="grid grid-cols-2 gap-2.5 font-telemetry text-xs">
                  {photo.exif?.camera && (
                    <div className="bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-color)]">
                      <span className="block text-[10px] text-[var(--text-secondary)]">KAMERAGEHÄUSE</span>
                      <span className="text-[var(--text-primary)] font-medium mt-0.5 block">
                        {photo.exif.camera}
                      </span>
                    </div>
                  )}
                  {photo.exif?.lens && (
                    <div className="bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-color)]">
                      <span className="block text-[10px] text-[var(--text-secondary)]">OBJEKTIV</span>
                      <span className="text-[var(--text-primary)] font-medium mt-0.5 block">
                        {photo.exif.lens}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {hasOpticalParams && (
                <div className="grid grid-cols-4 gap-2 text-center font-telemetry text-xs bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-color)]">
                  <div>
                    <span className="block text-[10px] text-[var(--text-secondary)]">BRENNW.</span>
                    <span className="text-[var(--accent-primary)] font-semibold">
                      {photo.exif?.focalLength || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[var(--text-secondary)]">BLENDE</span>
                    <span className="text-[var(--accent-primary)] font-semibold">
                      {photo.exif?.aperture || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[var(--text-secondary)]">BELICHTUNG</span>
                    <span className="text-[var(--accent-primary)] font-semibold">
                      {photo.exif?.shutterSpeed || '—'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[var(--text-secondary)]">ISO</span>
                    <span className="text-[var(--accent-primary)] font-semibold">
                      {photo.exif?.iso || '—'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center gap-3">
          <a
            href={photo.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full hover:opacity-90 font-semibold text-xs transition-all"
            title="Originalbild in voller Auflösung öffnen"
          >
            <Download className="w-4 h-4" />
            <span>Originalbild öffnen</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full bg-[var(--surface-subtle)] hover:opacity-80 text-[var(--text-primary)] border border-[var(--border-color)] text-xs font-medium transition-colors cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </aside>
    </div>
  );
}
