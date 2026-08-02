"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Quote, Star } from "lucide-react";
import { useRef } from "react";
import { reviews } from "@/lib/data/reviews";

const floatingPositions = [
    { x: 8, y: -7, rotate: 0.8, duration: 6.4 },
    { x: -9, y: 8, rotate: -0.7, duration: 7.1 },
    { x: 7, y: 9, rotate: 0.6, duration: 6.7 },
    { x: -8, y: -7, rotate: -0.5, duration: 7.5 },
    { x: 10, y: -6, rotate: 0.8, duration: 6.9 },
    { x: -7, y: 9, rotate: -0.8, duration: 7.3 },
    { x: 8, y: 7, rotate: 0.5, duration: 6.2 },
    { x: -10, y: -6, rotate: -0.7, duration: 7.7 },
    { x: 7, y: -8, rotate: 0.6, duration: 6.6 },
    { x: -8, y: 8, rotate: -0.5, duration: 7.2 },
];

const overallRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function ReviewAvatar({ review }) {
    if (!review.image) {
        return (
            <span
                className="grid size-12 shrink-0 place-items-center rounded-full border border-tech-card-border bg-section-beta text-sm font-bold text-heading-color shadow-[inset_0_1px_0_var(--tech-card-highlight),0_3px_0_-2px_var(--tech-card-edge)]"
                aria-hidden="true"
            >
                {getInitials(review.name)}
            </span>
        );
    }

    return (
        <Image
            src={review.image.replace(/^public/, "")}
            alt={`${review.name} profile`}
            width={96}
            height={96}
            className="size-12 shrink-0 rounded-full border border-tech-card-border object-cover shadow-[inset_0_1px_0_var(--tech-card-highlight),0_3px_0_-2px_var(--tech-card-edge)]"
        />
    );
}

function Rating({ rating, label }) {
    return (
        <div className="flex items-center gap-1.5" aria-label={`${rating} out of 5 ${label}`}>
            <span className="flex items-center gap-px text-accent-color" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => {
                    const fillAmount = Math.max(0, Math.min(1, rating - index));
                    return (
                        <span key={index} className="relative size-3.5">
                            <Star className="absolute inset-0 size-3.5 text-text-muted/35" strokeWidth={2.3} />
                            {fillAmount > 0 && (
                                <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillAmount * 100}%` }}>
                                    <Star className="size-3.5 fill-current" strokeWidth={2.3} />
                                </span>
                            )}
                        </span>
                    );
                })}
            </span>
            <span className="text-xs font-bold tabular-nums text-heading-color">{rating.toFixed(1)}</span>
        </div>
    );
}

export default function Testimonial({ t = {} }) {
    const stageRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();
    const badge = t.badge || "Client Voices";
    const title = t.title || "Trusted by people building important things.";
    const description = t.description || "A few words from clients who have partnered with us.";
    const ratingLabel = t.ratingLabel || "rating";

    return (
        <section id="testimonial" className="scroll-mt-20 overflow-hidden bg-section-alpha py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
                <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
                    <span className="inline-flex rounded-full border border-header-border bg-section-beta px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-accent-color shadow-[inset_0_1px_0_var(--tech-card-highlight)]">
                        {badge}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold leading-tight text-heading-color sm:text-4xl">{title}</h2>
                    <div className="mt-4 flex justify-center">
                        <Rating rating={overallRating} label={ratingLabel} />
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-text-muted">{description}</p>
                </div>

                <div
                    ref={stageRef}
                    className="relative isolate grid min-h-240 grid-cols-1 content-center gap-5 overflow-hidden border-y border-card-border bg-section-beta px-4 py-8 sm:min-h-220 sm:grid-cols-2 sm:px-8 lg:min-h-160 lg:grid-cols-4 lg:px-10"
                    style={{
                        backgroundImage: "var(--stack-pattern)",
                        backgroundSize: "var(--stack-pattern-size)",
                    }}
                >
                    {reviews.map((review, index) => {
                        const floating = floatingPositions[index % floatingPositions.length];
                        return (
                            <motion.article
                                key={review.id}
                                className="relative z-10 cursor-grab touch-none active:cursor-grabbing"
                                animate={
                                    shouldReduceMotion
                                        ? undefined
                                        : {
                                              x: [0, floating.x, 0, -floating.x / 2, 0],
                                              y: [0, floating.y, -floating.y / 2, 0],
                                              rotate: [0, floating.rotate, -floating.rotate / 2, 0],
                                          }
                                }
                                transition={{ duration: floating.duration, repeat: Infinity, ease: "easeInOut" }}
                                drag
                                dragConstraints={stageRef}
                                dragElastic={0}
                                dragMomentum
                                dragTransition={{ bounceStiffness: 550, bounceDamping: 16, power: 0.22, timeConstant: 190 }}
                                whileDrag={{ scale: 1.04, rotate: 0, zIndex: 30 }}
                            >
                                <div className="group flex aspect-square w-full flex-col overflow-hidden rounded-lg border border-tech-card-border bg-tech-card-bg p-5 shadow-[inset_0_1px_0_var(--tech-card-highlight),0_10px_0_-7px_var(--tech-card-edge),0_18px_24px_-16px_var(--tech-card-depth)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-tech-card-border-hover hover:shadow-[inset_0_1px_0_var(--tech-card-highlight),0_14px_0_-8px_var(--tech-card-edge),0_24px_32px_-14px_var(--tech-card-glow)]">
                                    <div className="flex items-start gap-3">
                                        <ReviewAvatar review={review} />
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-sm font-bold text-heading-color">{review.name}</h3>
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
                                                <MapPin className="size-3 shrink-0 text-accent-color" aria-hidden="true" />
                                                <span className="truncate">{review.country}</span>
                                            </p>
                                            <div className="mt-2">
                                                <Rating rating={review.rating} label={ratingLabel} />
                                            </div>
                                        </div>
                                    </div>

                                    <span className="my-4 block h-px w-full bg-(--tech-card-divider) shadow-[0_1px_0_var(--tech-card-divider-highlight)]" />

                                    <blockquote className="relative flex flex-1 items-center text-sm leading-relaxed text-text-main">
                                        <div className="relative w-full pt-7">
                                            <Quote className="absolute left-0 top-0 size-5 text-accent-color/20" aria-hidden="true" />
                                            <p>{review.text}</p>
                                        </div>
                                    </blockquote>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}