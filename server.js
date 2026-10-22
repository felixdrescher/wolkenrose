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
    if (!parsed.theme) {
      parsed.theme = structuredClone(initialData.theme);
    } else {
      parsed.theme = { ...initialData.theme, ...parsed.theme };
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

// POST create a new gallery photo
app.post('/api/photos', (req, res) => {
  const db = loadDb();
  const {
    title,
    category,
    location,
    coordinates,
    dateTaken,
    featured,
    landingSelected,
    aspectRatio,
    imageUrl,
    story,
    exif
  } = req.body;

  if (!title || !imageUrl) {
    return res.status(400).json({ error: 'Titel und Bild sind erforderlich' });
  }

  const newPhoto = {
    id: `photo-${Date.now()}`,
    title: title.trim(),
    category: category || 'Alpen & Gletscher',
    location: location || 'Alpenraum',
    coordinates: coordinates || '47.4917° N, 11.0955° O',
    dateTaken: dateTaken || new Date().toISOString().split('T')[0],
    featured: Boolean(featured),
    landingSelected: Boolean(landingSelected),
    aspectRatio: aspectRatio || 'landscape',
    imageUrl,
    story: story || '',
    exif: {
      camera: exif?.camera || 'Hasselblad X2D 100C',
      lens: exif?.lens || 'XCD 2,5/55V',
      focalLength: exif?.focalLength || '55mm',
      aperture: exif?.aperture || 'f/8',
      shutterSpeed: exif?.shutterSpeed || '1/125s',
      iso: exif?.iso || '100'
    }
  };

  db.photos.unshift(newPhoto);
  saveDb(db);
  res.status(201).json(newPhoto);
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
  db.photos[idx] = updated;
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
    category: category || 'Reisetagebuch',
    location: location || 'Unterwegs in der Natur',
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

// PUT update global design, color & font theme
app.put('/api/theme', (req, res) => {
  const db = loadDb();
  db.theme = {
    ...(db.theme || initialData.theme),
    ...req.body
  };
  saveDb(db);
  res.json(db.theme);
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
