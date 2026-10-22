import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center text-center text-xs font-telemetry text-[var(--text-secondary)]">
        <span>
          © 2026 Wolkenrose — Petra Schemmel. Alle Bildrechte vorbehalten.
        </span>
      </div>
    </footer>
  );
}
