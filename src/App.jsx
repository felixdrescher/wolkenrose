import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GalleryView from './components/GalleryView';
import LightboxModal from './components/LightboxModal';
import BlogView from './components/BlogView';
import ArticleModal from './components/ArticleModal';
import StudioView from './components/StudioView';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { initialData } from '../data/seedData';

function hexToRgba(hex, alpha = 0.85) {
  const clean = (hex || '#0B0E0C').replace('#', '');
  if (clean.length !== 6) return `rgba(11, 14, 12, ${alpha})`;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [studioSubTab, setStudioSubTab] = useState('upload-photo');

  const [theme, setTheme] = useState(initialData.theme);
  const [colorMode, setColorMode] = useState(() => {
    const saved = localStorage.getItem('wolkenrose_color_mode');
    return saved === 'light' || saved === 'dark'
      ? saved
      : initialData.theme?.defaultMode || 'dark';
  });

  const [profile, setProfile] = useState(initialData.profile);
  const [photos, setPhotos] = useState(initialData.photos);
  const [posts, setPosts] = useState(initialData.posts);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxPool, setLightboxPool] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  // Load state from backend API
  useEffect(() => {
    fetch('/api/state')
      .then((res) => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data) => {
        if (data.theme) {
          setTheme({ ...initialData.theme, ...data.theme });
          if (!localStorage.getItem('wolkenrose_color_mode') && data.theme.defaultMode) {
            setColorMode(data.theme.defaultMode);
          }
        }
        if (data.profile) setProfile({ ...initialData.profile, ...data.profile });
        if (Array.isArray(data.photos)) setPhotos(data.photos);
        if (Array.isArray(data.posts)) setPosts(data.posts);
      })
      .catch(() => {
        // Fallback to seed data if static
      });
  }, []);

  // Synchronize CSS variables (colors + fonts) whenever theme or colorMode changes
  useEffect(() => {
    const root = document.documentElement;
    const isLight = colorMode === 'light';

    root.classList.toggle('dark', !isLight);
    root.classList.toggle('light', isLight);

    const bgPrimary = isLight
      ? theme.lightBgPrimary || '#F6F3EC'
      : theme.darkBgPrimary || '#0B0E0C';
    const bgSecondary = isLight
      ? theme.lightBgSecondary || '#FFFFFF'
      : theme.darkBgSecondary || '#121614';
    const textPrimary = isLight
      ? theme.lightTextPrimary || '#181D1A'
      : theme.darkTextPrimary || '#F4F1EA';
    const textSecondary = isLight
      ? theme.lightTextSecondary || '#5A655E'
      : theme.darkTextSecondary || '#9CA39E';

    root.style.setProperty('--bg-primary', bgPrimary);
    root.style.setProperty('--bg-secondary', bgSecondary);
    root.style.setProperty('--bg-tertiary', bgPrimary);
    root.style.setProperty('--text-primary', textPrimary);
    root.style.setProperty('--text-secondary', textSecondary);
    root.style.setProperty('--accent-primary', theme.accentPrimary || '#D4A359');
    root.style.setProperty('--accent-secondary', theme.accentSecondary || '#7A9A82');
    root.style.setProperty(
      '--border-color',
      isLight ? 'rgba(24, 29, 26, 0.12)' : 'rgba(255, 255, 255, 0.1)'
    );
    root.style.setProperty(
      '--surface-subtle',
      isLight ? 'rgba(24, 29, 26, 0.05)' : 'rgba(255, 255, 255, 0.05)'
    );
    root.style.setProperty('--header-bg', hexToRgba(bgPrimary, 0.88));

    // Dynamic typography CSS variables
    const fontSerif = theme.fontSerif || 'Cormorant Garamond';
    const fontSans = theme.fontSans || 'Plus Jakarta Sans';
    const fontMono = theme.fontMono || 'JetBrains Mono';
    root.style.setProperty('--font-serif', `'${fontSerif}', Georgia, serif`);
    root.style.setProperty('--font-sans', `'${fontSans}', system-ui, sans-serif`);
    root.style.setProperty('--font-mono', `'${fontMono}', monospace`);
  }, [theme, colorMode]);

  const handleToggleColorMode = () => {
    setColorMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('wolkenrose_color_mode', next);
      return next;
    });
  };

  const handleSetColorMode = (mode) => {
    localStorage.setItem('wolkenrose_color_mode', mode);
    setColorMode(mode);
  };

  const handleUpdateTheme = async (nextTheme, persistToServer = true) => {
    setTheme(nextTheme);
    if (persistToServer) {
      try {
        const res = await fetch('/api/theme', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nextTheme)
        });
        if (res.ok) {
          const saved = await res.json();
          setTheme(saved);
        }
      } catch {
        // Keep local state if offline
      }
    }
  };

  const handleUpdateProfile = async (nextProfile) => {
    setProfile(nextProfile);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextProfile)
      });
      if (res.ok) {
        const saved = await res.json();
        setProfile(saved);
      }
    } catch {
      // Keep local state if offline
    }
  };

  const handleUpdateLandingSelection = async (photoIds) => {
    const selectedSet = new Set(photoIds.slice(0, 6));
    setPhotos((prev) =>
      prev.map((p) => ({
        ...p,
        landingSelected: selectedSet.has(p.id)
      }))
    );
    try {
      const res = await fetch('/api/landing-selection', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoIds: Array.from(selectedSet) })
      });
      if (res.ok) {
        const updatedPhotos = await res.json();
        setPhotos(updatedPhotos);
      }
    } catch {
      // Keep local state if offline
    }
  };

  // Scroll to top when switching main tabs
  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStudioTab = (subTab) => {
    setStudioSubTab(subTab);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Upload image file to backend /api/upload
  const handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      throw new Error('Datei konnte nicht auf den Server hochgeladen werden');
    }
    return await res.json();
  };

  // Create new photo
  const handleCreatePhoto = async (photoPayload) => {
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photoPayload)
    });
    if (!res.ok) throw new Error('Foto konnte nicht gespeichert werden');
    const created = await res.json();
    setPhotos((prev) => [created, ...prev]);
    return created;
  };

  // Update photo
  const handleUpdatePhoto = async (id, patch) => {
    const res = await fetch(`/api/photos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    });
    if (!res.ok) throw new Error('Foto konnte nicht aktualisiert werden');
    const updated = await res.json();
    setPhotos((prev) => prev.map((p) => (p.id === id ? updated : p)));
    if (selectedPhoto?.id === id) setSelectedPhoto(updated);
    return updated;
  };

  // Delete photo
  const handleDeletePhoto = async (id) => {
    await fetch(`/api/photos/${id}`, { method: 'DELETE' });
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (selectedPhoto?.id === id) setSelectedPhoto(null);
  };

  // Create blog post
  const handleCreatePost = async (postPayload) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postPayload)
    });
    if (!res.ok) throw new Error('Blogbeitrag konnte nicht erstellt werden');
    const created = await res.json();
    setPosts((prev) => [created, ...prev]);
    return created;
  };

  // Update blog post
  const handleUpdatePost = async (id, postPayload) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postPayload)
    });
    if (!res.ok) throw new Error('Blogbeitrag konnte nicht aktualisiert werden');
    const updated = await res.json();
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    if (selectedPost?.id === id) setSelectedPost(updated);
    return updated;
  };

  // Delete blog post
  const handleDeletePost = async (id) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (selectedPost?.id === id) setSelectedPost(null);
  };

  const handleOpenGalleryPhoto = (photo) => {
    setLightboxPool(null);
    setSelectedPhoto(photo);
  };

  const handleOpenEmbeddedPhoto = (photo, pool) => {
    setLightboxPool(pool || [photo]);
    setSelectedPhoto(photo);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        colorMode={colorMode}
        onToggleColorMode={handleToggleColorMode}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <HeroSection
            profile={profile}
            photos={photos}
            posts={posts}
            onSelectPhoto={handleOpenGalleryPhoto}
            onSelectPost={setSelectedPost}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryView
            photos={photos}
            onSelectPhoto={handleOpenGalleryPhoto}
          />
        )}

        {activeTab === 'journal' && (
          <BlogView
            posts={posts}
            onSelectPost={setSelectedPost}
          />
        )}

        {activeTab === 'studio' && (
          <StudioView
            initialSubTab={studioSubTab}
            photos={photos}
            posts={posts}
            profile={profile}
            editingPost={editingPost}
            onClearEditingPost={() => setEditingPost(null)}
            onUploadFile={handleUploadFile}
            onCreatePhoto={handleCreatePhoto}
            onUpdatePhoto={handleUpdatePhoto}
            onDeletePhoto={handleDeletePhoto}
            onUpdateLandingSelection={handleUpdateLandingSelection}
            onCreatePost={handleCreatePost}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
            onUpdateProfile={handleUpdateProfile}
            onSelectPhoto={handleOpenGalleryPhoto}
            onSelectPost={setSelectedPost}
            theme={theme}
            onUpdateTheme={handleUpdateTheme}
            colorMode={colorMode}
            onSetColorMode={handleSetColorMode}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            profile={profile}
            photoCount={photos.length}
            postCount={posts.length}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSection profile={profile} />
        )}
      </main>

      <Footer />

      {/* Fullscreen High-Res Darkroom Lightbox Modal (supports both Gallery and Blog Embedded Photos) */}
      {selectedPhoto && (
        <LightboxModal
          photo={selectedPhoto}
          photos={lightboxPool || photos}
          onClose={() => {
            setSelectedPhoto(null);
            setLightboxPool(null);
          }}
          onSelectPhoto={setSelectedPhoto}
        />
      )}

      {/* Fullscreen Field Journal Blog Reader Modal */}
      {selectedPost && (
        <ArticleModal
          post={selectedPost}
          profile={profile}
          onClose={() => setSelectedPost(null)}
          onSelectEmbeddedPhoto={handleOpenEmbeddedPhoto}
        />
      )}
    </div>
  );
}
