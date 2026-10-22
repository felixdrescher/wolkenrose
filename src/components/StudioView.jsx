import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  PenTool,
  Image as ImageIcon,
  Trash2,
  Star,
  Plus,
  Type,
  Heading,
  Quote,
  Camera,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit3,
  Sparkles,
  FolderOpen,
  FileText,
  Palette,
  Sun,
  Moon,
  RotateCcw,
  User,
  LayoutGrid
} from 'lucide-react';

const CAMERA_PRESETS = [
  {
    label: 'Hasselblad X2D Landschaft',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 2,5/38V',
      focalLength: '38mm',
      aperture: 'f/11',
      shutterSpeed: '1/15s',
      iso: '64'
    }
  },
  {
    label: 'Sony A1 Wildtiere 400mm',
    exif: {
      camera: 'Sony Alpha 1 II',
      lens: 'FE 400mm f/2.8 GM OSS',
      focalLength: '400mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/2000s',
      iso: '640'
    }
  },
  {
    label: 'Nachthimmel & Polarlicht 14mm',
    exif: {
      camera: 'Sony Alpha 1 II',
      lens: 'FE 14mm f/1.8 GM',
      focalLength: '14mm',
      aperture: 'f/1.8',
      shutterSpeed: '5s',
      iso: '1600'
    }
  }
];

export const FREE_FONT_OPTIONS = {
  serif: [
    { name: 'Cormorant Garamond', label: 'Cormorant Garamond (Klassisch Editorial Serif – Standard)' },
    { name: 'Playfair Display', label: 'Playfair Display (Modernes Magazin Serif)' },
    { name: 'Lora', label: 'Lora (Warm & Literarisch Serif)' },
    { name: 'Merriweather', label: 'Merriweather (Zeitloses Buchdruck Serif)' },
    { name: 'Libre Baskerville', label: 'Libre Baskerville (Traditionelle Galerie Serif)' },
    { name: 'Cinzel', label: 'Cinzel (Monumental & Edel)' },
    { name: 'Space Grotesk', label: 'Space Grotesk (Modern Minimalistisch Sans)' },
    { name: 'Montserrat', label: 'Montserrat (Geometrisch & Klar Sans)' }
  ],
  sans: [
    { name: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Modern & Harmonisch – Standard)' },
    { name: 'Inter', label: 'Inter (Klar & Neutral Sans)' },
    { name: 'DM Sans', label: 'DM Sans (Freundlich & Geometrisch)' },
    { name: 'Work Sans', label: 'Work Sans (Editorial Sans-Serif)' },
    { name: 'Nunito Sans', label: 'Nunito Sans (Weich & Einladend)' },
    { name: 'Source Sans 3', label: 'Source Sans 3 (Klassisch Lesefreundlich)' }
  ],
  mono: [
    { name: 'JetBrains Mono', label: 'JetBrains Mono (Präzise EXIF-Telemetrie – Standard)' },
    { name: 'Space Mono', label: 'Space Mono (Charakterstarkes Retro-Monospace)' },
    { name: 'Fira Code', label: 'Fira Code (Klare Technische Schrift)' },
    { name: 'IBM Plex Mono', label: 'IBM Plex Mono (Archiv-Monospace)' }
  ]
};

const THEME_PRESETS = [
  {
    name: 'Bernstein & Nordisches Moos (Standard)',
    description: 'Warmes Bernsteingold mit tiefem Waldschwarz und feinem Büttenpapier im Hellmodus',
    theme: {
      defaultMode: 'dark',
      accentPrimary: '#D4A359',
      accentSecondary: '#7A9A82',
      darkBgPrimary: '#0B0E0C',
      darkBgSecondary: '#121614',
      darkTextPrimary: '#F4F1EA',
      darkTextSecondary: '#9CA39E',
      lightBgPrimary: '#F6F3EC',
      lightBgSecondary: '#FFFFFF',
      lightTextPrimary: '#181D1A',
      lightTextSecondary: '#5A655E',
      fontSerif: 'Cormorant Garamond',
      fontSans: 'Plus Jakarta Sans',
      fontMono: 'JetBrains Mono'
    }
  },
  {
    name: 'Wolkenrose Roségold & Alpenschiefer',
    description: 'Zartes Morgenrot-Rosé kombiniert mit samtigem Schiefergrau und Rosé-Alabaster',
    theme: {
      defaultMode: 'dark',
      accentPrimary: '#E09F95',
      accentSecondary: '#8FA89B',
      darkBgPrimary: '#100E11',
      darkBgSecondary: '#19161B',
      darkTextPrimary: '#F9F4F3',
      darkTextSecondary: '#A89FA3',
      lightBgPrimary: '#FAF5F4',
      lightBgSecondary: '#FFFFFF',
      lightTextPrimary: '#231C1E',
      lightTextSecondary: '#6E5F63',
      fontSerif: 'Playfair Display',
      fontSans: 'Plus Jakarta Sans',
      fontMono: 'JetBrains Mono'
    }
  },
  {
    name: 'Alpennebel & Gletscherblau',
    description: 'Kühles Gletscherblau und Arktis-Silber für hochalpine Eis- und Winterserien',
    theme: {
      defaultMode: 'dark',
      accentPrimary: '#6CB4D8',
      accentSecondary: '#7FA99B',
      darkBgPrimary: '#090D12',
      darkBgSecondary: '#111821',
      darkTextPrimary: '#F0F5F9',
      darkTextSecondary: '#90A0B0',
      lightBgPrimary: '#F2F6FA',
      lightBgSecondary: '#FFFFFF',
      lightTextPrimary: '#121B24',
      lightTextSecondary: '#526373',
      fontSerif: 'Lora',
      fontSans: 'Inter',
      fontMono: 'IBM Plex Mono'
    }
  },
  {
    name: 'Büttenpapier & Waldgrün (Hell-Fokus)',
    description: 'Klassische Museums-Ästhetik mit warmem Naturpapier und edlem Tannengrün',
    theme: {
      defaultMode: 'light',
      accentPrimary: '#B87B38',
      accentSecondary: '#3E6B52',
      darkBgPrimary: '#0B0F0C',
      darkBgSecondary: '#131A15',
      darkTextPrimary: '#F4F1EA',
      darkTextSecondary: '#9CA39E',
      lightBgPrimary: '#F3EFE6',
      lightBgSecondary: '#FAF8F3',
      lightTextPrimary: '#161C18',
      lightTextSecondary: '#545E57',
      fontSerif: 'Libre Baskerville',
      fontSans: 'Source Sans 3',
      fontMono: 'Space Mono'
    }
  }
];

