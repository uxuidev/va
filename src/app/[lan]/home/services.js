"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeDollarSign } from "lucide-react";
import { services } from "@/lib/data/services";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07, delayChildren: 0.08 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Services({ t = {} }) {
    const shouldReduceMotion = useReducedMotion();
    const tagline = t.tagline || "Services";
    const heading = t.heading || "Practical digital support for growing teams.";
    const description = t.description || "A focused mix of technical, creative, and operational services built around your work.";
    const technologyLabel = t.technologyLabel || "Tools and technologies";
    const priceLabel = t.priceLabel || "Annual plan";
    const ctaLabel = t.ctaLabel || "Discuss your project";

    return (
        <section id="services" className="scroll-mt-20 overflow-hidden bg-section-beta py-16 sm:py-20 lg:py-24" aria-labelledby="services-heading">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="grid gap-8 border-b border-card-border pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full border border-header-border bg-body-bg px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-accent-color shadow-[inset_0_1px_0_var(--tech-card-highlight)]">
                            {tagline}
                        </span>
                        <h2 id="services-heading" className="mt-4 text-3xl font-bold leading-tight text-heading-color sm:text-4xl">
                            {heading}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">{description}</p>
                    </div>
                    <a href="#contact" className="inline-flex w-fit items-center gap-2 rounded-md border border-accent-color bg-accent-color px-4 py-2.5 text-sm font-bold text-body-bg transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-heading-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color">
                        {ctaLabel}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                </div>

                <motion.div
                    className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    variants={shouldReduceMotion ? undefined : containerVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={{ once: true, amount: 0.12 }}
                >
                    {services.map(({ id, title, description: serviceDescription, tools, price, icon: Icon }) => (
                        <motion.article
                            key={id}
                            variants={shouldReduceMotion ? undefined : cardVariants}
                            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                            className="group flex min-h-82 flex-col rounded-lg border border-tech-card-border bg-tech-card-bg p-5 shadow-[inset_0_1px_0_var(--tech-card-highlight),0_10px_0_-7px_var(--tech-card-edge),0_18px_24px_-16px_var(--tech-card-depth)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-tech-card-border-hover hover:shadow-[inset_0_1px_0_var(--tech-card-highlight),0_14px_0_-8px_var(--tech-card-edge),0_24px_32px_-14px_var(--tech-card-glow)]"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <motion.span
                                    className="grid size-11 shrink-0 place-items-center rounded-md border border-header-border bg-section-beta text-accent-color shadow-[inset_0_1px_0_var(--tech-card-highlight)]"
                                    whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: -4 }}
                                >
                                    <Icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                                </motion.span>
                            </div>

                            <h3 className="mt-5 text-lg font-bold leading-snug text-heading-color">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-text-muted">{serviceDescription}</p>

                            <div className="mt-auto pt-5">
                                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">{technologyLabel}</p>
                                <ul className="flex flex-wrap gap-1.5" aria-label={`${technologyLabel}: ${tools.join(", ")}`}>
                                    {tools.map((tool) => (
                                        <li key={tool} className="rounded-full border border-card-border bg-body-bg px-2 py-1 text-[11px] font-semibold leading-none text-text-main">
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                                {price && (
                                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-header-border bg-body-bg px-2.5 py-1 text-xs font-bold text-accent-color">
                                        <BadgeDollarSign className="size-3.5" aria-hidden="true" />
                                        <span>{priceLabel}</span>
                                        <span aria-hidden="true">&#183;</span>
                                        <span>{price}</span>
                                    </span>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}