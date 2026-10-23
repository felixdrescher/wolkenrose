import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  LayoutGrid,
  Rows,
  SlidersHorizontal,
  Maximize2
} from 'lucide-react';

function formatOpticalSummary(exif) {
  if (!exif) return '';
  return [exif.focalLength, exif.aperture, exif.shutterSpeed]
    .filter(Boolean)
    .join(' · ');
}

export default function GalleryView({
  photos,
  categories: managedCategories = [],
  onSelectPhoto
}) {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'cinematic'

  const categories = useMemo(() => {
    const set = new Set(managedCategories);
    photos.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['Alle', ...Array.from(set)];
  }, [managedCategories, photos]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory('Alle');
    }
  }, [categories, selectedCategory]);

  const filteredPhotos = useMemo(() => {
    return photos
      .filter((p) => {
        const matchesCat =
          selectedCategory === 'Alle' || p.category === selectedCategory;
        const q = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          p.title?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.story?.toLowerCase().includes(q) ||
          p.exif?.camera?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q);
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
        }
        return (b.dateTaken || '').localeCompare(a.dateTaken || '');
      });
  }, [photos, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Gallery Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[var(--border-color)] pb-8">
        <div className="space-y-3">
          <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-[var(--accent-primary)] block">
            Wolkenrose · gesamte Galerie
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[var(--text-primary)]">
            Alles auf einen Blick
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            Jedes Bild ist mit vollständigen EXIF-Aufnahmedaten, Entstehungsort und zusätzlichen Informationen hinterlegt. Klicke auf ein Foto, um es in der Großansicht zu betrachten.
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Suchen..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none focus:border-[var(--accent-primary)]"
            />
          </div>

          {/* Sort & Layout Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full px-3.5 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                  Sortierung: Highlights zuerst
                </option>
                <option value="newest" className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                  Sortierung: Neueste Aufnahmen
                </option>
              </select>
            </div>

            <div className="flex items-center bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                style={
                  viewMode === 'grid'
                    ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                    : { color: 'var(--text-secondary)' }
                }
                className="p-2 rounded-full transition-colors cursor-pointer"
                title="Rasteransicht"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cinematic')}
                style={
                  viewMode === 'cinematic'
                    ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                    : { color: 'var(--text-secondary)' }
                }
                className="p-2 rounded-full transition-colors cursor-pointer"
                title="Großformat-Ansicht"
              >
                <Rows className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={
                  active
                    ? {
                        backgroundColor: 'var(--accent-primary)',
                        borderColor: 'var(--accent-primary)',
                        color: '#0B0E0C'
                      }
                    : {
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-secondary)'
                      }
                }
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  active ? 'font-semibold shadow-sm' : 'hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 ? (
        <div className="rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-16 text-center space-y-4">
          <p className="font-editorial text-3xl text-[var(--text-primary)]">
            Keine Fotos für diesen Filter gefunden
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Setze verwendete Filter zurück, um wieder mehr zu sehen.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedCategory('Alle');
                setSearchQuery('');
              }}
              style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPhotos.map((photo) => {
            const opticalStr = formatOpticalSummary(photo.exif);
            const showExifBar = Boolean(photo.exif?.camera || opticalStr);

            return (
              <article
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="group rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all duration-500 cursor-pointer flex flex-col shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 opacity-75 group-hover:opacity-55 transition-opacity" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    {photo.category ? (
                      <span className="px-3 py-1 rounded-full text-[11px] font-telemetry bg-black/65 backdrop-blur-md text-white border border-white/10">
                        {photo.category}
                      </span>
                    ) : (
                      <span />
                    )}
                    {photo.featured && (
                      <span
                        style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                        className="px-2.5 py-1 rounded-full text-[10px] font-telemetry uppercase font-semibold"
                      >
                        Highlight
                      </span>
                    )}
                  </div>

                  {/* Bottom EXIF Strip (optional) */}
                  {showExifBar && (
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-telemetry text-white/95 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <span className="truncate max-w-[48%]">{photo.exif?.camera || ''}</span>
                      {opticalStr && (
                        <span className="text-[var(--accent-primary)] shrink-0">
                          {opticalStr}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {(photo.location || photo.dateTaken) && (
                      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-1">
                        {photo.location ? (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                            {photo.location}
                          </span>
                        ) : (
                          <span />
                        )}
                        {photo.dateTaken && (
                          <span className="font-telemetry text-[11px]">{photo.dateTaken}</span>
                        )}
                      </div>
                    )}
                    <h2 className="font-editorial text-2xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {photo.title}
                    </h2>
                  </div>
                  {photo.story && (
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {photo.story}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Cinematic Large Plates Layout */
        <div className="space-y-12">
          {filteredPhotos.map((photo, index) => {
            const opticalStr = formatOpticalSummary(photo.exif);
            const showExifBoxes = Boolean(photo.exif?.camera || opticalStr);

            return (
              <article
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="group rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 shadow-sm"
              >
                <div className="lg:col-span-8 relative aspect-[16/10] bg-black overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-telemetry bg-black/70 backdrop-blur-md text-[var(--accent-primary)] border border-white/10">
                    Werk #{String(index + 1).padStart(2, '0')}
                    {photo.category ? ` · ${photo.category}` : ''}
                  </span>
                </div>

                <div className="lg:col-span-4 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {(photo.location || photo.dateTaken) && (
                      <div className="flex items-center justify-between text-xs font-telemetry text-[var(--text-secondary)]">
                        {photo.location ? (
                          <span className="flex items-center gap-1.5 text-[var(--accent-secondary)]">
                            <MapPin className="w-3.5 h-3.5" />
                            {photo.location}
                          </span>
                        ) : (
                          <span />
                        )}
                        {photo.dateTaken && <span>{photo.dateTaken}</span>}
                      </div>
                    )}
                    <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {photo.title}
                    </h2>
                    {photo.story && (
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {photo.story}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
                    {showExifBoxes && (
                      <div className="grid grid-cols-2 gap-2 font-telemetry text-xs">
                        {photo.exif?.camera && (
                          <div className="bg-[var(--surface-subtle)] p-2.5 rounded-lg border border-[var(--border-color)]">
                            <span className="block text-[10px] text-[var(--text-secondary)]">KAMERA</span>
                            <span className="text-[var(--text-primary)]">{photo.exif.camera}</span>
                          </div>
                        )}
                        {opticalStr && (
                          <div className="bg-[var(--surface-subtle)] p-2.5 rounded-lg border border-[var(--border-color)]">
                            <span className="block text-[10px] text-[var(--text-secondary)]">EINSTELLUNG</span>
                            <span className="text-[var(--accent-primary)]">{opticalStr}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-end">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)]">
                        <Maximize2 className="w-3.5 h-3.5" /> Großansicht öffnen
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
