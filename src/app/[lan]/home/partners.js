'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Check, FileLock2, Handshake, ShieldCheck, TimerReset } from 'lucide-react';

const benefitIcons = [Handshake, FileLock2, TimerReset, ShieldCheck];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Partners({ t = {} }) {
    const shouldReduceMotion = useReducedMotion();
    const badge = t.badge || 'Partner Program';
    const heading = t.heading || 'Scale your agency capacity.';
    const description =
        t.description ||
        'A dependable delivery team for the work your clients need next, with terms that reward sustained collaboration.';
    const tiers = t.tiers || [];
    const benefits = t.benefits || [];
    const benefitsHeading = t.benefitsHeading || 'Built for trusted delivery.';
    const ctaLabel = t.ctaLabel || 'Become a partner';
    const ctaDescription = t.ctaDescription || 'Tell us about your delivery needs and we will shape the right partnership.';

    return (
        <section id="partners" className="scroll-mt-20 overflow-hidden bg-section-beta py-16 sm:py-20 lg:py-24" aria-labelledby="partner-heading">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <motion.div
                    className="grid gap-8 border-b border-card-border pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end"
                    variants={shouldReduceMotion ? undefined : containerVariants}
                    initial={shouldReduceMotion ? false : 'hidden'}
                    whileInView={shouldReduceMotion ? undefined : 'visible'}
                    viewport={{ once: true, amount: 0.18 }}
                >
                    <motion.div className="max-w-3xl" variants={shouldReduceMotion ? undefined : itemVariants}>
                        <span className="inline-flex rounded-full border border-header-border bg-body-bg px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-accent-color shadow-[inset_0_1px_0_var(--tech-card-highlight)]">
                            {badge}
                        </span>
                        <h2 id="partner-heading" className="mt-4 text-3xl font-bold leading-tight text-heading-color sm:text-4xl">
                            {heading}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">{description}</p>
                    </motion.div>
                    <motion.a
                        href="#contact"
                        className="inline-flex w-fit items-center gap-2 rounded-md border border-accent-color bg-accent-color px-4 py-2.5 text-sm font-bold text-body-bg transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-heading-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
                        variants={shouldReduceMotion ? undefined : itemVariants}
                        whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    >
                        {ctaLabel}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                    </motion.a>
                </motion.div>

                <motion.div
                    className="mt-10 grid gap-4 lg:grid-cols-3"
                    variants={shouldReduceMotion ? undefined : containerVariants}
                    initial={shouldReduceMotion ? false : 'hidden'}
                    whileInView={shouldReduceMotion ? undefined : 'visible'}
                    viewport={{ once: true, amount: 0.12 }}
                >
                    {tiers.map((tier) => (
                        <motion.article
                            key={tier.id}
                            variants={shouldReduceMotion ? undefined : itemVariants}
                            whileHover={shouldReduceMotion ? undefined : { y: -7 }}
                            className={`group relative flex min-h-100 flex-col overflow-hidden rounded-lg border bg-tech-card-bg p-6 shadow-[inset_0_1px_0_var(--tech-card-highlight),0_10px_0_-7px_var(--tech-card-edge),0_18px_24px_-16px_var(--tech-card-depth)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-tech-card-border-hover hover:shadow-[inset_0_1px_0_var(--tech-card-highlight),0_14px_0_-8px_var(--tech-card-edge),0_24px_32px_-14px_var(--tech-card-glow)] ${
                                tier.featured ? 'border-accent-color' : 'border-tech-card-border'
                            }`}
                        >
                            {tier.featured && (
                                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-accent-color bg-section-beta px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent-color">
                                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                                    {tier.badge}
                                </span>
                            )}
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-color">{tier.label}</p>
                            <h3 className="mt-3 max-w-[16rem] text-xl font-bold leading-snug text-heading-color">{tier.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-text-muted">{tier.description}</p>
                            <ul className="mt-6 space-y-3 border-t border-card-border pt-5" aria-label={`${tier.title} features`}>
                                {tier.features?.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-main">
                                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent-color text-body-bg">
                                            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.article>
                    ))}
                </motion.div>

                <div className="mt-12 grid gap-8 border-t border-card-border pt-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-color">{badge}</p>
                        <h3 className="mt-3 text-2xl font-bold leading-tight text-heading-color">{benefitsHeading}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-text-muted">{ctaDescription}</p>
                    </div>
                    <motion.div
                        className="grid gap-3 sm:grid-cols-2"
                        variants={shouldReduceMotion ? undefined : containerVariants}
                        initial={shouldReduceMotion ? false : 'hidden'}
                        whileInView={shouldReduceMotion ? undefined : 'visible'}
                        viewport={{ once: true, amount: 0.18 }}
                    >
                        {benefits.map((benefit, index) => {
                            const Icon = benefitIcons[index % benefitIcons.length];
                            return (
                                <motion.article
                                    key={benefit.title}
                                    variants={shouldReduceMotion ? undefined : itemVariants}
                                    className="flex gap-4 rounded-lg border border-card-border bg-section-alpha p-4 shadow-[inset_0_1px_0_var(--tech-card-highlight)] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-tech-card-border-hover"
                                >
                                    <span className="grid size-10 shrink-0 place-items-center rounded-md border border-header-border bg-section-beta text-accent-color">
                                        <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-heading-color">{benefit.title}</h4>
                                        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{benefit.description}</p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
