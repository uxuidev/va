'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseBusiness, CircleHelp, Flame, Menu, MessageSquareText, Moon, Sun, X } from 'lucide-react';

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
  { href: '/#techstack', label: 'Tech Stack' },
  { href: '/#services', label: 'Services' },
  { href: '/#testimonial', label: 'Testimonial' },
  { href: '/#partners', label: 'Partner' },
  { href: '/#contact', label: 'Contact' },
];

const COMPACT_ENTER_SCROLL = 64;
const COMPACT_EXIT_SCROLL = 20;

export default function Header({ locale }) {
  const pathname = usePathname();
  const currentLang = locale;
  const isSpanish = locale === 'es';

  const [theme, setTheme] = useState('warm');
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const initialTheme = THEMES.some(({ id }) => id === storedTheme) ? storedTheme : 'warm';

    document.documentElement.setAttribute('data-theme', initialTheme);
    const initialFrame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
      setIsCompact(window.scrollY > COMPACT_ENTER_SCROLL);
    });

    const updateCompactState = () => {
      setIsCompact((wasCompact) => {
        if (wasCompact) return window.scrollY > COMPACT_EXIT_SCROLL;
        return window.scrollY > COMPACT_ENTER_SCROLL;
      });
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const controlGroupClass = 'inline-flex items-center rounded-md border border-header-border bg-section-beta p-0.5';
  const inactiveControlStyle = { color: 'var(--text-main)' };
  const activeControlStyle = { backgroundColor: 'var(--accent-color)', color: 'var(--body-bg)' };
  const accountLinkClass = `inline-flex min-w-0 flex-1 items-center justify-center rounded-md border border-header-border font-semibold text-heading-color transition-[background-color,color,transform,border-color,height,padding] duration-200 hover:-translate-y-px hover:border-accent-color hover:bg-accent-color hover:text-body-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color ${isCompact ? 'h-6 px-2 text-[11px]' : 'h-8 px-3 text-xs'}`;
  const controlButtonClass = `rounded transition-[background-color,color,height,width,padding] duration-200 hover:text-accent-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color ${isCompact ? 'h-5' : 'h-6'}`;
  const themeButtonClass = `grid place-items-center rounded transition-[background-color,color,height,width] duration-200 hover:text-accent-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color ${isCompact ? 'h-5 w-5' : 'h-6 w-6'}`;

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b border-header-border bg-body-bg transition-[height,box-shadow] duration-200 ease-out ${
        isCompact ? 'h-16 shadow-sm' : 'h-24'
      }`}
      style={{
        backgroundColor: 'var(--body-bg)',
        boxShadow: isCompact
          ? '0 8px 22px color-mix(in srgb, var(--heading-color) 10%, transparent)'
          : 'none',
      }}
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 sm:px-5 lg:grid-cols-[minmax(240px,1fr)_auto_minmax(250px,1fr)] lg:gap-6 lg:px-8">
        <Link href={isSpanish ? '/es' : '/'} className="flex min-w-0 items-center gap-2.5" aria-label="Virtual Assistant home" onClick={closeMobileMenu}>
          <span
            className={`grid shrink-0 place-items-center overflow-hidden rounded-full border border-header-border transition-[width,height] duration-200 ${
              isCompact ? 'h-11 w-11' : 'h-16 w-16'
            }`}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #fff7cc 0%, #e7c46b 24%, #b67d2f 58%, #6a3b16 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -6px 10px rgba(0,0,0,0.28), 0 4px 10px rgba(0,0,0,0.18)',
            }}
          >
            <Image src="/va.png" alt="VA logo" width={80} height={80} className="h-full w-full rounded-full object-cover p-1" priority />
          </span>
          <span className="min-w-0 leading-none">
            <span className={`block font-mono font-semibold tracking-[0.22em] text-accent-color transition-[font-size] duration-200 ${isCompact ? 'text-[10px]' : 'text-[12px]'}`}>
              TECH SAVVY
            </span>
            <span className={`header-wordmark bg-none text-heading-color mt-1 block truncate font-bold tracking-[0.04em] transition-[font-size] duration-200 ${isCompact ? 'text-md' : 'text-lg'}`}>
              VIRTUAL ASSISTANCE
            </span>
            <span className={`mt-1 block overflow-hidden text-[11px] text-text-muted transition-[max-height,opacity] duration-200 ${isCompact ? 'max-h-0 opacity-0' : 'max-h-4 opacity-100'}`}>
              15+ years of experience
            </span>
          </span>
        </Link>

        <nav className="hidden flex-col items-center justify-center gap-1 lg:flex" aria-label="Primary navigation">
          <div className={`flex items-center gap-5 transition-[font-size] duration-200 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            {ANCHORS.map(({ href, label }) => (
              <a key={href} href={isSpanish ? `/es${href}` : href} className="header-anchor-link pb-0.5 font-semibold">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {ROUTES.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={isSpanish ? `/es${href}` : href} title={label} className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1 font-semibold leading-none text-text-main transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-section-beta hover:text-accent-color ${isCompact ? 'text-xs' : 'text-sm'}`}>
                <Icon size={isCompact ? 16 : 18} className="text-accent-color" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className={`hidden justify-self-end lg:flex lg:flex-col lg:items-end lg:gap-2 ${isCompact ? 'w-32' : 'w-36'}`}>
          <div className="flex w-full items-center gap-1.5">
            <Link href={isSpanish ? '/es/sign-in' : '/sign-in'} className={accountLinkClass}>
              Login
            </Link>
            <Link href={isSpanish ? '/es/register' : '/register'} className={accountLinkClass}>
              Register
            </Link>
          </div>
          <div className="flex w-full items-center justify-end gap-1.5">
            <div className={`${controlGroupClass} min-w-0 flex-1 justify-center`}>
              {['en', 'es'].map((language) => (
                <button key={language} type="button" onClick={() => toggleLanguage(language)} className={`${controlButtonClass} px-2 text-[10px] font-bold`} style={currentLang === language ? activeControlStyle : inactiveControlStyle}>
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
            <div className={`${controlGroupClass} min-w-0 flex-1 justify-center`}>
              {THEMES.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" onClick={() => applyTheme(id)} aria-label={`${label} theme`} title={`${label}`} className={themeButtonClass} style={theme === id ? activeControlStyle : inactiveControlStyle}>
                  <Icon size={13} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <button type="button" className="grid h-10 w-10 place-items-center rounded-md border border-header-border bg-section-beta text-heading-color transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-accent-color hover:text-body-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color lg:hidden" aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}>
          {isMobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <div className={`absolute left-0 right-0 top-full overflow-hidden border-b border-header-border bg-body-bg transition-[max-height,opacity] duration-200 ease-out lg:hidden ${isMobileMenuOpen ? 'max-h-128 opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}>
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5" aria-label="Mobile navigation">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {ANCHORS.map(({ href, label }) => (
              <a key={href} href={isSpanish ? `/es${href}` : href} className="header-anchor-link w-fit font-semibold" onClick={closeMobileMenu}>
                {label}
              </a>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 border-y border-header-border py-4">
            {ROUTES.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={isSpanish ? `/es${href}` : href} className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-md bg-section-beta px-2 text-center text-xs font-semibold text-text-main transition-colors hover:bg-accent-color hover:text-body-bg" onClick={closeMobileMenu}>
                <Icon size={19} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={isSpanish ? '/es/sign-in' : '/sign-in'} className={accountLinkClass} onClick={closeMobileMenu}>Login</Link>
            <Link href={isSpanish ? '/es/register' : '/register'} className={accountLinkClass} onClick={closeMobileMenu}>Register</Link>
            <div className={`${controlGroupClass} ml-auto`}>
              {['en', 'es'].map((language) => (
                <button key={language} type="button" onClick={() => toggleLanguage(language)} className="h-7 rounded px-2 text-[10px] font-bold transition-colors hover:text-accent-color" style={currentLang === language ? activeControlStyle : inactiveControlStyle}>{language.toUpperCase()}</button>
              ))}
            </div>
            <div className={controlGroupClass}>
              {THEMES.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" onClick={() => applyTheme(id)} aria-label={`${label} theme`} title={`${label}`} className="grid h-7 w-7 place-items-center rounded transition-colors hover:text-accent-color" style={theme === id ? activeControlStyle : inactiveControlStyle}><Icon size={14} aria-hidden="true" /></button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}