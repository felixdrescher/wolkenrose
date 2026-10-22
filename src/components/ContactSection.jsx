import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  ExternalLink,
  CheckCircle2,
  Globe,
  Sparkles
} from 'lucide-react';

export default function ContactSection({ profile }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Kunstdruck-Anfrage',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const socials = profile?.socials || {};

  const socialLinks = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: socials.instagramHandle || profile?.instagram || '@wolkenrose.petraschemmel',
      url: socials.instagramUrl || 'https://instagram.com',
      description: 'Aktuelle Aufnahmen, Storys & Einblicke von unterwegs'
    },
    {
      id: 'bluesky',
      name: 'Bluesky',
      handle: socials.blueskyHandle || '@wolkenrose.bsky.social',
      url: socials.blueskyUrl || 'https://bsky.app',
      description: 'Fotografischer Austausch, Naturbeobachtungen & Kurznotizen'
    },
    ...(socials.youtubeUrl || socials.youtubeHandle
      ? [
          {
            id: 'youtube',
            name: 'YouTube',
            handle: socials.youtubeHandle || 'Wolkenrose - Fotografie',
            url: socials.youtubeUrl,
            description: 'Videotagebücher & Making-of-Berichte aus der Natur'
          }
        ]
      : []),
    ...(socials.pinterestUrl || socials.pinterestHandle
      ? [
          {
            id: 'pinterest',
            name: 'Pinterest',
            handle: socials.pinterestHandle || '@wolkenrose',
            url: socials.pinterestUrl,
            description: 'Kuratierte Moodboards & Fine-Art-Sammlungen'
          }
        ]
      : [])
  ].filter((s) => s.handle || s.url);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({
      name: '',
      email: '',
      subject: 'Kunstdruck-Anfrage',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-8 space-y-3">
        <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-[var(--accent-primary)] block">
          Wolkenrose · Kontakt & Soziale Netzwerke
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[var(--text-primary)]">
          Kontakt aufnehmen
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {profile?.contactIntro ||
            'Du interessierst dich für einen handsignierten Fine-Art-Kunstdruck, eine Ausstellung oder möchtest dich über Naturfotografie austauschen? Ich freue mich über deine Nachricht.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Details & Social Media Profiles */}
        <div className="lg:col-span-5 space-y-8">
          {/* Direct Atelier Contact Card */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-7 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-[var(--accent-primary)]">
              <Sparkles className="w-4 h-4" />
              <span className="font-telemetry text-xs uppercase tracking-widest">
                Atelier Wolkenrose
              </span>
            </div>

            <h2 className="font-editorial text-3xl text-[var(--text-primary)]">
              {profile?.name || 'Petra Schemmel'}
            </h2>

            <div className="space-y-3.5 pt-2">
              <a
                href={`mailto:${profile?.email || 'atelier@wolkenrose-fotografie.de'}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors group"
              >
                <div
                  style={{
                    borderColor: 'var(--accent-primary)',
                    color: 'var(--accent-primary)',
                    backgroundColor: 'var(--surface-subtle)'
                  }}
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                >
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-telemetry text-[10px] uppercase text-[var(--text-secondary)]">
                    E-Mail-Adresse
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {profile?.email || 'atelier@wolkenrose-fotografie.de'}
                  </span>
                </div>
              </a>

              {profile?.phone && (
                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <div
                    style={{
                      borderColor: 'var(--accent-secondary)',
                      color: 'var(--accent-secondary)',
                      backgroundColor: 'var(--surface-subtle)'
                    }}
                    className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-telemetry text-[10px] uppercase text-[var(--text-secondary)]">
                      Telefon / Atelier
                    </span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {profile.phone}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <div
                  style={{
                    borderColor: 'var(--accent-primary)',
                    color: 'var(--accent-primary)',
                    backgroundColor: 'var(--surface-subtle)'
                  }}
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-telemetry text-[10px] uppercase text-[var(--text-secondary)]">
                    Standort
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {profile?.location || 'Voralpenland & Unterwegs'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Profiles (Instagram, Bluesky, etc.) */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-7 space-y-5 shadow-sm">
            <div>
              <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-secondary)] block">
                Folge meiner Arbeit
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Social Media & Kanäle
              </h2>
            </div>

            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      style={{
                        borderColor: 'var(--accent-primary)',
                        color: 'var(--accent-primary)',
                        backgroundColor: 'var(--surface-subtle)'
                      }}
                      className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                    >
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {social.name}
                        </span>
                        <span className="font-telemetry text-xs text-[var(--accent-primary)]">
                          {social.handle}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {social.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-7 sm:p-10 space-y-6 shadow-sm">
            <div>
              <span className="font-telemetry text-xs uppercase tracking-widest text-[var(--accent-primary)] block">
                Nachricht senden
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] mt-1">
                Schreib mir direkt
              </h2>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-[var(--text-primary)] flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>
                  Vielen Dank für deine Nachricht! Ich melde mich so bald wie möglich bei dir zurück.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                    Dein Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="Vor- und Nachname"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                    Deine E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="name@beispiel.de"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                  Betreff
                </label>
                <select
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                >
                  <option value="Kunstdruck-Anfrage">Anfrage zu einem Fine-Art-Kunstdruck</option>
                  <option value="Ausstellung & Kooperation">Ausstellung & Kooperation</option>
                  <option value="Bildlizenz">Bildlizenz & Veröffentlichung</option>
                  <option value="Allgemeine Nachricht">Allgemeine Nachricht / Feedback</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-telemetry uppercase tracking-wider text-[var(--text-secondary)]">
                  Deine Nachricht *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  placeholder="Wie kann ich dir weiterhelfen?"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#0B0E0C' }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm shadow-lg hover:opacity-90 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Nachricht absenden</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
