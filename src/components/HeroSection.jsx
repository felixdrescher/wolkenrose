import React, { useMemo } from 'react';
import {
  MapPin,
  Camera,
  ArrowUpRight,
  Maximize2,
  BookOpen
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

function formatOpticalSummary(exif) {
  if (!exif) return '';
  return [exif.focalLength, exif.aperture, exif.shutterSpeed]
    .filter(Boolean)
    .join(' · ');
}

export default function HeroSection({
  photos,
  posts,
  onSelectPhoto,
  onSelectPost,
  onNavigate
}) {
  const activeHero = photos.find((p) => p.featured) || photos[0];

  // 6 selected photos for the landing page ("01 / Ausgewählte Fotografien")
  const selectedLandingPhotos = useMemo(() => {
    const picked = photos.filter((p) => p.landingSelected);
    return (picked.length > 0 ? picked : photos).slice(0, 6);
  }, [photos]);

  // Latest blog entries sorted by date descending
  const latestPosts = useMemo(() => {
    return [...posts].sort((a, b) =>
      (b.publishedAt || '').localeCompare(a.publishedAt || '')
    );
  }, [posts]);

  const heroHasExif = hasAnyExif(activeHero?.exif);

  return (
    <div className="space-y-24 pb-20">
      {/* Main Full-Bleed Exhibition Hero */}
      {activeHero && (
        <section className="relative min-h-[82vh] flex items-end overflow-hidden border-b border-[var(--border-color)]">
          {/* Background Image Layer with lighter vignette */}
          <div className="absolute inset-0 z-0">
            <img
              src={activeHero.imageUrl}
              alt={activeHero.title}
              className="w-full h-full object-cover object-center scale-[1.01] transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-14 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              {/* Left Column: Editorial Headline */}
              <div className="lg:col-span-8 space-y-6">
                {activeHero.location && (
                  <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15">
                    <span className="font-telemetry text-xs text-white/95 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                      {activeHero.location}
                    </span>
                  </div>
                )}

                <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.05] drop-shadow-md">
                  {activeHero.title}
                </h1>

                {activeHero.story && (
                  <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed font-light drop-shadow">
                    {activeHero.story}
                  </p>
                )}

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => onSelectPhoto(activeHero)}
                    style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full hover:opacity-90 font-semibold text-sm transition-all shadow-xl cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Großansicht öffnen</span>
                  </button>

                  <button
                    onClick={() => onNavigate('gallery')}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-white border border-white/25 font-medium text-sm transition-all cursor-pointer"
                  >
                    <span>Gesamte Galerie entdecken</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--accent-primary)]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Live Camera EXIF Telemetry Card */}
              <div className="lg:col-span-4">
                {heroHasExif && (
                  <div className="bg-black/70 backdrop-blur-xl border border-white/15 rounded-2xl p-6 space-y-4 shadow-2xl text-white">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                        <Camera className="w-4 h-4" />
                        <span className="font-telemetry text-xs uppercase tracking-widest">
                          Aufnahmedaten
                        </span>
                      </div>
                    </div>

                    {(activeHero.exif?.camera || activeHero.exif?.lens) && (
                      <div className="grid grid-cols-2 gap-3 font-telemetry text-xs">
                        {activeHero.exif?.camera && (
                          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                            <span className="block text-[10px] uppercase text-white/60">Kamera</span>
                            <span className="text-white font-medium mt-0.5 block truncate">
                              {activeHero.exif.camera}
                            </span>
                          </div>
                        )}
                        {activeHero.exif?.lens && (
                          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                            <span className="block text-[10px] uppercase text-white/60">Objektiv</span>
                            <span className="text-white font-medium mt-0.5 block truncate">
                              {activeHero.exif.lens}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {(activeHero.exif?.focalLength ||
                      activeHero.exif?.aperture ||
                      activeHero.exif?.shutterSpeed ||
                      activeHero.exif?.iso) && (
                      <div className="grid grid-cols-4 gap-2 text-center font-telemetry text-xs bg-white/5 rounded-xl p-3 border border-white/10">
                        <div>
                          <span className="block text-[10px] text-white/60">BRENNW.</span>
                          <span className="text-[var(--accent-primary)] font-medium">
                            {activeHero.exif?.focalLength || '—'}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-white/60">BLENDE</span>
                          <span className="text-[var(--accent-primary)] font-medium">
                            {activeHero.exif?.aperture || '—'}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-white/60">ZEIT</span>
                          <span className="text-[var(--accent-primary)] font-medium">
                            {activeHero.exif?.shutterSpeed || '—'}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-white/60">ISO</span>
                          <span className="text-[var(--accent-primary)] font-medium">
                            {activeHero.exif?.iso || '—'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 01 / Ausgewählte Fotografien */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-color)] pb-8">
          <div>
            <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-[var(--accent-primary)] block mb-2">
              01 / Ausgewählte Fotografien
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium text-[var(--text-primary)]">
              Naturfotografie und mehr
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:opacity-90 transition-all cursor-pointer"
            >
              <span>Alle Werke ansehen</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--accent-primary)]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {selectedLandingPhotos.map((photo) => {
            const opticalStr = formatOpticalSummary(photo.exif);
            const showExifBar = Boolean(photo.exif?.camera || opticalStr);

            return (
              <article
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all duration-500 cursor-pointer flex flex-col shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  {photo.category && (
                    <div className="absolute top-3.5 left-3.5 flex items-center">
                      <span className="px-3 py-1 rounded-full text-[11px] font-telemetry bg-black/65 backdrop-blur-md text-white border border-white/10">
                        {photo.category}
                      </span>
                    </div>
                  )}

                  {/* Bottom EXIF Telemetry Bar */}
                  {showExifBar && (
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-telemetry text-white/95 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <span className="truncate">{photo.exif?.camera || ''}</span>
                      {opticalStr && (
                        <span className="text-[var(--accent-primary)] shrink-0 ml-2">
                          {opticalStr}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {photo.location && (
                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                        <span>{photo.location}</span>
                      </div>
                    )}
                    <h3 className="font-editorial text-2xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {photo.title}
                    </h3>
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
      </section>

      {/* 02 / Ausgewählte Blogposts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-color)] pb-8">
          <div>
            <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-[var(--accent-secondary)] block mb-2">
              02 / Ausgewählte Blogposts
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium text-[var(--text-primary)]">
              Der Wolkenrose Blog
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('journal')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:opacity-90 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Alle Beiträge lesen</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Latest Lead Story */}
          {latestPosts[0] && (
            <article
              onClick={() => onSelectPost(latestPosts[0])}
              className="lg:col-span-7 group rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all cursor-pointer flex flex-col shadow-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={latestPosts[0].coverImage}
                  alt={latestPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                    className="px-3 py-1 rounded-full text-xs font-telemetry font-semibold"
                  >
                    Aktueller Beitrag
                  </span>
                  {latestPosts[0].category && (
                    <span className="px-3 py-1 rounded-full text-xs font-telemetry bg-black/70 backdrop-blur-md text-white">
                      {latestPosts[0].category}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-telemetry text-[var(--text-secondary)]">
                    {latestPosts[0].publishedAt && <span>{latestPosts[0].publishedAt}</span>}
                    {latestPosts[0].publishedAt && latestPosts[0].location && <span>•</span>}
                    {latestPosts[0].location && <span>{latestPosts[0].location}</span>}
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-4xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
                    {latestPosts[0].title}
                  </h3>
                  {latestPosts[0].subtitle && (
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {latestPosts[0].subtitle}
                    </p>
                  )}
                </div>
                <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {(latestPosts[0].tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-telemetry px-2.5 py-0.5 rounded-md bg-[var(--surface-subtle)] text-[var(--text-secondary)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform">
                    Beitrag lesen <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Side Stack of 3 Recent Blog Posts */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {latestPosts.slice(1, 4).map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="group rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all cursor-pointer p-5 flex flex-col sm:flex-row gap-5 items-center shadow-sm flex-1"
              >
                <div className="w-full sm:w-40 h-40 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-black">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-telemetry text-[var(--accent-primary)]">
                    {post.category && <span>{post.category}</span>}
                    {post.category && post.publishedAt && <span>•</span>}
                    {post.publishedAt && (
                      <span className="text-[var(--text-secondary)]">{post.publishedAt}</span>
                    )}
                  </div>
                  <h3 className="font-editorial text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.subtitle && (
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {post.subtitle}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
