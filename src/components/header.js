'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseBusiness, CircleHelp, Flame, MessageSquareText, Moon, Sun } from 'lucide-react';

const THEMES = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'warm', label: 'Warm', icon: Flame },
  { id: 'dark', label: 'Dark', icon: Moon },
];

const ROUTES = [
  { href: '/portfolio', label: 'Portfolio', icon: BriefcaseBusiness },
  { href: '/feedback', label: 'Feedback', icon: MessageSquareText },
  { href: '/faq', label: 'FAQ', icon: CircleHelp },
];

const ANCHORS = [
  { href: '#tech-stack', label: 'Tech Stack' },
  { href: '#services', label: 'Services' },
  { href: '#testimonial', label: 'Testimonial' },
  { href: '#partner', label: 'Partner' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ locale, navContent }) {
  const pathname = usePathname();
  const currentLang = locale;
  const isSpanish = locale === 'es';

  const [theme, setTheme] = useState('warm');
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme') || 'warm';
    document.documentElement.setAttribute('data-theme', stored);
    const initialFrame = window.requestAnimationFrame(() => {
      setTheme(stored);
      setIsCompact(window.scrollY > 36);
    });

    const updateCompactState = () => {
      setIsCompact(window.scrollY > 36);
    };
    window.addEventListener('scroll', updateCompactState, { passive: true });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', updateCompactState);
    };
  }, []);

  const applyTheme = (nextTheme) => {
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem('theme', nextTheme);
  };

  const toggleLanguage = (newLang) => {
    if (newLang === currentLang) return;

    const pathWithoutLocale = pathname.replace(/^\/(?:en|es)(?=\/|$)/, '') || '/';
    const targetPath =
      newLang === 'en'
        ? pathWithoutLocale
        : `/es${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    const query = window.location.search;
    const hash = window.location.hash;

    window.location.assign(`${targetPath}${query}${hash}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[height,background-color,border-color] duration-200 ease-out ${
        isCompact ? 'h-[45px]' : 'h-[90px]'
      }`}
      style={{
        backgroundColor: 'color-mix(in srgb, var(--theme-primary) 35%, transparent)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderColor: 'color-mix(in srgb, var(--theme-border) 40%, rgba(255,255,255,0.2) 60%)',
        color: 'var(--theme-text)',
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 4px 30px rgba(0,0,0,0.05)',
      }}
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 sm:px-5 lg:grid-cols-[minmax(245px,1fr)_auto_minmax(235px,1fr)] lg:gap-6 lg:px-8">
        <Link href={isSpanish ? '/es' : '/'} className="flex min-w-0 items-center gap-2" aria-label="Virtual Assistant home">
          <span
            className={`grid shrink-0 place-items-center overflow-hidden rounded-full border transition-[width,height,box-shadow] duration-200 ${
              isCompact ? 'h-[37px] w-[37px]' : 'h-[80px] w-[80px]'
            }`}
            style={{
              borderColor: 'color-mix(in srgb, var(--theme-border) 88%, white 12%)',
              background: 'radial-gradient(circle at 30% 30%, #fff7cc 0%, #e7c46b 24%, #b67d2f 58%, #6a3b16 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -6px 10px rgba(0,0,0,0.28), 0 4px 10px rgba(0,0,0,0.18)',
            }}
          >
            <Image src="/va.png" alt="VA logo" width={80} height={80} className="h-full w-full rounded-full object-cover p-[4px]" priority />
          </span>
          <span className="min-w-0 leading-none">
            <span className={`block font-semibold tracking-[0.16em] transition-[font-size] duration-200 ${isCompact ? 'text-[9px]' : 'text-[11px]'}`} style={{ color: 'var(--theme-accent)' }}>
              TECH SAVVY
            </span>
            <span className={`mt-1 block truncate font-bold tracking-[0.04em] transition-[font-size] duration-200 ${isCompact ? 'text-[12px]' : 'text-[18px]'}`} style={{ color: 'var(--theme-heading)' }}>
              VIRTUAL ASSISTANT
            </span>
            <span className={`mt-1 block text-[11px] transition-all duration-200 ${isCompact ? 'max-h-0 opacity-0' : 'max-h-4 opacity-100'}`} style={{ color: 'var(--theme-subheading)' }}>
              15+ years of experience
            </span>
          </span>
        </Link>

        <nav className="hidden flex-col items-center justify-center gap-1 lg:flex" aria-label="Primary navigation">
          <div className={`flex items-center gap-4 transition-[font-size] duration-200 ${isCompact ? 'text-[11px]' : 'text-[13px]'}`}>
            {ANCHORS.map(({ href, label }) => (
              <a key={href} href={isSpanish ? `/es${href}` : href} className="relative pb-0.5 font-semibold tracking-[0.02em] transition-all duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[var(--theme-accent)] after:transition-all after:duration-200 hover:after:w-full">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {ROUTES.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={isSpanish ? `/es${href}` : href} title={label} className={`group inline-flex items-center justify-center gap-1 rounded-md px-2 py-0.5 text-[12px] font-semibold leading-none text-[var(--theme-text)] transition-colors duration-200 hover:text-[var(--theme-accent)] ${isCompact ? 'h-5 w-6 px-0' : 'h-6'}`}>
                <Icon size={isCompact ? 14 : 13} className="text-[var(--theme-accent)]" aria-hidden="true" />
                <span className={isCompact ? 'sr-only' : ''}>{label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="justify-self-end">
          <div className={`hidden items-center justify-end gap-1.5 transition-all duration-200 sm:flex ${isCompact ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-8 opacity-100'}`}>
            <Link href={isSpanish ? '/es/sign-in' : '/sign-in'} className="rounded-md border px-2 py-1 text-sm font-semibold transition-colors outline-none hover:bg-[var(--theme-accent)] hover:text-[var(--theme-primary)] focus:outline-none" style={{ borderColor: 'var(--theme-accent)', color: 'var(--theme-accent)' }}>
              Sign In
            </Link>
            <Link href={isSpanish ? '/es/register' : '/register'} className="rounded-md border px-2 py-1 text-sm font-semibold transition-colors outline-none hover:bg-[var(--theme-accent)] hover:text-[var(--theme-primary)] focus:outline-none" style={{ borderColor: 'var(--theme-accent)', color: 'var(--theme-accent)' }}>
              Register
            </Link>
          </div>
          <div className={`flex items-center justify-end gap-1.5 transition-[margin] duration-200 ${isCompact ? 'mt-0' : 'mt-1'}`}>
            <div className="inline-flex rounded-md border p-0.5" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-secondary)' }}>
              {['en', 'es'].map((language) => (
                <button key={language} type="button" onClick={() => toggleLanguage(language)} className={`rounded px-1.5 font-bold transition-colors ${isCompact ? 'h-5 text-[9px]' : 'h-5 text-[10px]'}`} style={currentLang === language ? { backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)' } : { color: 'var(--theme-text)' }}>
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="inline-flex rounded-md border p-0.5" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-secondary)' }}>
              {THEMES.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" onClick={() => applyTheme(id)} aria-label={`${label} theme`} title={`${label} theme`} className={`grid place-items-center rounded transition-colors ${isCompact ? 'h-5 w-5' : 'h-5 w-5'}`} style={theme === id ? { backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)' } : { color: 'var(--theme-text)' }}>
                  <Icon size={11} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}