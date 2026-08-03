'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Mail, MessageCircle, MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa6';

const SOCIAL_LINKS = [
    { href: 'https://www.facebook.com/', label: 'Facebook', icon: FaFacebookF },
    { href: 'https://www.instagram.com/', label: 'Instagram', icon: FaInstagram },
];

export default function Footer({ locale, t }) {
    const reduceMotion = useReducedMotion();
    const [theme, setTheme] = useState('warm');
    const localePrefix = locale === 'es' ? '/es' : '';

    useEffect(() => {
        const syncTheme = () => setTheme(document.documentElement.dataset.theme || 'warm');
        syncTheme();

        const observer = new MutationObserver(syncTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const navigation = [
        { href: localePrefix || '/', label: t.home },
        { href: `${localePrefix}/portfolio`, label: t.portfolio },
        { href: `${localePrefix}/#services`, label: t.servicesLink },
        { href: `${localePrefix}/#partner`, label: t.partners },
        { href: `${localePrefix}/#contact`, label: t.contact },
    ];
    const services = [t.webDevelopment, t.appDevelopment, t.aiAutomation, t.uiUx, t.dataAnalytics, t.hosting];

    return (
        <footer className="relative mt-20 overflow-hidden bg-section-beta pt-24 text-text-main" aria-label="Site footer">
            <motion.button
                type="button"
                onClick={scrollToTop}
                aria-label={t.backToTop}
                title={t.backToTop}
                className="absolute left-1/2 top-6 z-10 grid h-16 w-16 -translate-x-1/2 cursor-pointer place-items-center rounded-full border border-accent-color bg-body-bg text-accent-color shadow-[0_10px_25px_-12px_var(--heading-color)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-color"
                animate={reduceMotion ? undefined : { y: [0, -4, 0], boxShadow: ['0 10px 25px -12px var(--heading-color)', '0 14px 30px -12px var(--heading-color)', '0 10px 25px -12px var(--heading-color)'] }}
                transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: -8 }}
                whileTap={{ scale: 0.94 }}
            >
                <ArrowUp size={23} strokeWidth={2.4} aria-hidden="true" />
            </motion.button>

            <motion.div
                className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 sm:px-8 lg:grid-cols-[1.45fr_0.8fr_1fr_0.65fr] lg:gap-8"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
            >
                <section className="max-w-sm" aria-label="Tech Savvy Virtual Assistance">
                    <div className="mb-5 flex items-center gap-2.5">
                        <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-header-border bg-body-bg">
                            <Image src="/va.png" alt="Tech Savvy Virtual Assistance logo" width={80} height={80} className="h-full w-full rounded-full object-cover p-1" />
                        </span>
                        <span className="min-w-0 leading-none">
                            <span className="block font-mono text-[12px] font-semibold tracking-[0.22em] text-accent-color">TECH SAVVY</span>
                            <span className="mt-1 block truncate text-lg font-bold tracking-[0.04em] text-heading-color">VIRTUAL ASSISTANCE</span>
                            <span className="mt-1 block text-[11px] text-text-muted">15+ years of experience</span>
                        </span>
                    </div>
                    <p className="text-sm leading-6 text-text-muted">{t.tagline}</p>
                    <p className="mt-3 text-sm leading-6 text-text-muted">{t.serviceDetails}</p>
                </section>

                <FooterColumn heading={t.navigation} links={navigation} />
                <FooterColumn heading={t.services} links={services.map((label) => ({ href: `${localePrefix}/#services`, label }))} />

                <section>
                    <h2 className="mb-5 text-xs font-bold tracking-[0.14em] text-heading-color uppercase">{t.connect}</h2>
                    <div className="flex gap-2">
                        {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                            <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="grid h-10 w-10 place-items-center rounded-md border border-header-border bg-section-beta text-accent-color transition-colors hover:border-accent-color hover:bg-accent-color hover:text-body-bg" whileHover={reduceMotion ? undefined : { scale: 1.12, y: -3 }} whileTap={{ scale: 0.92 }}><Icon size={18} aria-hidden="true" /></motion.a>
                        ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <motion.a href="mailto:adeel@bitwork.tech" aria-label={t.email} title={t.email} className="grid h-10 w-10 place-items-center rounded-md border border-header-border bg-section-beta text-accent-color transition-colors hover:border-accent-color hover:bg-accent-color hover:text-body-bg" whileHover={reduceMotion ? undefined : { scale: 1.12, y: -3 }} whileTap={{ scale: 0.92 }}><Mail size={18} aria-hidden="true" /></motion.a>
                        <motion.a href="https://wa.me/923456789765" target="_blank" rel="noreferrer" aria-label={t.whatsApp} title={t.whatsApp} className="grid h-10 w-10 place-items-center rounded-md border border-header-border bg-section-beta text-accent-color transition-colors hover:border-accent-color hover:bg-accent-color hover:text-body-bg" whileHover={reduceMotion ? undefined : { scale: 1.12, y: -3 }} whileTap={{ scale: 0.92 }}><MessageCircle size={18} aria-hidden="true" /></motion.a>
                    </div>
                </section>
            </motion.div>

            <div className="border-t border-card-border">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 text-xs text-text-muted sm:px-8 md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} BITWORK TECH. {t.copyright}</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                        <Link href={`${localePrefix}/privacy`} className="transition hover:text-accent-color">{t.privacy}</Link>
                        <Link href={`${localePrefix}/terms`} className="transition hover:text-accent-color">{t.terms}</Link>
                        <span className="rounded-full border border-header-border bg-section-beta px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-heading-color">{t.language}: {locale.toUpperCase()} · {t.theme}: {t.themeNames[theme]}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ heading, links }) {
    return (
        <section>
            <h2 className="mb-5 text-xs font-bold tracking-[0.14em] text-heading-color uppercase">{heading}</h2>
            <ul className="space-y-3">
                {links.map(({ href, label }) => (
                    <li key={label}><Link href={href} className="group inline-flex items-center gap-1.5 text-sm text-text-muted transition hover:text-accent-color"><span>{label}</span><MoveUpRight size={13} className="opacity-0 transition group-hover:opacity-100" aria-hidden="true" /></Link></li>
                ))}
            </ul>
        </section>
    );
}