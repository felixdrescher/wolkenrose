import React, { useState, useMemo } from 'react';
import {
  MapPin,
  ArrowUpRight,
  Search,
  Tag
} from 'lucide-react';

export default function BlogView({
  posts,
  onSelectPost
}) {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set([
      'Reisetagebuch',
      'Hinter der Kamera',
      'Ausrüstung & Technik',
      'Naturschutz'
    ]);
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['Alle', ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat =
        selectedCategory === 'Alle' || post.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const bodyText = (post.blocks || [])
        .map((b) => `${b.content || ''} ${b.caption || ''}`)
        .join(' ')
        .toLowerCase();
      const matchesQuery =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.subtitle?.toLowerCase().includes(q) ||
        post.location?.toLowerCase().includes(q) ||
        bodyText.includes(q) ||
        (post.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  const leadPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[var(--border-color)] pb-8">
        <div className="space-y-3">
          <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-[var(--accent-secondary)] block">
            Wolkenrose · alle Blogposts
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[var(--text-primary)]">
            Welcome to my blog!
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            Reiseberichte, Gedanken hinter der Kamera und fotografische Essays mit Texten und großformatigen Naturaufnahmen.
          </p>
        </div>
      </div>

      {/* Search & Category Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
                  active ? 'font-semibold' : 'hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Beiträge, Schlagworte oder Orte suchen..."
            className="w-full pl-11 pr-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none focus:border-[var(--accent-primary)]"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-16 text-center space-y-4">
          <p className="font-editorial text-3xl text-[var(--text-primary)]">
            Keine Blogeinträge gefunden
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Setze den Filter zurück, um wieder mehr zu sehen
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Alle');
              setSearchQuery('');
            }}
            style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
            className="px-6 py-3 rounded-full text-xs font-semibold cursor-pointer"
          >
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Featured Cover Story */}
          {leadPost && (
            <article
              onClick={() => onSelectPost(leadPost)}
              className="group rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 shadow-sm"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] bg-black overflow-hidden">
                <img
                  src={leadPost.coverImage}
                  alt={leadPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                    className="px-3 py-1 rounded-full text-xs font-telemetry font-semibold"
                  >
                    Titelgeschichte
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-telemetry bg-black/75 backdrop-blur-md text-white">
                    {leadPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-telemetry text-[var(--text-secondary)]">
                    <span>{leadPost.publishedAt}</span>
                  </div>

                  <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
                    {leadPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {leadPost.subtitle}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-[var(--accent-secondary)]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{leadPost.location}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border-color)] space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {(leadPost.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[11px] font-telemetry px-2.5 py-1 rounded-md bg-[var(--surface-subtle)] text-[var(--text-secondary)]"
                      >
                        <Tag className="w-3 h-3 text-[var(--accent-primary)]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform">
                      Ganzen Beitrag lesen <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Grid of Additional Journal Posts */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingPosts.map((post) => {
                const imageBlockCount = (post.blocks || []).filter(
                  (b) => b.type === 'image'
                ).length;

                return (
                  <article
                    key={post.id}
                    onClick={() => onSelectPost(post)}
                    className="group rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all cursor-pointer flex flex-col shadow-sm"
                  >
                    <div className="relative aspect-[16/10] bg-black overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-telemetry bg-black/70 backdrop-blur-md text-white border border-white/10">
                          {post.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-telemetry bg-black/70 backdrop-blur-md text-[var(--accent-primary)]">
                          {imageBlockCount + 1} Fotos im Beitrag
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs font-telemetry text-[var(--text-secondary)]">
                          <span>{post.publishedAt}</span>
                          <span>•</span>
                          <span className="truncate">{post.location}</span>
                        </div>

                        <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                          {post.subtitle}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {(post.tags || []).slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-telemetry px-2 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--text-secondary)]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-primary)]">
                          Weiterlesen <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
