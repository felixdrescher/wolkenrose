import React, { useEffect, useMemo } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Tag,
  Camera,
  Quote,
  Maximize2
} from 'lucide-react';

export default function ArticleModal({
  post,
  profile,
  onClose,
  onSelectEmbeddedPhoto
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [post]);

  // Build gallery-style photo objects for all pictures inside this blogpost
  const postPhotos = useMemo(() => {
    if (!post) return [];
    const list = [];
    if (post.coverImage) {
      list.push({
        id: `${post.id}-cover`,
        title: post.title,
        category: post.category || 'Blogbeitrag',
        location: post.location || '',
        dateTaken: post.publishedAt || '',
        imageUrl: post.coverImage,
        story: post.subtitle || ''
      });
    }
    (post.blocks || []).forEach((block, idx) => {
      if (block.type === 'image' && block.imageUrl) {
        list.push({
          id: block.id || `${post.id}-img-${idx}`,
          title: block.caption || post.title,
          category: post.category || 'Blogbeitrag',
          location: post.location || '',
          dateTaken: post.publishedAt || '',
          imageUrl: block.imageUrl,
          story: block.exifNote
            ? `Aufnahmedaten: ${block.exifNote}`
            : block.caption || ''
        });
      }
    });
    return list;
  }, [post]);

  if (!post) return null;

  const handleOpenImage = (imageUrl, caption, exifNote) => {
    if (!onSelectEmbeddedPhoto) return;
    const found = postPhotos.find((p) => p.imageUrl === imageUrl) || {
      id: `blog-img-${Date.now()}`,
      title: caption || post.title,
      category: post.category || 'Blogbeitrag',
      location: post.location || '',
      dateTaken: post.publishedAt || '',
      imageUrl,
      story: exifNote ? `Aufnahmedaten: ${exifNote}` : caption || ''
    };
    onSelectEmbeddedPhoto(found, postPhotos);
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="max-w-4xl mx-auto my-0 sm:my-8 bg-[var(--bg-secondary)] sm:rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-2xl text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Bar */}
        <div
          style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--border-color)' }}
          className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 backdrop-blur-xl border-b"
        >
          <div className="flex items-center gap-3">
            <span
              style={{
                borderColor: 'var(--accent-primary)',
                color: 'var(--accent-primary)',
                backgroundColor: 'var(--surface-subtle)'
              }}
              className="px-3 py-1 rounded-full text-xs font-telemetry border"
            >
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[var(--surface-subtle)] hover:opacity-80 text-[var(--text-primary)] border border-[var(--border-color)] transition-colors cursor-pointer"
              aria-label="Artikel schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cover Image Hero (Clickable for full picture view) */}
        <div
          onClick={() => handleOpenImage(post.coverImage, post.title, '')}
          className="group relative aspect-[16/9] bg-black overflow-hidden cursor-pointer"
          title="Klicken für Großansicht"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div
            style={{
              background:
                'linear-gradient(to top, var(--bg-secondary) 2%, transparent 65%)'
            }}
            className="absolute inset-0"
          />
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-white text-xs font-telemetry flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity border border-white/15">
            <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Großansicht öffnen</span>
          </div>
        </div>

        {/* Article Header & Content */}
        <div className="px-6 sm:px-14 pb-16 -mt-12 relative z-10 space-y-10">
          {/* Header Meta */}
          <div className="space-y-4 border-b border-[var(--border-color)] pb-8">
            <div className="flex flex-wrap items-center gap-4 text-xs font-telemetry text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5 text-[var(--accent-secondary)]">
                <MapPin className="w-3.5 h-3.5" />
                {post.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                {post.publishedAt}
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-medium text-[var(--text-primary)] leading-[1.08]">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-base sm:text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                {post.subtitle}
              </p>
            )}

            {/* Author Byline */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    borderColor: 'var(--accent-primary)',
                    color: 'var(--accent-primary)',
                    backgroundColor: 'var(--surface-subtle)'
                  }}
                  className="w-9 h-9 rounded-full border flex items-center justify-center font-editorial text-lg font-semibold"
                >
                  {(profile?.name || 'P')[0]}
                </div>
                <div>
                  <span className="block text-xs font-semibold text-[var(--text-primary)]">
                    {profile?.name || 'Petra Schemmel'} · Wolkenrose - Fotografie
                  </span>
                  <span className="block text-[11px] font-telemetry text-[var(--text-secondary)]">
                    Fotografisches Essay
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rich Content Blocks */}
          <div className="space-y-8">
            {(post.blocks || []).map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2
                    key={block.id || index}
                    className="font-editorial text-2xl sm:text-4xl font-medium text-[var(--text-primary)] pt-4"
                  >
                    {block.content}
                  </h2>
                );
              }

              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={block.id || index}
                    style={{ borderLeftColor: 'var(--accent-primary)' }}
                    className="my-8 p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border-l-4 space-y-3 border border-[var(--border-color)]"
                  >
                    <Quote className="w-6 h-6 text-[var(--accent-primary)] opacity-70" />
                    <p className="font-editorial italic text-xl sm:text-2xl text-[var(--text-primary)] leading-relaxed">
                      „{block.content}“
                    </p>
                    {block.author && (
                      <footer className="font-telemetry text-xs text-[var(--accent-primary)]">
                        — {block.author}
                      </footer>
                    )}
                  </blockquote>
                );
              }

              if (block.type === 'image') {
                return (
                  <figure
                    key={block.id || index}
                    onClick={() =>
                      handleOpenImage(block.imageUrl, block.caption, block.exifNote)
                    }
                    className="group my-10 rounded-2xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all cursor-pointer"
                    title="Klicken, um das Bild in der Großansicht zu öffnen"
                  >
                    <div className="relative overflow-hidden bg-black">
                      <img
                        src={block.imageUrl}
                        alt={block.caption || post.title}
                        className="w-full max-h-[640px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-telemetry flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity border border-white/15">
                        <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                        <span>Großansicht</span>
                      </div>
                    </div>
                    {(block.caption || block.exifNote) && (
                      <figcaption className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
                        <span className="text-xs sm:text-sm text-[var(--text-primary)]">
                          {block.caption}
                        </span>
                        {block.exifNote && (
                          <span className="inline-flex items-center gap-1.5 font-telemetry text-[11px] text-[var(--accent-primary)] shrink-0">
                            <Camera className="w-3.5 h-3.5" />
                            {block.exifNote}
                          </span>
                        )}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              // Default: paragraph
              return (
                <p
                  key={block.id || index}
                  className="text-base sm:text-lg text-[var(--text-primary)] opacity-90 leading-[1.85] font-light whitespace-pre-line"
                >
                  {block.content}
                </p>
              );
            })}
          </div>

          {/* Tags & Footer */}
          <div className="pt-8 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(post.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-telemetry bg-[var(--surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                >
                  <Tag className="w-3 h-3 text-[var(--accent-primary)]" />
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[var(--surface-subtle)] hover:opacity-80 text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
            >
              Beitrag schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
