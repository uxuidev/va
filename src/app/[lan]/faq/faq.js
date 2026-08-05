'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    ArrowUpRight,
    Bot,
    CircleHelp,
    CreditCard,
    Headset,
    RotateCcw,
    Search,
    UsersRound,
    Wrench,
} from 'lucide-react';

const categoryIcons = {
    general: CircleHelp,
    tech: Wrench,
    pricing: CreditCard,
    partners: UsersRound,
    support: Headset,
};

export default function FAQ({ content }) {
    const shouldReduceMotion = useReducedMotion();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [flippedCard, setFlippedCard] = useState(null);
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const categories = content?.categories ?? [];
    const visibleCategories = categories.filter((category) => {
        const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory;
        const matchesSearch = !normalizedSearch || category.title.toLowerCase().includes(normalizedSearch) ||
            category.questions.some(({ question, answer }) =>
                `${question} ${answer}`.toLowerCase().includes(normalizedSearch)
            );

        return matchesCategory && matchesSearch;
    });

    const toggleCard = (cardId) => {
        setFlippedCard((currentCard) => (currentCard === cardId ? null : cardId));
    };

    return (
        <main className="relative isolate overflow-hidden bg-section-beta py-14 sm:py-18 lg:py-22">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-105 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent-color)_15%,transparent),transparent_66%)]" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <motion.header
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-header-border bg-section-beta px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-accent-color">
                        <Bot className="size-3.5" aria-hidden="true" />
                        {content.eyebrow}
                    </span>
                    <h1 className="mt-4 text-4xl font-bold leading-tight text-heading-color sm:text-5xl">{content.title}</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">{content.description}</p>
                    <label className="relative mx-auto mt-8 block max-w-xl text-left">
                        <span className="sr-only">{content.searchLabel}</span>
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-accent-color" aria-hidden="true" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder={content.searchPlaceholder}
                            className="h-13 w-full rounded-lg border border-card-border bg-section-alpha pl-12 pr-4 text-base text-text-main shadow-[inset_0_1px_0_var(--tech-card-highlight),0_12px_26px_-22px_color-mix(in_srgb,var(--heading-color)_75%,transparent)] outline-none transition-[border-color,box-shadow] placeholder:text-text-muted focus:border-accent-color focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-color)_18%,transparent)]"
                        />
                    </label>
                </motion.header>

                <nav className="mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:justify-center" aria-label={content.categoryNavigationLabel}>
                    <button
                        type="button"
                        onClick={() => setSelectedCategory('all')}
                        className={`inline-flex h-24 w-36 shrink-0 snap-start flex-col items-center justify-center gap-1.5 rounded-md border bg-section-alpha px-3 py-2 text-center text-xs font-bold leading-tight text-text-main transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color ${selectedCategory === 'all' ? 'border-accent-color shadow-[0_0_0_2px_color-mix(in_srgb,var(--accent-color)_14%,transparent)]' : 'border-card-border hover:border-accent-color hover:text-accent-color'}`}
                    >
                        <CircleHelp className="size-5 text-accent-color" aria-hidden="true" />
                        {content.allCategoriesLabel}
                    </button>
                    {categories.map((category) => {
                        const Icon = categoryIcons[category.icon] ?? CircleHelp;
                        const isActive = selectedCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setSelectedCategory(category.id)}
                                className={`inline-flex h-24 w-36 shrink-0 snap-start flex-col items-center justify-center gap-1.5 rounded-md border bg-section-alpha px-3 py-2 text-center text-xs font-bold leading-tight text-text-main transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color ${isActive ? 'border-accent-color shadow-[0_0_0_2px_color-mix(in_srgb,var(--accent-color)_14%,transparent)]' : 'border-card-border hover:border-accent-color hover:text-accent-color'}`}
                            >
                                <Icon className="size-5 text-accent-color" aria-hidden="true" />
                                {category.title}
                            </button>
                        );
                    })}
                </nav>

                <AnimatePresence mode="popLayout">
                    {visibleCategories.length ? (
                        <motion.div
                            layout
                            initial={shouldReduceMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                            className="mt-10 space-y-14"
                        >
                            {visibleCategories.map((category) => {
                                const Icon = categoryIcons[category.icon] ?? CircleHelp;
                                return (
                                    <motion.section layout key={category.id} aria-labelledby={`category-${category.id}`}>
                                        <div className="mb-5 flex items-start gap-3 border-b border-card-border pb-4">
                                            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-header-border bg-section-beta text-accent-color">
                                                <Icon className="size-5" aria-hidden="true" />
                                            </span>
                                            <div>
                                                <h2 id={`category-${category.id}`} className="text-2xl font-bold text-heading-color">{category.title}</h2>
                                                <p className="mt-1 text-sm leading-relaxed text-text-muted">{category.description}</p>
                                            </div>
                                        </div>
                                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                            {category.questions.map((item, index) => {
                                                const cardId = `${category.id}-${index}`;
                                                const isFlipped = flippedCard === cardId;
                                                return (
                                                    <motion.article
                                                        layout
                                                        key={cardId}
                                                        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                                                        transition={{ duration: 0.28 }}
                                                        className={`faq-card aspect-square cursor-pointer rounded-lg focus-within:ring-2 focus-within:ring-accent-color focus-within:ring-offset-2 focus-within:ring-offset-body-bg ${isFlipped ? 'faq-card-is-flipped' : ''}`}
                                                    >
                                                        <div className="faq-card-inner relative h-full w-full rounded-lg">
                                                            <div className="faq-card-face faq-card-front flex-col justify-between overflow-hidden rounded-lg border border-card-border bg-tech-card-bg p-5">
                                                                <div className="flex items-start justify-between gap-3">
                                                                    <span className="rounded-full border border-header-border bg-section-alpha px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent-color">{category.title}</span>
                                                                    <RotateCcw className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
                                                                </div>
                                                                <h3 className="text-xl font-bold leading-snug text-heading-color">{item.question}</h3>
                                                                <span className="text-sm font-semibold text-text-muted">{content.revealAnswerLabel}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleCard(cardId)}
                                                                    className="absolute inset-0 z-10 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
                                                                    aria-label={`${item.question}. ${content.revealAnswerLabel}`}
                                                                />
                                                            </div>
                                                            <div className="faq-card-face faq-card-back flex-col justify-between overflow-hidden rounded-lg border border-accent-color bg-section-alpha p-5">
                                                                <div>
                                                                    <div className="flex items-center justify-between gap-3">
                                                                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent-color">{content.answerLabel}</span>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => toggleCard(cardId)}
                                                                            className="grid size-7 place-items-center rounded-md text-text-muted transition-colors hover:bg-section-beta hover:text-accent-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
                                                                            aria-label={content.hideAnswerLabel}
                                                                        >
                                                                            <RotateCcw className="size-4" aria-hidden="true" />
                                                                        </button>
                                                                    </div>
                                                                    <p className="mt-3 text-sm leading-relaxed text-text-main">{item.answer}</p>
                                                                </div>
                                                                <Link
                                                                    href="/#contact"
                                                                    className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-accent-color transition-colors hover:text-heading-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
                                                                >
                                                                    {content.contactSupportLabel}
                                                                    <ArrowUpRight className="size-4" aria-hidden="true" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </motion.article>
                                                );
                                            })}
                                        </div>
                                    </motion.section>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 rounded-lg border border-dashed border-card-border bg-section-beta px-6 py-14 text-center">
                            <h2 className="text-xl font-bold text-heading-color">{content.noResultsTitle}</h2>
                            <p className="mt-2 text-sm text-text-muted">{content.noResultsDescription}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}