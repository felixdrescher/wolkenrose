import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { initialData } from './data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initialize or load database
function loadDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return structuredClone(initialData);
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.categories)) {
      parsed.categories = structuredClone(initialData.categories);
    }
    if (!Array.isArray(parsed.blogCategories)) {
      parsed.blogCategories = structuredClone(initialData.blogCategories);
    }
    if (!parsed.theme) {
      parsed.theme = structuredClone(initialData.theme);
    } else {
      parsed.theme = { ...initialData.theme, ...parsed.theme };
    }
    if (!Array.isArray(parsed.customThemes) || parsed.customThemes.length === 0) {
      parsed.customThemes = structuredClone(initialData.customThemes);
    }
    if (!parsed.profile) {
      parsed.profile = structuredClone(initialData.profile);
    } else {
      parsed.profile = {
        ...initialData.profile,
        ...parsed.profile,
        socials: {
          ...initialData.profile.socials,
          ...(parsed.profile.socials || {})
        }
      };
    }
    if (Array.isArray(parsed.photos)) {
      let seenFeatured = false;
      parsed.photos = parsed.photos.map((photo) => {
        if (photo.featured && !seenFeatured) {
          seenFeatured = true;
          return { ...photo, featured: true };
        }
        return { ...photo, featured: false };
      });
    }
    return parsed;
  } catch (err) {
    console.error('Fehler beim Lesen von db.json, setze auf Ausgangsdaten zurück:', err);
    return structuredClone(initialData);
  }
}

function saveDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Configure Multer for disk image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const safeBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .toLowerCase()
      .slice(0, 40);
    cb(null, `${Date.now()}-${safeBase || 'foto'}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB Limit
});

app.use(express.json({ limit: '25mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

// GET full application state
app.get('/api/state', (_req, res) => {
  const db = loadDb();
  res.json(db);
});

// POST upload an image file
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Keine Bilddatei ausgewählt' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    imageUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

// POST create a new gallery photo (EXIF, location, dateTaken, story are all optional)
app.post('/api/photos', (req, res) => {
  const db = loadDb();
  const {
    title,
    category,
    location,
    dateTaken,
    featured,
    landingSelected,
    aspectRatio,
    imageUrl,
    story,
    exif
  } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Ein Bild ist erforderlich' });
  }

  const newPhoto = {
    id: `photo-${Date.now()}`,
    title: (title || 'Unbetitelte Aufnahme').trim(),
    category: category ? category.trim() : '',
    location: location ? location.trim() : '',
    dateTaken: dateTaken ? dateTaken.trim() : '',
    featured: Boolean(featured),
    landingSelected: Boolean(landingSelected),
    aspectRatio: aspectRatio || 'landscape',
    imageUrl,
    story: story ? story.trim() : '',
    exif: {
      camera: exif?.camera?.trim() || '',
      lens: exif?.lens?.trim() || '',
      focalLength: exif?.focalLength?.trim() || '',
      aperture: exif?.aperture?.trim() || '',
      shutterSpeed: exif?.shutterSpeed?.trim() || '',
      iso: exif?.iso?.trim() || ''
    }
  };

  if (newPhoto.category && !db.categories.includes(newPhoto.category)) {
    db.categories.push(newPhoto.category);
  }

  if (newPhoto.featured) {
    db.photos = db.photos.map((p) => ({ ...p, featured: false }));
  }

  db.photos.unshift(newPhoto);
  saveDb(db);
  res.status(201).json(newPhoto);
});

// POST create a new gallery photo category
app.post('/api/categories', (req, res) => {
  const db = loadDb();
  const name = (req.body?.name || '').trim();
  if (!name) {
    return res.status(400).json({ error: 'Kategoriename darf nicht leer sein' });
  }
  if (!db.categories.includes(name)) {
    db.categories.push(name);
    saveDb(db);
  }
  res.json({ categories: db.categories, photos: db.photos });
});

// PUT rename an existing gallery photo category
app.put('/api/categories', (req, res) => {
  const db = loadDb();
  const oldName = (req.body?.oldName || '').trim();
  const newName = (req.body?.newName || '').trim();
  if (!oldName || !newName) {
    return res.status(400).json({ error: 'Alter und neuer Kategoriename erforderlich' });
  }

  db.categories = db.categories.map((cat) => (cat === oldName ? newName : cat));
  db.categories = Array.from(new Set(db.categories));

  db.photos = db.photos.map((photo) =>
    photo.category === oldName ? { ...photo, category: newName } : photo
  );

  saveDb(db);
  res.json({ categories: db.categories, photos: db.photos });
});

// DELETE a gallery photo category (existing photos in this category default to no category: '')
app.delete('/api/categories', (req, res) => {
  const db = loadDb();
  const name = (req.body?.name || '').trim();
  if (!name) {
    return res.status(400).json({ error: 'Kategoriename erforderlich' });
  }

  db.categories = db.categories.filter((cat) => cat !== name);
  db.photos = db.photos.map((photo) =>
    photo.category === name ? { ...photo, category: '' } : photo
  );

  saveDb(db);
  res.json({ categories: db.categories, photos: db.photos });
});

// POST create a new blog category (Rubrik)
app.post('/api/blog-categories', (req, res) => {
  const db = loadDb();
  const name = (req.body?.name || '').trim();
  if (!name) {
    return res.status(400).json({ error: 'Rubrikname darf nicht leer sein' });
  }
  if (!db.blogCategories.includes(name)) {
    db.blogCategories.push(name);
    saveDb(db);
  }
  res.json({ blogCategories: db.blogCategories, posts: db.posts });
});

// PUT rename an existing blog category (Rubrik)
app.put('/api/blog-categories', (req, res) => {
  const db = loadDb();
  const oldName = (req.body?.oldName || '').trim();
  const newName = (req.body?.newName || '').trim();
  if (!oldName || !newName) {
    return res.status(400).json({ error: 'Alter und neuer Rubrikname erforderlich' });
  }

  db.blogCategories = db.blogCategories.map((cat) => (cat === oldName ? newName : cat));
  db.blogCategories = Array.from(new Set(db.blogCategories));

  db.posts = db.posts.map((post) =>
    post.category === oldName ? { ...post, category: newName } : post
  );

  saveDb(db);
  res.json({ blogCategories: db.blogCategories, posts: db.posts });
});

// DELETE a blog category (existing blog posts in this category default to no category: '')
app.delete('/api/blog-categories', (req, res) => {
  const db = loadDb();
  const name = (req.body?.name || '').trim();
  if (!name) {
    return res.status(400).json({ error: 'Rubrikname erforderlich' });
  }

  db.blogCategories = db.blogCategories.filter((cat) => cat !== name);
  db.posts = db.posts.map((post) =>
    post.category === name ? { ...post, category: '' } : post
  );

  saveDb(db);
  res.json({ blogCategories: db.blogCategories, posts: db.posts });
});

// PUT update landing page 6-photo selection
app.put('/api/landing-selection', (req, res) => {
  const db = loadDb();
  const { photoIds } = req.body;
  if (!Array.isArray(photoIds)) {
    return res.status(400).json({ error: 'photoIds Array erforderlich' });
  }
  const selectedSet = new Set(photoIds.slice(0, 6));
  db.photos = db.photos.map((photo) => ({
    ...photo,
    landingSelected: selectedSet.has(photo.id)
  }));
  saveDb(db);
  res.json(db.photos);
});

// PUT update an existing photo
app.put('/api/photos/:id', (req, res) => {
  const db = loadDb();
  const idx = db.photos.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Fotografie nicht gefunden' });
  }
  const existing = db.photos[idx];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id,
    exif: {
      ...existing.exif,
      ...(req.body.exif || {})
    }
  };
  if (updated.featured) {
    db.photos = db.photos.map((p, i) =>
      i === idx ? updated : { ...p, featured: false }
    );
  } else {
    db.photos[idx] = updated;
  }
  saveDb(db);
  res.json(updated);
});

// DELETE a photo
app.delete('/api/photos/:id', (req, res) => {
  const db = loadDb();
  const idx = db.photos.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Fotografie nicht gefunden' });
  }
  db.photos.splice(idx, 1);
  saveDb(db);
  res.json({ success: true });
});

// POST create a new blog post
app.post('/api/posts', (req, res) => {
  const db = loadDb();
  const {
    title,
    subtitle,
    category,
    location,
    publishedAt,
    featured,
    coverImage,
    tags,
    blocks
  } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Bitte geben Sie einen Titel ein' });
  }

  const newPost = {
    id: `post-${Date.now()}`,
    title: title.trim(),
    subtitle: subtitle || '',
    category: category ? category.trim() : '',
    location: location ? location.trim() : '',
    publishedAt: publishedAt || new Date().toISOString().split('T')[0],
    featured: Boolean(featured),
    coverImage:
      coverImage ||
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
    tags: Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
        ? tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : ['Naturfotografie'],
    blocks: Array.isArray(blocks) && blocks.length > 0 ? blocks : []
  };

  if (newPost.category && !db.blogCategories.includes(newPost.category)) {
    db.blogCategories.push(newPost.category);
  }

  db.posts.unshift(newPost);
  saveDb(db);
  res.status(201).json(newPost);
});

// PUT update an existing blog post
app.put('/api/posts/:id', (req, res) => {
  const db = loadDb();
  const idx = db.posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Beitrag nicht gefunden' });
  }
  const existing = db.posts[idx];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id
  };
  db.posts[idx] = updated;
  saveDb(db);
  res.json(updated);
});

// DELETE a blog post
app.delete('/api/posts/:id', (req, res) => {
  const db = loadDb();
  const idx = db.posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Beitrag nicht gefunden' });
  }
  db.posts.splice(idx, 1);
  saveDb(db);
  res.json({ success: true });
});

// PUT update photographer profile (About me & Kontakt)
app.put('/api/profile', (req, res) => {
  const db = loadDb();
  db.profile = {
    ...db.profile,
    ...req.body,
    socials: {
      ...(db.profile.socials || {}),
      ...(req.body.socials || {})
    }
  };
  saveDb(db);
  res.json(db.profile);
});

// PUT update global design, color & font theme (and optionally sync active customTheme)
app.put('/api/theme', (req, res) => {
  const db = loadDb();
  const { customThemes, ...themePatch } = req.body || {};

  db.theme = {
    ...(db.theme || initialData.theme),
    ...themePatch
  };

  if (Array.isArray(customThemes)) {
    db.customThemes = customThemes;
  } else if (db.theme.activeThemeId && Array.isArray(db.customThemes)) {
    const { activeThemeId, ...themeValues } = db.theme;
    db.customThemes = db.customThemes.map((ct) =>
      ct.id === activeThemeId
        ? {
            ...ct,
            theme: { ...ct.theme, ...themeValues }
          }
        : ct
    );
  }

  saveDb(db);
  res.json({ theme: db.theme, customThemes: db.customThemes });
});

// POST create a new custom theme
app.post('/api/custom-themes', (req, res) => {
  const db = loadDb();
  const { name, description, theme: themeValues } = req.body || {};
  const newId = `theme-${Date.now()}`;
  const cleanTheme = {
    ...(db.theme || initialData.theme),
    ...(themeValues || {})
  };
  delete cleanTheme.activeThemeId;

  const newCustomTheme = {
    id: newId,
    name: (name || 'Neues Custom Theme').trim(),
    description: (description || '').trim(),
    theme: cleanTheme
  };

  db.customThemes.push(newCustomTheme);
  db.theme = {
    ...cleanTheme,
    activeThemeId: newId
  };

  saveDb(db);
  res.status(201).json({
    customTheme: newCustomTheme,
    theme: db.theme,
    customThemes: db.customThemes
  });
});

// PUT update an existing custom theme (name, description, and/or theme values)
app.put('/api/custom-themes/:id', (req, res) => {
  const db = loadDb();
  const idx = db.customThemes.findIndex((ct) => ct.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Theme nicht gefunden' });
  }

  const existing = db.customThemes[idx];
  const { name, description, theme: themeValues, setActive } = req.body || {};
  const nextThemeValues = {
    ...existing.theme,
    ...(themeValues || {})
  };
  delete nextThemeValues.activeThemeId;

  const updatedCustomTheme = {
    ...existing,
    name: name !== undefined ? name.trim() || existing.name : existing.name,
    description:
      description !== undefined ? description.trim() : existing.description || '',
    theme: nextThemeValues
  };

  db.customThemes[idx] = updatedCustomTheme;

  if (setActive !== false && db.theme.activeThemeId === existing.id) {
    db.theme = {
      ...nextThemeValues,
      activeThemeId: existing.id
    };
  }

  saveDb(db);
  res.json({
    customTheme: updatedCustomTheme,
    theme: db.theme,
    customThemes: db.customThemes
  });
});

// DELETE a custom theme
app.delete('/api/custom-themes/:id', (req, res) => {
  const db = loadDb();
  if (db.customThemes.length <= 1) {
    return res
      .status(400)
      .json({ error: 'Mindestens ein Theme muss erhalten bleiben.' });
  }

  const idx = db.customThemes.findIndex((ct) => ct.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Theme nicht gefunden' });
  }

  const deletedId = db.customThemes[idx].id;
  db.customThemes.splice(idx, 1);

  if (db.theme.activeThemeId === deletedId) {
    const fallback = db.customThemes[0];
    db.theme = {
      ...fallback.theme,
      activeThemeId: fallback.id
    };
  }

  saveDb(db);
  res.json({
    theme: db.theme,
    customThemes: db.customThemes
  });
});

// POST reset custom themes and active theme to defaults
app.post('/api/custom-themes/reset', (_req, res) => {
  const db = loadDb();
  db.customThemes = structuredClone(initialData.customThemes);
  db.theme = structuredClone(initialData.theme);
  saveDb(db);
  res.json({
    theme: db.theme,
    customThemes: db.customThemes
  });
});

// Serve built frontend in production / unified mode
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`Wolkenrose - Fotografie Server läuft auf http://localhost:${PORT}`);
});
