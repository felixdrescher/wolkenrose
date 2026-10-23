import React from 'react';
import {
  Aperture,
  Image as ImageIcon,
  BookOpen,
  User,
  Sun,
  Moon,
  Mail,
  Settings
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  profile,
  colorMode,
  onToggleColorMode
}) {
  const navItems = [
    { id: 'gallery', label: 'Galerie', icon: ImageIcon },
    { id: 'journal', label: 'Blog', icon: BookOpen },
    { id: 'about', label: 'Über mich', icon: User },
    { id: 'contact', label: 'Kontakt', icon: Mail }
  ];

  return (
    <header
      style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--border-color)' }}
      className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Identity: Wolkenrose - Fotografie (Clicks to Landing Page 'home') */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3.5 text-left group focus:outline-none cursor-pointer"
        >
          <div
            style={{
              borderColor: 'var(--accent-primary)',
              color: 'var(--accent-primary)',
              backgroundColor: 'var(--surface-subtle)'
            }}
            className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:scale-105 transition-all"
          >
            <Aperture className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-editorial text-2xl sm:text-3xl tracking-wide font-semibold text-[var(--text-primary)] leading-none">
              Wolkenrose - Fotografie
            </span>
            <span
              style={{ color: 'var(--accent-primary)' }}
              className="block font-telemetry text-[10px] tracking-[0.18em] uppercase mt-1"
            >
              von {profile?.name || 'Petra Schemmel'}
            </span>
          </div>
        </button>

        {/* Center Navigation (Galerie, Blog, Über mich, Kontakt) */}
        <nav
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }}
          className="hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-colors"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={
                  isActive
                    ? {
                        backgroundColor: 'var(--accent-primary)',
                        color: '#0B0E0C'
                      }
                    : { color: 'var(--text-secondary)' }
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'shadow-md font-semibold'
                    : 'hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Theme Switcher (Light/Dark) + Adminbereich */}
        <div className="flex items-center gap-2.5">
          {/* Regular User Light / Dark Mode Switch */}
          <button
            onClick={onToggleColorMode}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            title={
              colorMode === 'dark'
                ? 'Zum Hellmodus wechseln'
                : 'Zum Dunkelmodus wechseln'
            }
            aria-label="Darstellungsmodus wechseln (Hell/Dunkel)"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border hover:opacity-90 transition-all cursor-pointer"
          >
            {colorMode === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-[var(--accent-primary)]" />
                <span className="hidden xl:inline">Hellmodus</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[var(--accent-primary)]" />
                <span className="hidden xl:inline">Dunkelmodus</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            style={
              activeTab === 'studio'
                ? {
                    backgroundColor: 'var(--accent-primary)',
                    borderColor: 'var(--accent-primary)',
                    color: '#0B0E0C'
                  }
                : {
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--accent-primary)',
                    color: 'var(--accent-primary)'
                  }
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border"
          >
            <Settings className="w-4 h-4" />
            <span>Adminbereich</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)'
        }}
        className="flex md:hidden items-center justify-around border-t px-2 py-2 overflow-x-auto"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={
                isActive
                  ? {
                      backgroundColor: 'var(--accent-primary)',
                      color: '#0B0E0C'
                    }
                  : { color: 'var(--text-secondary)' }
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer"
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
