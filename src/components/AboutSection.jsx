import React from 'react';
import {
  Camera,
  MapPin,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

export default function AboutSection({ profile, onNavigate }) {
  const portraitSrc =
    profile?.portraitImage ||
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Top Biography Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] aspect-[4/5] shadow-2xl">
            <img
              src={portraitSrc}
              alt={profile?.name || 'Petra Schemmel'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15">
              <span className="font-telemetry text-[11px] uppercase tracking-widest text-[var(--accent-primary)] block">
                Heimat & Atelier Wolkenrose
              </span>
              <span className="text-sm text-white flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[var(--accent-secondary)]" />
                {profile?.location || 'Voralpenland & Unterwegs · 47.7267° N, 11.8606° O'}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-[var(--accent-primary)] block">
            Wolkenrose · Über mich
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[var(--text-primary)] leading-tight">
            {profile?.name || 'Petra Schemmel'}
          </h1>
          <p className="font-editorial italic text-2xl text-[var(--accent-primary)]">
            „{profile?.tagline || 'Poetische Natur-, Wolken- & Landschaftsfotografie'}“
          </p>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-light whitespace-pre-line">
            {profile?.bio}
          </p>
        </div>
      </div>

      {/* Equipment & Archival Print Craft (without Kontakt box, moved to Kontakt page) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-[var(--accent-primary)]">
            <Camera className="w-5 h-5" />
            <h2 className="font-editorial text-3xl text-[var(--text-primary)]">
              {profile?.equipmentTitle || 'Kameraausrüstung & Objektive'}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
            {profile?.equipmentIntro ||
              'Meine Ausrüstung ist auf feinste Tonwertabstufungen, hohe Detailauflösung und extreme Witterungsbedingungen in den Bergen und im hohen Norden ausgelegt.'}
          </p>
          <ul className="space-y-3 pt-2">
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

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-sm">
          <div className="space-y-4">
            <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-secondary)]">
              {profile?.printsSubtitle || 'Fine-Art-Editionen & Manufaktur'}
            </span>
            <h2 className="font-editorial text-3xl text-[var(--text-primary)]">
              {profile?.printsTitle ||
                'Handsignierte Kunstdrucke aus dem Atelier Wolkenrose'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
              {profile?.printsText ||
                'Alle Werke der Galerie sind als handsignierte, limitierte Fine-Art-Pigmentdrucke auf 315g Hahnemühle Photo Rag Baryta Büttenpapier erhältlich. Ein Teil jedes Verkaufs fließt in den Schutz heimischer Moore und alter Waldbestände.'}
            </p>
          </div>

          {onNavigate && (
            <div className="pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => onNavigate('contact')}
                style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
              >
                <span>Anfragen & Kontakt aufnehmen</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