export default function StudioView({
  initialSubTab = 'upload-photo',
  photos,
  posts,
  profile,
  editingPost,
  onClearEditingPost,
  onUploadFile,
  onCreatePhoto,
  onUpdatePhoto,
  onUpdateLandingSelection,
  onDeletePhoto,
  onCreatePost,
  onUpdatePost,
  onDeletePost,
  onUpdateProfile,
  onSelectPhoto,
  onSelectPost,
  theme,
  onUpdateTheme,
  colorMode,
  onSetColorMode
}) {
  const [subTab, setSubTab] = useState(initialSubTab);
  const [bannerMessage, setBannerMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // --- PHOTO UPLOAD FORM STATE ---
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'Alpen & Gletscher',
    location: '',
    coordinates: '47.4917° N, 11.0955° O',
    dateTaken: new Date().toISOString().split('T')[0],
    featured: true,
    landingSelected: false,
    imageUrl: '',
    story: '',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 2,5/55V',
      focalLength: '55mm',
      aperture: 'f/8',
      shutterSpeed: '1/125s',
      iso: '64'
    }
  });

  // --- BLOG COMPOSER STATE ---
  const coverFileInputRef = useRef(null);
  const [showPostPreview, setShowPostPreview] = useState(false);
  const [galleryPickerTarget, setGalleryPickerTarget] = useState(null);

  const createDefaultPostForm = () => ({
    id: null,
    title: '',
    subtitle: '',
    category: 'Reisetagebuch',
    location: 'Alpenraum & Voralpenland',
    publishedAt: new Date().toISOString().split('T')[0],
    featured: true,
    coverImage: '',
    tags: 'Wolkenrose, Naturfotografie, Lichtstimmung',
    blocks: [
      {
        id: `block-${Date.now()}-1`,
        type: 'paragraph',
        content: ''
      },
      {
        id: `block-${Date.now()}-2`,
        type: 'image',
        imageUrl: '',
        caption: '',
        exifNote: 'Hasselblad X2D 100C · 55mm · f/8'
      }
    ]
  });

  const [postForm, setPostForm] = useState(createDefaultPostForm);

  // --- ABOUT ME & KONTAKT EDITOR STATE ---
  const portraitInputRef = useRef(null);
  const [profileForm, setProfileForm] = useState(() => ({
    name: profile?.name || 'Petra Schemmel',
    tagline: profile?.tagline || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    portraitImage:
      profile?.portraitImage ||
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85',
    equipmentTitle: profile?.equipmentTitle || 'Kameraausrüstung & Objektive',
    equipmentIntro: profile?.equipmentIntro || '',
    equipment: Array.isArray(profile?.equipment) ? [...profile.equipment] : [],
    printsSubtitle: profile?.printsSubtitle || 'Fine-Art-Editionen & Manufaktur',
    printsTitle:
      profile?.printsTitle || 'Handsignierte Kunstdrucke aus dem Atelier Wolkenrose',
    printsText: profile?.printsText || '',
    contactIntro: profile?.contactIntro || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    socials: {
      instagramHandle: profile?.socials?.instagramHandle || '@wolkenrose.petraschemmel',
      instagramUrl: profile?.socials?.instagramUrl || 'https://instagram.com/wolkenrose.petraschemmel',
      blueskyHandle: profile?.socials?.blueskyHandle || '@wolkenrose.bsky.social',
      blueskyUrl: profile?.socials?.blueskyUrl || 'https://bsky.app/profile/wolkenrose.bsky.social',
      youtubeHandle: profile?.socials?.youtubeHandle || '',
      youtubeUrl: profile?.socials?.youtubeUrl || '',
      pinterestHandle: profile?.socials?.pinterestHandle || '',
      pinterestUrl: profile?.socials?.pinterestUrl || ''
    }
  }));
  const [newEquipmentItem, setNewEquipmentItem] = useState('');

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name || 'Petra Schemmel',
        tagline: profile.tagline || '',
        bio: profile.bio || '',
        location: profile.location || '',
        portraitImage:
          profile.portraitImage ||
          'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85',
        equipmentTitle: profile.equipmentTitle || 'Kameraausrüstung & Objektive',
        equipmentIntro: profile.equipmentIntro || '',
        equipment: Array.isArray(profile.equipment) ? [...profile.equipment] : [],
        printsSubtitle: profile.printsSubtitle || 'Fine-Art-Editionen & Manufaktur',
        printsTitle:
          profile.printsTitle || 'Handsignierte Kunstdrucke aus dem Atelier Wolkenrose',
        printsText: profile.printsText || '',
        contactIntro: profile.contactIntro || '',
        email: profile.email || '',
        phone: profile.phone || '',
        socials: {
          instagramHandle: profile.socials?.instagramHandle || '',
          instagramUrl: profile.socials?.instagramUrl || '',
          blueskyHandle: profile.socials?.blueskyHandle || '',
          blueskyUrl: profile.socials?.blueskyUrl || '',
          youtubeHandle: profile.socials?.youtubeHandle || '',
          youtubeUrl: profile.socials?.youtubeUrl || '',
          pinterestHandle: profile.socials?.pinterestHandle || '',
          pinterestUrl: profile.socials?.pinterestUrl || ''
        }
      });
    }
  }, [profile]);

  useEffect(() => {
    if (editingPost) {
      setSubTab('write-post');
      setPostForm({
        id: editingPost.id,
        title: editingPost.title || '',
        subtitle: editingPost.subtitle || '',
        category: editingPost.category || 'Reisetagebuch',
        location: editingPost.location || '',
        publishedAt:
          editingPost.publishedAt || new Date().toISOString().split('T')[0],
        featured: Boolean(editingPost.featured),
        coverImage: editingPost.coverImage || '',
        tags: Array.isArray(editingPost.tags)
          ? editingPost.tags.join(', ')
          : editingPost.tags || '',
        blocks:
          Array.isArray(editingPost.blocks) && editingPost.blocks.length > 0
            ? editingPost.blocks.map((b, i) => ({
                ...b,
                id: b.id || `block-edit-${i}`
              }))
            : [
                {
                  id: `block-${Date.now()}`,
                  type: 'paragraph',
                  content: ''
                }
              ]
      });
    }
  }, [editingPost]);

  const showToast = (msg) => {
    setBannerMessage(msg);
    setTimeout(() => {
      setBannerMessage(null);
    }, 4500);
  };

  // Handle file upload for Gallery
  const handlePhotoFileSelect = async (file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      const uploaded = await onUploadFile(file);
      const inferredTitle = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setPhotoForm((prev) => ({
        ...prev,
        imageUrl: uploaded.imageUrl,
        title: prev.title || inferredTitle
      }));
      showToast(`Bilddatei „${file.name}“ erfolgreich hochgeladen.`);
    } catch (err) {
      alert('Fehler beim Hochladen der Bilddatei: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handlePhotoFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handlePublishPhoto = async (e) => {
    e.preventDefault();
    if (!photoForm.title.trim() || !photoForm.imageUrl.trim()) {
      alert('Bitte gib sowohl einen Titel als auch ein Bild (Datei oder URL) an.');
      return;
    }
    const created = await onCreatePhoto(photoForm);
    showToast(`„${created.title}“ wurde in der Wolkenrose-Galerie veröffentlicht!`);
    setPhotoForm({
      title: '',
      category: 'Alpen & Gletscher',
      location: '',
      coordinates: '47.4917° N, 11.0955° O',
      dateTaken: new Date().toISOString().split('T')[0],
      featured: true,
      landingSelected: false,
      imageUrl: '',
      story: '',
      exif: { ...photoForm.exif }
    });
  };

  // Toggle 1 of the 6 Landing Page Showcase Photos ("01 / Ausgewählte Fotografien")
  const selectedLandingIds = photos
    .filter((p) => p.landingSelected)
    .map((p) => p.id);

  const handleToggleLandingPhoto = async (photoId) => {
    const isCurrentlySelected = selectedLandingIds.includes(photoId);
    let nextIds;
    if (isCurrentlySelected) {
      nextIds = selectedLandingIds.filter((id) => id !== photoId);
    } else {
      if (selectedLandingIds.length >= 6) {
        alert(
          'Du hast bereits 6 Fotos für die Startseite ausgewählt. Bitte wähle zuerst ein anderes Foto ab, um dieses auszuwählen.'
        );
        return;
      }
      nextIds = [...selectedLandingIds, photoId];
    }
    await onUpdateLandingSelection(nextIds);
    showToast(
      `Startseiten-Auswahl aktualisiert (${nextIds.length} von 6 Fotos ausgewählt).`
    );
  };

  // Blog Post Block Helpers
  const addBlock = (type) => {
    const newBlock =
      type === 'image'
        ? {
            id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            type: 'image',
            imageUrl: '',
            caption: '',
            exifNote: 'Hasselblad X2D 100C · 38mm · f/8'
          }
        : type === 'quote'
          ? {
              id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              type: 'quote',
              content: '',
              author: 'Petra Schemmel · Wolkenrose'
            }
          : {
              id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              type,
              content: ''
            };

    setPostForm((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
  };

  const updateBlock = (id, patch) => {
    setPostForm((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b))
    }));
  };

  const removeBlock = (id) => {
    setPostForm((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== id)
    }));
  };

  const moveBlock = (index, direction) => {
    setPostForm((prev) => {
      const next = [...prev.blocks];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      return { ...prev, blocks: next };
    });
  };

  const handleCoverFileUpload = async (file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      const uploaded = await onUploadFile(file);
      setPostForm((prev) => ({
        ...prev,
        coverImage: uploaded.imageUrl
      }));
      showToast(`Titelbild „${file.name}“ erfolgreich hochgeladen.`);
    } catch (err) {
      alert('Fehler beim Hochladen: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleBlockImageUpload = async (blockId, file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      const uploaded = await onUploadFile(file);
      updateBlock(blockId, { imageUrl: uploaded.imageUrl });
      showToast(`Foto „${file.name}“ in den Blogbeitrag eingefügt.`);
    } catch (err) {
      alert('Fehler beim Hochladen: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!postForm.title.trim()) {
      alert('Bitte gib einen Titel für den Blogbeitrag ein.');
      return;
    }

    const cleanedBlocks = postForm.blocks.filter((b) => {
      if (b.type === 'image') return Boolean(b.imageUrl?.trim());
      return Boolean(b.content?.trim());
    });

    const payload = {
      ...postForm,
      coverImage:
        postForm.coverImage.trim() ||
        cleanedBlocks.find((b) => b.type === 'image')?.imageUrl ||
        photos[0]?.imageUrl ||
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
      tags: postForm.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      blocks:
        cleanedBlocks.length > 0
          ? cleanedBlocks
          : [
              {
                id: 'b-default',
                type: 'paragraph',
                content: postForm.subtitle || 'Notizen von unterwegs.'
              }
            ]
    };

    if (postForm.id) {
      const updated = await onUpdatePost(postForm.id, payload);
      showToast(`Blogbeitrag „${updated.title}“ wurde aktualisiert!`);
      if (onClearEditingPost) onClearEditingPost();
    } else {
      const created = await onCreatePost(payload);
      showToast(`Neuer Blogbeitrag „${created.title}“ im Blog veröffentlicht!`);
    }

    setPostForm(createDefaultPostForm());
    setShowPostPreview(false);
  };

  // --- ABOUT ME & KONTAKT HANDLERS ---
  const handlePortraitUpload = async (file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      const uploaded = await onUploadFile(file);
      setProfileForm((prev) => ({
        ...prev,
        portraitImage: uploaded.imageUrl
      }));
      showToast(`Porträtbild „${file.name}“ wurde hochgeladen.`);
    } catch (err) {
      alert('Fehler beim Hochladen: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddEquipment = () => {
    const trimmed = newEquipmentItem.trim();
    if (!trimmed) return;
    setProfileForm((prev) => ({
      ...prev,
      equipment: [...prev.equipment, trimmed]
    }));
    setNewEquipmentItem('');
  };

  const handleRemoveEquipment = (index) => {
    setProfileForm((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((_, idx) => idx !== index)
    }));
  };

  const handleUpdateEquipmentItem = (index, value) => {
    setProfileForm((prev) => ({
      ...prev,
      equipment: prev.equipment.map((item, idx) => (idx === index ? value : item))
    }));
  };

  const handleSaveProfileForm = async (e) => {
    e.preventDefault();
    await onUpdateProfile(profileForm);
    showToast('Alle Texte, Ausrüstung, Porträtbild und Kontaktdaten wurden gespeichert!');
  };

  // --- THEME, COLORS & FONTS HANDLERS ---
  const handleColorFieldChange = (key, value) => {
    onUpdateTheme({ ...theme, [key]: value }, false);
  };

  const handleSaveThemeToServer = async () => {
    await onUpdateTheme(theme, true);
    showToast('Farbdesign und Schriftarten wurden dauerhaft gespeichert!');
  };

  const handleApplyPreset = async (preset) => {
    await onUpdateTheme(preset.theme, true);
    if (preset.theme.defaultMode) {
      onSetColorMode(preset.theme.defaultMode);
    }
    showToast(`Vorlage „${preset.name}“ wurde aktiviert und gespeichert!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Studio Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[var(--border-color)] pb-8">
        <div className="space-y-2">
          <div
            style={{
              borderColor: 'var(--accent-primary)',
              color: 'var(--accent-primary)',
              backgroundColor: 'var(--surface-subtle)'
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-telemetry"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wolkenrose - Fotografie · Adminbereich</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[var(--text-primary)]">
            Adminbereich & Redaktion
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
            Verwalte deine Galerie, bestimme die 6 Startseiten-Fotos, schreibe Blogbeiträge, bearbeite die „Über mich“- & Kontaktseite oder passe Farben und Schriftarten an.
          </p>
        </div>

        {/* Studio Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[var(--bg-secondary)] p-1.5 rounded-2xl border border-[var(--border-color)] self-start">
          <button
            onClick={() => setSubTab('upload-photo')}
            style={
              subTab === 'upload-photo'
                ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                : { color: 'var(--text-secondary)' }
            }
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              subTab === 'upload-photo' ? 'shadow-md' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Foto hochladen</span>
          </button>

          <button
            onClick={() => setSubTab('write-post')}
            style={
              subTab === 'write-post'
                ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                : { color: 'var(--text-secondary)' }
            }
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              subTab === 'write-post' ? 'shadow-md' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>{postForm.id ? 'Beitrag bearbeiten' : 'Blogbeitrag schreiben'}</span>
          </button>

          <button
            onClick={() => setSubTab('manage-archive')}
            style={
              subTab === 'manage-archive'
                ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                : { color: 'var(--text-secondary)' }
            }
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              subTab === 'manage-archive' ? 'shadow-md' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Archiv & Startseiten-Auswahl</span>
          </button>

          <button
            onClick={() => setSubTab('about-contact')}
            style={
              subTab === 'about-contact'
                ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                : { color: 'var(--text-secondary)' }
            }
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              subTab === 'about-contact' ? 'shadow-md' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Über mich & Kontakt</span>
          </button>

          <button
            onClick={() => setSubTab('design-colors')}
            style={
              subTab === 'design-colors'
                ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                : { color: 'var(--text-secondary)' }
            }
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              subTab === 'design-colors' ? 'shadow-md' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Farben & Schriften</span>
          </button>
        </div>
      </div>

      {/* Status Notification Toast */}
      {bannerMessage && (
        <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-[var(--text-primary)] text-sm">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{bannerMessage}</span>
          </div>
          <button
            onClick={() => setBannerMessage(null)}
            className="text-xs underline opacity-80 hover:opacity-100 cursor-pointer"
          >
            Ausblenden
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 1: UPLOAD PHOTOGRAPH TO GALLERY                                   */}
      {/* ===================================================================== */}
      {subTab === 'upload-photo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <form
            onSubmit={handlePublishPhoto}
            className="lg:col-span-7 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                  Neue Fotografie hochladen
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Ziehe eine Bilddatei in das Feld oder gib eine Bild-URL ein
                </p>
              </div>
              <span className="font-telemetry text-xs text-[var(--accent-primary)]">
                JPG · PNG · WEBP · AVIF
              </span>
            </div>

            {/* Drag and Drop File Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-[var(--accent-primary)] bg-[var(--surface-subtle)]'
                  : 'border-[var(--border-color)] hover:border-[var(--accent-primary)] bg-[var(--bg-primary)]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handlePhotoFileSelect(e.target.files[0]);
                  }
                }}
              />
              <div
                style={{
                  borderColor: 'var(--accent-primary)',
                  color: 'var(--accent-primary)',
                  backgroundColor: 'var(--surface-subtle)'
                }}
                className="w-12 h-12 rounded-2xl border flex items-center justify-center mx-auto mb-3"
              >
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {isUploading
                  ? 'Bild wird auf den Server hochgeladen...'
                  : 'Fotografie hierher ziehen oder klicken, um Datei auszuwählen'}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Deine hochgeladenen Bilder werden direkt lokal im Ordner /uploads gespeichert
              </p>
            </div>

            {/* Or Direct Image URL Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                Bildpfad oder Bild-URL *
              </label>
              <input
                type="text"
                required
                value={photoForm.imageUrl}
                onChange={(e) =>
                  setPhotoForm({ ...photoForm, imageUrl: e.target.value })
                }
                placeholder="/uploads/dein-foto.jpg oder https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                  Titel der Fotografie *
                </label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) =>
                    setPhotoForm({ ...photoForm, title: e.target.value })
                  }
                  placeholder="z. B. Abendrot über dem Karwendel"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                  Kategorie / Lebensraum
                </label>
                <select
                  value={photoForm.category}
                  onChange={(e) =>
                    setPhotoForm({ ...photoForm, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                >
                  <option value="Alpen & Gletscher">Alpen & Gletscher</option>
                  <option value="Wälder & Moore">Wälder & Moore</option>
                  <option value="Nachthimmel & Polarlicht">Nachthimmel & Polarlicht</option>
                  <option value="Wildtiere">Wildtiere</option>
                  <option value="Küsten & Meere">Küsten & Meere</option>
                  <option value="Wolken & Strukturen">Wolken & Strukturen</option>
                </select>
              </div>
            </div>

            {/* Location, Coordinates & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                  Aufnahmeort
                </label>
                <input
                  type="text"
                  value={photoForm.location}
                  onChange={(e) =>
                    setPhotoForm({ ...photoForm, location: e.target.value })
                  }
                  placeholder="Karwendelgebirge, Bayern"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                  GPS-Koordinaten
                </label>
                <input
                  type="text"
                  value={photoForm.coordinates}
                  onChange={(e) =>
                    setPhotoForm({ ...photoForm, coordinates: e.target.value })
                  }
                  placeholder="47.4917° N, 11.0955° O"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm font-telemetry text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                  Aufnahmedatum
                </label>
                <input
                  type="date"
                  value={photoForm.dateTaken}
                  onChange={(e) =>
                    setPhotoForm({ ...photoForm, dateTaken: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm font-telemetry text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>
            </div>

            {/* Story / Field Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                Geschichte & Notizen zur Aufnahme
              </label>
              <textarea
                rows={3}
                value={photoForm.story}
                onChange={(e) =>
                  setPhotoForm({ ...photoForm, story: e.target.value })
                }
                placeholder="Erzähle von der Lichtstimmung, dem Wetter oder dem besonderen Moment dieser Aufnahme..."
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            {/* Camera & EXIF Telemetry Section */}
            <div className="space-y-3 bg-[var(--bg-primary)] p-5 rounded-2xl border border-[var(--border-color)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-telemetry text-xs uppercase tracking-wider text-[var(--accent-primary)] flex items-center gap-1.5">
                  <Camera className="w-4 h-4" />
                  Kamera & EXIF-Aufnahmedaten
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CAMERA_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        setPhotoForm({ ...photoForm, exif: { ...preset.exif } })
                      }
                      className="px-2.5 py-1 rounded-lg text-[11px] font-telemetry bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-color)] transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                    KAMERA
                  </label>
                  <input
                    type="text"
                    value={photoForm.exif.camera}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        exif: { ...photoForm.exif, camera: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-telemetry text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                    OBJEKTIV
                  </label>
                  <input
                    type="text"
                    value={photoForm.exif.lens}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        exif: { ...photoForm.exif, lens: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-telemetry text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                    BRENNWEITE
                  </label>
                  <input
                    type="text"
                    value={photoForm.exif.focalLength}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        exif: { ...photoForm.exif, focalLength: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-telemetry text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                    BLENDE
                  </label>
                  <input
                    type="text"
                    value={photoForm.exif.aperture}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        exif: { ...photoForm.exif, aperture: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-telemetry text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                    BELICHTUNGSZEIT
                  </label>
                  <input
                    type="text"
                    value={photoForm.exif.shutterSpeed}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        exif: {
                          ...photoForm.exif,
                          shutterSpeed: e.target.value
                        }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-telemetry text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                    ISO-WERT
                  </label>
                  <input
                    type="text"
                    value={photoForm.exif.iso}
                    onChange={(e) =>
                      setPhotoForm({
                        ...photoForm,
                        exif: { ...photoForm.exif, iso: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-telemetry text-[var(--text-primary)]"
                  />
                </div>
              </div>
            </div>

            {/* Featured Checkbox & Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <label className="inline-flex items-center gap-2.5 text-sm text-[var(--text-primary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={photoForm.featured}
                  onChange={(e) =>
                    setPhotoForm({ ...photoForm, featured: e.target.checked })
                  }
                  className="w-4 h-4 accent-[var(--accent-primary)] rounded"
                />
                <span>Im großen Hero-Slider ganz oben zeigen</span>
              </label>

              <button
                type="submit"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full hover:opacity-90 font-semibold text-sm shadow-lg transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>In der Galerie veröffentlichen</span>
              </button>
            </div>
          </form>

          {/* Right 5 Cols: Live Plate Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 space-y-4 sticky top-28 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-primary)]">
                  Live-Vorschau der Galerie-Kachel
                </span>
                <span className="font-telemetry text-xs text-[var(--text-secondary)]">
                  {photoForm.category}
                </span>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center">
                {photoForm.imageUrl ? (
                  <>
                    <img
                      src={photoForm.imageUrl}
                      alt={photoForm.title || 'Vorschau'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-telemetry text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <span>{photoForm.exif.camera}</span>
                      <span className="text-[var(--accent-primary)]">
                        {photoForm.exif.focalLength} · {photoForm.exif.aperture} ·{' '}
                        {photoForm.exif.shutterSpeed}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-2 text-[var(--text-secondary)]">
                    <ImageIcon className="w-10 h-10 mx-auto opacity-40" />
                    <p className="text-xs">
                      Wähle eine Bilddatei aus oder füge eine URL ein, um die Vorschau für die Galerie zu sehen
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-telemetry text-[var(--accent-secondary)]">
                  {photoForm.location || 'Aufnahmeort noch offen'} ·{' '}
                  {photoForm.dateTaken}
                </div>
                <h3 className="font-editorial text-2xl text-[var(--text-primary)]">
                  {photoForm.title || 'Unbetitelte Naturaufnahme'}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {photoForm.story ||
                    'Deine Hintergrundgeschichte und Aufnahmedaten erscheinen hier unter dem Werk.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: WRITE / EDIT BLOG POST WITH TEXT AND PICTURES                  */}
      {/* ===================================================================== */}
      {subTab === 'write-post' && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-secondary)] p-5 rounded-2xl border border-[var(--border-color)] shadow-sm">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--accent-primary)]" />
              <div>
                <h2 className="font-editorial text-2xl text-[var(--text-primary)]">
                  {postForm.id
                    ? `Beitrag bearbeiten: ${postForm.title}`
                    : 'Neuen Blogbeitrag verfassen'}
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Kombiniere Textabsätze, Zwischenüberschriften, Zitate und eigene Fotografien
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {postForm.id && (
                <button
                  type="button"
                  onClick={() => {
                    if (onClearEditingPost) onClearEditingPost();
                    setPostForm(createDefaultPostForm());
                  }}
                  className="px-4 py-2 rounded-full text-xs font-medium bg-[var(--surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)] cursor-pointer"
                >
                  Bearbeitung abbrechen
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPostPreview(!showPostPreview)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface-subtle)] text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>{showPostPreview ? 'Zurück zum Editor' : 'Live-Artikelvorschau'}</span>
              </button>
            </div>
          </div>

          {showPostPreview ? (
            <div className="max-w-4xl mx-auto bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] overflow-hidden p-6 sm:p-12 space-y-8 shadow-sm">
              {postForm.coverImage && (
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black">
                  <img
                    src={postForm.coverImage}
                    alt={postForm.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-3 border-b border-[var(--border-color)] pb-6">
                <span className="px-3 py-1 rounded-full text-xs font-telemetry bg-[var(--surface-subtle)] text-[var(--accent-primary)] border border-[var(--border-color)]">
                  {postForm.category} · {postForm.location}
                </span>
                <h1 className="font-editorial text-4xl sm:text-5xl text-[var(--text-primary)]">
                  {postForm.title || 'Unbetitelter Blogbeitrag'}
                </h1>
                {postForm.subtitle && (
                  <p className="text-lg text-[var(--text-secondary)]">{postForm.subtitle}</p>
                )}
              </div>

              <div className="space-y-6">
                {postForm.blocks.map((block, idx) => {
                  if (block.type === 'heading') {
                    return (
                      <h2
                        key={block.id || idx}
                        className="font-editorial text-3xl text-[var(--text-primary)]"
                      >
                        {block.content}
                      </h2>
                    );
                  }
                  if (block.type === 'quote') {
                    return (
                      <blockquote
                        key={block.id || idx}
                        style={{ borderLeftColor: 'var(--accent-primary)' }}
                        className="p-6 rounded-2xl bg-[var(--bg-primary)] border-l-4 font-editorial italic text-2xl text-[var(--text-primary)]"
                      >
                        „{block.content}“
                      </blockquote>
                    );
                  }
                  if (block.type === 'image') {
                    return (
                      <figure
                        key={block.id || idx}
                        className="rounded-2xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)]"
                      >
                        {block.imageUrl ? (
                          <img
                            src={block.imageUrl}
                            alt={block.caption}
                            className="w-full max-h-[520px] object-cover"
                          />
                        ) : (
                          <div className="p-12 text-center text-xs text-[var(--text-secondary)]">
                            Noch kein Bild für diesen Block ausgewählt
                          </div>
                        )}
                        {(block.caption || block.exifNote) && (
                          <figcaption className="p-4 flex justify-between text-xs bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
                            <span className="text-[var(--text-primary)]">{block.caption}</span>
                            <span className="font-telemetry text-[var(--accent-primary)]">
                              {block.exifNote}
                            </span>
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  return (
                    <p
                      key={block.id || idx}
                      className="text-base sm:text-lg text-[var(--text-primary)] opacity-90 leading-relaxed whitespace-pre-line"
                    >
                      {block.content}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSavePost} className="space-y-8">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                        Titel des Blogbeitrags *
                      </label>
                      <input
                        type="text"
                        required
                        value={postForm.title}
                        onChange={(e) =>
                          setPostForm({ ...postForm, title: e.target.value })
                        }
                        placeholder="z. B. Morgennebel im Moor: Wenn die Wolkenrose erwacht"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] font-editorial text-2xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                        Untertitel / Einleitung
                      </label>
                      <textarea
                        rows={2}
                        value={postForm.subtitle}
                        onChange={(e) =>
                          setPostForm({ ...postForm, subtitle: e.target.value })
                        }
                        placeholder="Eine kurze Einführung in das Erlebnis, den Ort und die fotografische Serie..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                          Rubrik
                        </label>
                        <select
                          value={postForm.category}
                          onChange={(e) =>
                            setPostForm({ ...postForm, category: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                        >
                          <option value="Reisetagebuch">Reisetagebuch</option>
                          <option value="Hinter der Kamera">Hinter der Kamera</option>
                          <option value="Ausrüstung & Technik">Ausrüstung & Technik</option>
                          <option value="Naturschutz">Naturschutz</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                          Ort / Region
                        </label>
                        <input
                          type="text"
                          value={postForm.location}
                          onChange={(e) =>
                            setPostForm({ ...postForm, location: e.target.value })
                          }
                          placeholder="Oberbayern · Alpen"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                          Schlagworte (mit Komma)
                        </label>
                        <input
                          type="text"
                          value={postForm.tags}
                          onChange={(e) =>
                            setPostForm({ ...postForm, tags: e.target.value })
                          }
                          placeholder="Wolkenrose, Alpen, Morgenlicht"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cover Image Uploader Box */}
                  <div className="lg:col-span-4 space-y-3">
                    <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                      Titelbild des Beitrags
                    </label>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center">
                      {postForm.coverImage ? (
                        <img
                          src={postForm.coverImage}
                          alt="Titelbild Vorschau"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4 text-xs text-[var(--text-secondary)]">
                          <ImageIcon className="w-7 h-7 mx-auto mb-1.5 opacity-40" />
                          <span>Titelbild hochladen oder auswählen</span>
                        </div>
                      )}
                    </div>

                    <input
                      ref={coverFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleCoverFileUpload(e.target.files[0]);
                        }
                      }}
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => coverFileInputRef.current?.click()}
                        style={{
                          borderColor: 'var(--accent-primary)',
                          color: 'var(--accent-primary)',
                          backgroundColor: 'var(--surface-subtle)'
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border hover:opacity-85 transition-opacity cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Datei hochladen</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setGalleryPickerTarget(
                            galleryPickerTarget === 'cover' ? null : 'cover'
                          )
                        }
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                        <span>Aus Galerie</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={postForm.coverImage}
                      onChange={(e) =>
                        setPostForm({ ...postForm, coverImage: e.target.value })
                      }
                      placeholder="Oder Bild-URL hier einfügen..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                {galleryPickerTarget === 'cover' && (
                  <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--accent-primary)] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-telemetry text-[var(--accent-primary)]">
                        Klicke auf ein Foto aus deiner Galerie, um es als Titelbild zu verwenden:
                      </span>
                      <button
                        type="button"
                        onClick={() => setGalleryPickerTarget(null)}
                        className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                      >
                        Schließen
                      </button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-h-44 overflow-y-auto">
                      {photos.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setPostForm({ ...postForm, coverImage: p.imageUrl });
                            setGalleryPickerTarget(null);
                          }}
                          className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-primary)] cursor-pointer"
                        >
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Story Content Blocks Composer */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-2xl text-[var(--text-primary)]">
                    Inhaltsblöcke des Beitrags ({postForm.blocks.length})
                  </h3>
                  <span className="text-xs text-[var(--text-secondary)]">
                    Füge beliebig viele Textabsätze, Zwischenüberschriften, Zitate und Fotos hinzu
                  </span>
                </div>

                {postForm.blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                      <span className="font-telemetry text-xs uppercase tracking-wider text-[var(--accent-primary)]">
                        Abschnitt #{index + 1} ·{' '}
                        {block.type === 'paragraph'
                          ? 'TEXTABSATZ'
                          : block.type === 'image'
                            ? 'FOTOGRAFIE'
                            : block.type === 'heading'
                              ? 'ÜBERSCHRIFT'
                              : 'ZITAT'}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, -1)}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg bg-[var(--surface-subtle)] disabled:opacity-30 text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                          title="Nach oben verschieben"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 1)}
                          disabled={index === postForm.blocks.length - 1}
                          className="p-1.5 rounded-lg bg-[var(--surface-subtle)] disabled:opacity-30 text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                          title="Nach unten verschieben"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(block.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 cursor-pointer ml-2"
                          title="Abschnitt entfernen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {block.type === 'paragraph' && (
                      <textarea
                        rows={4}
                        value={block.content}
                        onChange={(e) =>
                          updateBlock(block.id, { content: e.target.value })
                        }
                        placeholder="Schreibe hier deinen Textabsatz..."
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm sm:text-base text-[var(--text-primary)] leading-relaxed focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                    )}

                    {block.type === 'heading' && (
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) =>
                          updateBlock(block.id, { content: e.target.value })
                        }
                        placeholder="Zwischenüberschrift eingeben..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] font-editorial text-2xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                    )}

                    {block.type === 'quote' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) =>
                            updateBlock(block.id, { content: e.target.value })
                          }
                          placeholder="Zitat oder besonderen Gedanken eingeben..."
                          className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] font-editorial italic text-xl text-[var(--text-primary)]"
                        />
                        <input
                          type="text"
                          value={block.author || ''}
                          onChange={(e) =>
                            updateBlock(block.id, { author: e.target.value })
                          }
                          placeholder="Quelle / Ort"
                          className="px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs font-telemetry text-[var(--text-primary)]"
                        />
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                        <div className="md:col-span-5 space-y-2.5">
                          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center">
                            {block.imageUrl ? (
                              <img
                                src={block.imageUrl}
                                alt={block.caption || 'Beitragsbild'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs text-[var(--text-secondary)]">
                                Foto hochladen oder auswählen
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <label
                              style={{
                                borderColor: 'var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                backgroundColor: 'var(--surface-subtle)'
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border hover:opacity-85 transition-opacity cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Bild hochladen</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleBlockImageUpload(
                                      block.id,
                                      e.target.files[0]
                                    );
                                  }
                                }}
                              />
                            </label>

                            <button
                              type="button"
                              onClick={() =>
                                setGalleryPickerTarget(
                                  galleryPickerTarget === block.id
                                    ? null
                                    : block.id
                                )
                              }
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                            >
                              <ImageIcon className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                              <span>Aus Galerie</span>
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-7 space-y-3">
                          <div>
                            <label className="block text-[10px] font-telemetry uppercase text-[var(--text-secondary)] mb-1">
                              Bildpfad oder URL
                            </label>
                            <input
                              type="text"
                              value={block.imageUrl}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  imageUrl: e.target.value
                                })
                              }
                              placeholder="/uploads/... oder https://..."
                              className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-telemetry uppercase text-[var(--text-secondary)] mb-1">
                              Bildunterschrift & Beschreibung
                            </label>
                            <input
                              type="text"
                              value={block.caption}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  caption: e.target.value
                                })
                              }
                              placeholder="z. B. Erste Sonnenstrahlen über dem Nebelmeer"
                              className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-telemetry uppercase text-[var(--text-secondary)] mb-1">
                              Kamera- & EXIF-Notiz
                            </label>
                            <input
                              type="text"
                              value={block.exifNote || ''}
                              onChange={(e) =>
                                updateBlock(block.id, {
                                  exifNote: e.target.value
                                })
                              }
                              placeholder="Hasselblad X2D 100C · 38mm · f/11 · 1/15s · ISO 64"
                              className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs font-telemetry text-[var(--accent-primary)]"
                            />
                          </div>
                        </div>

                        {galleryPickerTarget === block.id && (
                          <div className="md:col-span-12 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--accent-primary)] space-y-2.5">
                            <span className="text-xs font-telemetry text-[var(--accent-primary)] block">
                              Wähle ein Foto aus deiner Galerie aus, um es in diesen Abschnitt einzufügen:
                            </span>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-h-40 overflow-y-auto">
                              {photos.map((p) => (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => {
                                    updateBlock(block.id, {
                                      imageUrl: p.imageUrl,
                                      caption:
                                        block.caption ||
                                        `${p.title} — ${p.location}`,
                                      exifNote: `${p.exif?.camera || ''} · ${
                                        p.exif?.focalLength || ''
                                      } · ${p.exif?.aperture || ''}`
                                    });
                                    setGalleryPickerTarget(null);
                                  }}
                                  className="aspect-[4/3] rounded-lg overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-primary)] cursor-pointer"
                                >
                                  <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Block Toolbar */}
                <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-dashed border-[var(--border-color)]">
                  <span className="text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)] mr-2">
                    + Weiteren Abschnitt einfügen:
                  </span>
                  <button
                    type="button"
                    onClick={() => addBlock('paragraph')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[var(--bg-primary)] hover:opacity-85 text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                  >
                    <Type className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>+ Textabsatz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('image')}
                    style={{
                      borderColor: 'var(--accent-primary)',
                      color: 'var(--accent-primary)',
                      backgroundColor: 'var(--surface-subtle)'
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border hover:opacity-85 cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>+ Foto & Bildunterschrift</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('heading')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[var(--bg-primary)] hover:opacity-85 text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                  >
                    <Heading className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                    <span>+ Zwischenüberschrift</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addBlock('quote')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[var(--bg-primary)] hover:opacity-85 text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                  >
                    <Quote className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>+ Zitat</span>
                  </button>
                </div>
              </div>

              {/* Publish Bar */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full hover:opacity-90 font-semibold text-sm shadow-lg transition-all cursor-pointer"
                >
                  <PenTool className="w-4 h-4" />
                  <span>
                    {postForm.id
                      ? 'Änderungen am Beitrag speichern'
                      : 'Blogbeitrag veröffentlichen'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: MANAGE ARCHIVE & 6-PHOTO LANDING PAGE SELECTION TOOL           */}
      {/* ===================================================================== */}
      {subTab === 'manage-archive' && (
        <div className="space-y-12">
          {/* 6-Photo Selection Tool for Landing Page ("01 / Ausgewählte Fotografien") */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--accent-primary)] font-telemetry text-xs uppercase tracking-widest">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Startseiten-Kurator · 01 / Ausgewählte Fotografien</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                  6 Fotografien für die Startseite auswählen
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Wähle bis zu 6 Bilder aus, die auf der Startseite unter „01 / Ausgewählte Fotografien – Naturfotografie und mehr“ prominent präsentiert werden sollen.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <span
                  style={{
                    borderColor: 'var(--accent-primary)',
                    color: 'var(--accent-primary)',
                    backgroundColor: 'var(--surface-subtle)'
                  }}
                  className="px-4 py-2 rounded-full text-xs font-telemetry font-semibold border"
                >
                  Ausgewählt: {selectedLandingIds.length} / 6 Fotos
                </span>
                <button
                  onClick={() => setSubTab('upload-photo')}
                  style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Neues Foto</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {photos.map((photo) => {
                const isSelectedForLanding = Boolean(photo.landingSelected);
                const selectionNumber = selectedLandingIds.indexOf(photo.id) + 1;

                return (
                  <div
                    key={photo.id}
                    className={`rounded-2xl overflow-hidden bg-[var(--bg-primary)] border transition-all flex flex-col justify-between ${
                      isSelectedForLanding
                        ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/30'
                        : 'border-[var(--border-color)]'
                    }`}
                  >
                    <div
                      onClick={() => onSelectPhoto(photo)}
                      className="relative aspect-[4/3] bg-black cursor-pointer group overflow-hidden"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                        {isSelectedForLanding && (
                          <span
                            style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-telemetry font-bold shadow"
                          >
                            Startseite #{selectionNumber}
                          </span>
                        )}
                        {photo.featured && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-telemetry bg-black/75 text-white border border-white/15">
                            Hero-Slider
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-[10px] font-telemetry text-[var(--accent-secondary)] block">
                          {photo.category}
                        </span>
                        <h4 className="font-editorial text-lg text-[var(--text-primary)] truncate">
                          {photo.title}
                        </h4>
                      </div>

                      {/* Toggle for 6-Photo Landing Showcase */}
                      <button
                        type="button"
                        onClick={() => handleToggleLandingPhoto(photo.id)}
                        style={
                          isSelectedForLanding
                            ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                            : undefined
                        }
                        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                          isSelectedForLanding
                            ? 'border-transparent'
                            : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent-primary)]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {isSelectedForLanding
                            ? 'Auf Startseite aktiv (Abwählen)'
                            : 'Für Startseite (6er-Auswahl) wählen'}
                        </span>
                      </button>

                      {/* Hero Slider & Delete Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdatePhoto(photo.id, { featured: !photo.featured })
                          }
                          className={`inline-flex items-center gap-1 text-xs font-telemetry px-2.5 py-1 rounded-lg cursor-pointer ${
                            photo.featured
                              ? 'bg-[var(--surface-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40'
                              : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                          title="Im großen Hero-Banner ganz oben anzeigen"
                        >
                          <Star className="w-3.5 h-3.5" />
                          <span>{photo.featured ? 'Im Hero-Banner' : 'Hero-Banner'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onDeletePhoto(photo.id);
                            showToast(`„${photo.title}“ wurde aus der Galerie entfernt.`);
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 cursor-pointer"
                          title="Foto löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manage Blog Posts */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                  Veröffentlichte Blogbeiträge ({posts.length})
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Bestehende Beiträge bearbeiten, weitere Fotos hinzufügen oder Einträge löschen
                </p>
              </div>
              <button
                onClick={() => {
                  setPostForm(createDefaultPostForm());
                  setSubTab('write-post');
                }}
                style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Neuer Beitrag</span>
              </button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div
                    onClick={() => onSelectPost(post)}
                    className="flex items-center gap-4 cursor-pointer group"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-20 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs font-telemetry text-[var(--accent-primary)]">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span className="text-[var(--text-secondary)]">{post.publishedAt}</span>
                      </div>
                      <h4 className="font-editorial text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setPostForm({
                          id: post.id,
                          title: post.title,
                          subtitle: post.subtitle || '',
                          category: post.category || 'Reisetagebuch',
                          location: post.location || '',
                          publishedAt: post.publishedAt,
                          featured: Boolean(post.featured),
                          coverImage: post.coverImage || '',
                          tags: (post.tags || []).join(', '),
                          blocks: post.blocks || []
                        });
                        setSubTab('write-post');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-[var(--bg-secondary)] hover:opacity-85 text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>Bearbeiten</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onDeletePost(post.id);
                        showToast(`Blogbeitrag „${post.title}“ wurde gelöscht.`);
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 cursor-pointer"
                      title="Beitrag löschen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: ÜBER MICH & KONTAKT EDITOR                                     */}
      {/* ===================================================================== */}
      {subTab === 'about-contact' && (
        <form onSubmit={handleSaveProfileForm} className="space-y-10">
          {/* Portrait Image & Biography */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
              <div>
                <h2 className="font-editorial text-3xl text-[var(--text-primary)]">
                  „Über mich“-Seite bearbeiten
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Passe dein Porträtbild, deine Biografie, deine Kameraausrüstung und die Texte zu deinen Kunstdrucken an.
                </p>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold shadow-md hover:opacity-90 cursor-pointer self-start sm:self-auto"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Alle Änderungen speichern</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 4 Cols: Portrait Photo Upload */}
              <div className="lg:col-span-4 space-y-3">
                <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                  Porträtbild auf der „Über mich“-Seite
                </label>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <img
                    src={profileForm.portraitImage}
                    alt={profileForm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  ref={portraitInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handlePortraitUpload(e.target.files[0]);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => portraitInputRef.current?.click()}
                  style={{
                    borderColor: 'var(--accent-primary)',
                    color: 'var(--accent-primary)',
                    backgroundColor: 'var(--surface-subtle)'
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border hover:opacity-85 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Neues Porträtbild von Datei hochladen</span>
                </button>
                <input
                  type="text"
                  value={profileForm.portraitImage}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, portraitImage: e.target.value })
                  }
                  placeholder="Oder Bild-URL eingeben..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                />
              </div>

              {/* Right 8 Cols: Texts & Biography */}
              <div className="lg:col-span-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                      Name der Fotografin
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                      Standort / Heimatregion
                    </label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                    Leitspruch / Untertitel
                  </label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, tagline: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                    Über-mich-Text / Biografie
                  </label>
                  <textarea
                    rows={5}
                    value={profileForm.bio}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, bio: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] leading-relaxed"
                  />
                </div>

                {/* Prints Section Texts */}
                <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-4">
                  <span className="font-telemetry text-xs uppercase tracking-wider text-[var(--accent-primary)] block">
                    Textblock: Kunstdrucke & Editionen
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                        DACHZEILE
                      </label>
                      <input
                        type="text"
                        value={profileForm.printsSubtitle}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            printsSubtitle: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                        ÜBERSCHRIFT
                      </label>
                      <input
                        type="text"
                        value={profileForm.printsTitle}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            printsTitle: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-telemetry text-[var(--text-secondary)] mb-1">
                      BESCHREIBUNGSTEXT
                    </label>
                    <textarea
                      rows={3}
                      value={profileForm.printsText}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, printsText: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware & Equipment Editor */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-primary)] block">
                Hardware & Technik
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Kameraausrüstung & Objektive bearbeiten
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase text-[var(--text-secondary)]">
                  Überschrift der Ausrüstungs-Box
                </label>
                <input
                  type="text"
                  value={profileForm.equipmentTitle}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, equipmentTitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase text-[var(--text-secondary)]">
                  Einleitungssatz zur Ausrüstung
                </label>
                <input
                  type="text"
                  value={profileForm.equipmentIntro}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, equipmentIntro: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-telemetry uppercase text-[var(--text-secondary)]">
                Einträge in der Ausrüstungsliste ({profileForm.equipment.length})
              </label>
              {profileForm.equipment.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateEquipmentItem(index, e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm font-telemetry text-[var(--text-primary)]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveEquipment(index)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 cursor-pointer"
                    title="Eintrag entfernen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2.5 pt-2">
                <input
                  type="text"
                  value={newEquipmentItem}
                  onChange={(e) => setNewEquipmentItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEquipment();
                    }
                  }}
                  placeholder="Neues Gerät / Objektiv hinzufügen (z. B. Leica SL3 oder Stativ)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                />
                <button
                  type="button"
                  onClick={handleAddEquipment}
                  style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Hinzufügen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact & Social Media Links Editor */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-secondary)] block">
                Kontaktseite & Social Media
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Kontaktdaten, Instagram & Bluesky verknüpfen
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase text-[var(--text-secondary)]">
                  Einleitungstext auf der Kontaktseite
                </label>
                <textarea
                  rows={2}
                  value={profileForm.contactIntro}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, contactIntro: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-telemetry uppercase text-[var(--text-secondary)] mb-1">
                    E-Mail-Adresse
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-telemetry uppercase text-[var(--text-secondary)] mb-1">
                    Telefonnummer (optional)
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Instagram */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
                  <span className="font-telemetry text-xs uppercase text-[var(--accent-primary)] block">
                    Instagram-Profil
                  </span>
                  <input
                    type="text"
                    value={profileForm.socials.instagramHandle}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: {
                          ...profileForm.socials,
                          instagramHandle: e.target.value
                        }
                      })
                    }
                    placeholder="@wolkenrose.petraschemmel"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  />
                  <input
                    type="text"
                    value={profileForm.socials.instagramUrl}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: {
                          ...profileForm.socials,
                          instagramUrl: e.target.value
                        }
                      })
                    }
                    placeholder="https://instagram.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  />
                </div>

                {/* Bluesky */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
                  <span className="font-telemetry text-xs uppercase text-[var(--accent-primary)] block">
                    Bluesky-Profil
                  </span>
                  <input
                    type="text"
                    value={profileForm.socials.blueskyHandle}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: {
                          ...profileForm.socials,
                          blueskyHandle: e.target.value
                        }
                      })
                    }
                    placeholder="@wolkenrose.bsky.social"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  />
                  <input
                    type="text"
                    value={profileForm.socials.blueskyUrl}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: {
                          ...profileForm.socials,
                          blueskyUrl: e.target.value
                        }
                      })
                    }
                    placeholder="https://bsky.app/profile/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  />
                </div>

                {/* YouTube (Optional) */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
                  <span className="font-telemetry text-xs uppercase text-[var(--text-secondary)] block">
                    YouTube-Kanal (optional)
                  </span>
                  <input
                    type="text"
                    value={profileForm.socials.youtubeHandle}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: {
                          ...profileForm.socials,
                          youtubeHandle: e.target.value
                        }
                      })
                    }
                    placeholder="Kanalname (leer lassen zum Ausblenden)"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  />
                  <input
                    type="text"
                    value={profileForm.socials.youtubeUrl}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: {
                          ...profileForm.socials,
                          youtubeUrl: e.target.value
                        }
                      })
                    }
                    placeholder="https://youtube.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  />
                </div>

                {/* Pinterest (Optional) */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
                  <span className="font-telemetry text-xs uppercase text-[var(--text-secondary)] block">
                    Pinterest-Profil (optional)
                  </span>
                  <input
                    type="text"
                    value={profileForm.socials.pinterestHandle}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: {
                          ...profileForm.socials,
                          pinterestHandle: e.target.value
                        }
                      })
                    }
                    placeholder="@wolkenrose (leer lassen zum Ausblenden)"
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  />
                  <input
                    type="text"
                    value={profileForm.socials.pinterestUrl}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        socials: {
                          ...profileForm.socials,
                          pinterestUrl: e.target.value
                        }
                      })
                    }
                    placeholder="https://pinterest.de/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Über-mich & Kontaktdaten speichern</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: DESIGN, FARBEN & SCHRIFTEN                                     */}
      {/* ===================================================================== */}
      {subTab === 'design-colors' && theme && (
        <div className="space-y-10">
          {/* Top Mode & Preset Bar */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
              <div>
                <h2 className="font-editorial text-3xl text-[var(--text-primary)]">
                  Farbdesign, Darstellungsmodus & Schriftarten
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Wähle eine abgestimmte Wolkenrose-Vorlage oder bestimme alle Hauptfarben und kostenlosen Schriftarten für die gesamte Webseite selbst.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onSetColorMode(colorMode === 'dark' ? 'light' : 'dark')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                >
                  {colorMode === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-[var(--accent-primary)]" />
                      <span>Vorschau: Zum Hellmodus wechseln</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-[var(--accent-primary)]" />
                      <span>Vorschau: Zum Dunkelmodus wechseln</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyPreset(THEME_PRESETS[0])}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Standard wiederherstellen</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveThemeToServer}
                  style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold shadow-md hover:opacity-90 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Design & Schriften dauerhaft speichern</span>
                </button>
              </div>
            </div>

            {/* One-Click Curated Presets */}
            <div className="space-y-3">
              <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-primary)] block">
                1. Kuratierte Design-Vorlagen (1-Klick-Aktivierung)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {THEME_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="text-left p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all space-y-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: preset.theme.accentPrimary }}
                        className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                      />
                      <span
                        style={{ backgroundColor: preset.theme.accentSecondary }}
                        className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                      />
                      <span
                        style={{ backgroundColor: preset.theme.darkBgPrimary }}
                        className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                      />
                      <span
                        style={{ backgroundColor: preset.theme.lightBgPrimary }}
                        className="w-6 h-6 rounded-full border border-black/20 shadow-sm"
                      />
                    </div>
                    <div>
                      <h4 className="font-editorial text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {preset.name}
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mt-1">
                        {preset.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Font Customization Section */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-primary)] block">
                2. Typografie & Kostenlose Schriftarten
              </span>
              <h3 className="font-editorial text-3xl text-[var(--text-primary)] mt-1">
                Schriftarten der Webseite auswählen
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Wähle aus bewährten, frei verwendbaren Google Fonts für deine Überschriften, Fließtexte und technischen EXIF-Angaben.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Heading / Editorial Font */}
              <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
                <label className="block text-xs font-semibold text-[var(--text-primary)]">
                  Überschriften & Titel-Schriftart
                </label>
                <select
                  value={theme.fontSerif || 'Cormorant Garamond'}
                  onChange={(e) =>
                    handleColorFieldChange('fontSerif', e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] cursor-pointer"
                >
                  {FREE_FONT_OPTIONS.serif.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <p className="font-editorial text-2xl text-[var(--text-primary)] pt-2 border-t border-[var(--border-color)]">
                  Wolkenrose - Fotografie
                </p>
              </div>

              {/* Body / Sans Font */}
              <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
                <label className="block text-xs font-semibold text-[var(--text-primary)]">
                  Fließtext & Navigation
                </label>
                <select
                  value={theme.fontSans || 'Plus Jakarta Sans'}
                  onChange={(e) =>
                    handleColorFieldChange('fontSans', e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] cursor-pointer"
                >
                  {FREE_FONT_OPTIONS.sans.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-[var(--text-secondary)] pt-2 border-t border-[var(--border-color)] leading-relaxed">
                  Jedes Bild erzählt eine eigene Geschichte aus den Bergen, Wäldern und Mooren.
                </p>
              </div>

              {/* Technical / Monospace Font */}
              <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-3">
                <label className="block text-xs font-semibold text-[var(--text-primary)]">
                  EXIF-Daten & Koordinaten (Monospace)
                </label>
                <select
                  value={theme.fontMono || 'JetBrains Mono'}
                  onChange={(e) =>
                    handleColorFieldChange('fontMono', e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] cursor-pointer"
                >
                  {FREE_FONT_OPTIONS.mono.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <p className="font-telemetry text-xs text-[var(--accent-primary)] pt-2 border-t border-[var(--border-color)]">
                  Hasselblad X2D · 38mm · f/11 · 1/15s · ISO 64
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Color Pickers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Brand Accent Colors & Default Mode */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6 shadow-sm">
              <div>
                <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-primary)] block">
                  3. Marken- & Akzentfarben
                </span>
                <h3 className="font-editorial text-2xl text-[var(--text-primary)] mt-1">
                  Hauptakzente & Startmodus
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Primäre Akzentfarbe (Buttons, Highlights, aktive Elemente)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={theme.accentPrimary}
                      onChange={(e) =>
                        handleColorFieldChange('accentPrimary', e.target.value)
                      }
                      className="w-11 h-11 rounded-xl cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.accentPrimary}
                      onChange={(e) =>
                        handleColorFieldChange('accentPrimary', e.target.value)
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] font-telemetry text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Sekundäre Akzentfarbe (Ortsangaben, Natur-Badges)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={theme.accentSecondary}
                      onChange={(e) =>
                        handleColorFieldChange('accentSecondary', e.target.value)
                      }
                      className="w-11 h-11 rounded-xl cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.accentSecondary}
                      onChange={(e) =>
                        handleColorFieldChange('accentSecondary', e.target.value)
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] font-telemetry text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Standard-Modus für neue Besucher
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleColorFieldChange('defaultMode', 'dark');
                        onSetColorMode('dark');
                      }}
                      style={
                        theme.defaultMode === 'dark'
                          ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                          : undefined
                      }
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-[var(--border-color)] cursor-pointer ${
                        theme.defaultMode === 'dark'
                          ? ''
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dunkelmodus</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleColorFieldChange('defaultMode', 'light');
                        onSetColorMode('light');
                      }}
                      style={
                        theme.defaultMode === 'light'
                          ? { backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }
                          : undefined
                      }
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-[var(--border-color)] cursor-pointer ${
                        theme.defaultMode === 'light'
                          ? ''
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>Hellmodus</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Dark Mode Custom Colors */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-primary)] block">
                    4. Dunkelmodus-Palette
                  </span>
                  <h3 className="font-editorial text-2xl text-[var(--text-primary)] mt-1">
                    Farben im Dunkelmodus
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSetColorMode('dark')}
                  className="px-3 py-1 rounded-full text-[11px] font-telemetry bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] cursor-pointer"
                >
                  Live testen
                </button>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    key: 'darkBgPrimary',
                    label: 'Haupt-Hintergrund (Seite)'
                  },
                  {
                    key: 'darkBgSecondary',
                    label: 'Karten- & Galerie-Oberfläche'
                  },
                  {
                    key: 'darkTextPrimary',
                    label: 'Haupt-Textfarbe & Überschriften'
                  },
                  {
                    key: 'darkTextSecondary',
                    label: 'Gedämpfte Textfarbe (Beschreibungen)'
                  }
                ].map((item) => (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <span className="block text-xs font-medium text-[var(--text-primary)]">
                        {item.label}
                      </span>
                      <span className="block font-telemetry text-[11px] text-[var(--text-secondary)]">
                        {theme[item.key]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme[item.key]}
                        onChange={(e) =>
                          handleColorFieldChange(item.key, e.target.value)
                        }
                        className="w-9 h-9 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={theme[item.key]}
                        onChange={(e) =>
                          handleColorFieldChange(item.key, e.target.value)
                        }
                        className="w-24 px-2.5 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] font-telemetry text-xs text-[var(--text-primary)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Light Mode Custom Colors */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-primary)] block">
                    5. Hellmodus-Palette
                  </span>
                  <h3 className="font-editorial text-2xl text-[var(--text-primary)] mt-1">
                    Farben im Hellmodus
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSetColorMode('light')}
                  className="px-3 py-1 rounded-full text-[11px] font-telemetry bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)] cursor-pointer"
                >
                  Live testen
                </button>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    key: 'lightBgPrimary',
                    label: 'Haupt-Hintergrund (Naturpapier)'
                  },
                  {
                    key: 'lightBgSecondary',
                    label: 'Karten- & Galerie-Oberfläche'
                  },
                  {
                    key: 'lightTextPrimary',
                    label: 'Haupt-Textfarbe & Überschriften'
                  },
                  {
                    key: 'lightTextSecondary',
                    label: 'Gedämpfte Textfarbe (Beschreibungen)'
                  }
                ].map((item) => (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <span className="block text-xs font-medium text-[var(--text-primary)]">
                        {item.label}
                      </span>
                      <span className="block font-telemetry text-[11px] text-[var(--text-secondary)]">
                        {theme[item.key]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme[item.key]}
                        onChange={(e) =>
                          handleColorFieldChange(item.key, e.target.value)
                        }
                        className="w-9 h-9 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={theme[item.key]}
                        onChange={(e) =>
                          handleColorFieldChange(item.key, e.target.value)
                        }
                        className="w-24 px-2.5 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] font-telemetry text-xs text-[var(--text-primary)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
