import React from 'react';
import {
  Camera,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function AboutSection({ profile }) {
  const portraitSrc =
    profile?.portraitImage ||
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Top Biography Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-4 flex flex-col items-center text-center space-y-5">
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl ring-4 ring-[var(--surface-subtle)] shrink-0">
            <img
              src={portraitSrc}
              alt={profile?.name || 'Petra Schemmel'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="inline-flex flex-col items-center px-5 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm">
            <span className="font-telemetry text-[10px] uppercase tracking-widest text-[var(--accent-primary)] block">
              Based in
            </span>
            <span className="text-sm text-[var(--text-primary)] flex items-center gap-1.5 mt-1 font-medium">
              <MapPin className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
              <span>{profile?.location || 'Setze eine Location im Adminbereich'}</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-[var(--accent-primary)] block">
            Wolkenrose · Über mich
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[var(--text-primary)] leading-tight">
            {profile?.name || 'Petra Schemmel'}
          </h1>
          <p className="font-editorial italic text-2xl text-[var(--accent-primary)]">
            „{profile?.tagline || 'Setze einen Slogan im Adminbereich'}“
          </p>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-light whitespace-pre-line">
            {profile?.bio}
          </p>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 space-y-5 shadow-sm">
        <div className="flex items-center gap-2.5 text-[var(--accent-primary)]">
          <Camera className="w-5 h-5" />
          <h2 className="font-editorial text-3xl text-[var(--text-primary)]">
            {profile?.equipmentTitle || 'Setze einen Titel im Adminbereich'}
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
          {profile?.equipmentIntro ||
            'Setze eine Einleitung im Adminbereich'}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {(profile?.equipment || []).map((item, idx) => (
            <li
              key={`${item}-${idx}`}
              className="flex items-center gap-3 text-sm font-telemetry text-[var(--text-primary)] bg-[var(--bg-primary)] px-4 py-3 rounded-xl border border-[var(--border-color)]"
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
