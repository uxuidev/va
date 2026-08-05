"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiPause, HiPlay } from "react-icons/hi2";
import {techTools} from "@/lib/data/techstack";
/* import { FaRobot } from "react-icons/fa6";
import {
    SiFigma,
    SiHubspot,
    SiNextdotjs,
    SiReact,
    SiChartdotjs,
    SiGithub,
    SiPostgresql,
    SiDotnet,
    SiMysql,
    SiMeta,
    SiWoocommerce,
    SiMake,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { HiMiniChartBar, HiPaintBrush, HiArrowLeft, HiArrowRight, HiPause, HiPlay } from "react-icons/hi2";

const techTools = [
    {
        name: "Figma",
        slogan: "Interfaces With Intent",
        Icon: SiFigma,
        color: "#F24E1E",
        position: "left-[3%] top-[3%]",
        x: 12,
        y: -16,
        rotate: 3,
        duration: 5.8,
    },
    {
        name: "CapCut",
        slogan: "Stories In Motion",
        imageSrc: "/hero/tech/capcut.svg",
        position: "left-[27%] top-[1%]",
        x: -9,
        y: 14,
        rotate: -2,
        duration: 6.3,
    },
    {
        name: "KlingAI",
        slogan: "Generative Visual Craft",
        imageSrc: "/hero/tech/kling.svg",
        position: "left-[43%] top-[9%]",
        x: 8,
        y: 12,
        rotate: 2,
        duration: 6.0,
    },
    {
        name: "HubSpot",
        slogan: "Smarter Customer Journeys",
        Icon: SiHubspot,
        color: "#FF7A59",
        position: "right-[43%] top-[9%]",
        x: -8,
        y: -12,
        rotate: -2,
        duration: 6.5,
    },
    {
        name: "Next.js",
        slogan: "High-Performance Web Apps",
        Icon: SiNextdotjs,
        color: "var(--tech-logo-color)",
        usesThemeColor: true,
        position: "right-[27%] top-[1%]",
        x: 10,
        y: 15,
        rotate: -2,
        duration: 6.6,
    },
    {
        name: "React.js",
        slogan: "Responsive Digital Experiences",
        Icon: SiReact,
        color: "#61DAFB",
        position: "right-[3%] top-[3%]",
        x: -13,
        y: -12,
        rotate: 4,
        duration: 5.2,
    },
    {
        name: "Chart.js",
        slogan: "Clearer Data Stories",
        Icon: SiChartdotjs,
        color: "#FF6384",
        position: "left-[2%] top-[25%]",
        x: 14,
        y: 10,
        rotate: -3,
        duration: 7.1,
    },
    {
        name: "Canva",
        slogan: "On-Brand Visual Content",
        imageSrc: "/hero/tech/canva.svg",
        position: "left-[16%] top-[19%]",
        x: 11,
        y: 12,
        rotate: 3,
        duration: 6.4,
    },
    {
        name: "GitHub",
        slogan: "Collaborative Code Delivery",
        Icon: SiGithub,
        color: "var(--heading-color)",
        position: "right-[16%] top-[19%]",
        x: -12,
        y: -11,
        rotate: -3,
        duration: 5.5,
    },
    {
        name: "PostgreSQL",
        slogan: "Relational Data Engine",
        Icon: SiPostgresql,
        color: "#4169E1",
        position: "right-[2%] top-[25%]",
        x: -10,
        y: 15,
        rotate: 2,
        duration: 6.2,
    },
    {
        name: ".NET",
        slogan: "Reliable Business Systems",
        Icon: SiDotnet,
        color: "#512BD4",
        position: "left-[1%] top-[47%]",
        x: 11,
        y: -13,
        rotate: 3,
        duration: 5.6,
    },
    {
        name: "Power BI",
        slogan: "Actionable Business Insight",
        Icon: HiMiniChartBar,
        color: "#F2C811",
        position: "right-[1%] top-[47%]",
        x: 10,
        y: -14,
        rotate: 3,
        duration: 5.4,
    },
    {
        name: "MySQL",
        slogan: "Structured Data Foundations",
        Icon: SiMysql,
        color: "#4479A1",
        position: "left-[2%] bottom-[26%]",
        x: 13,
        y: 12,
        rotate: -3,
        duration: 7.3,
    },
    {
        name: "SQL Server",
        slogan: "Enterprise Data Control",
        Icon: DiMsqlServer,
        color: "#CC2927",
        position: "right-[2%] bottom-[26%]",
        x: -13,
        y: 11,
        rotate: -2,
        duration: 6.9,
    },
    {
        name: "Meta Suite",
        slogan: "Connected Audience Growth",
        Icon: SiMeta,
        color: "#0866FF",
        position: "left-[16%] bottom-[19%]",
        x: 11,
        y: 13,
        rotate: -3,
        duration: 6.7,
    },
    {
        name: "WooCommerce",
        slogan: "Flexible Storefront Growth",
        Icon: SiWoocommerce,
        color: "#96588A",
        position: "right-[16%] bottom-[19%]",
        x: -12,
        y: -10,
        rotate: 2,
        duration: 5.9,
    },
    {
        name: "Illustrator",
        slogan: "Distinctive Brand Assets",
        Icon: HiPaintBrush,
        color: "#FF9A00",
        position: "left-[3%] bottom-[3%]",
        x: 10,
        y: -14,
        rotate: 2,
        duration: 5.7,
    },
    {
        name: "React Native",
        slogan: "Native Mobile Reach",
        Icon: SiReact,
        color: "#61DAFB",
        position: "left-[27%] bottom-[1%]",
        x: -11,
        y: -10,
        rotate: 4,
        duration: 6.1,
    },
    {
        name: "Make",
        slogan: "Streamlined Repeatable Work",
        Icon: SiMake,
        color: "#6D00CC",
        position: "right-[27%] bottom-[1%]",
        x: 12,
        y: 14,
        rotate: -2,
        duration: 7.4,
    },
    {
        name: "N8N",
        slogan: "Connected Workflow Automation",
        Icon: FaRobot,
        color: "#EA4B71",
        position: "left-[43%] bottom-[9%]",
        x: -8,
        y: -12,
        rotate: 2,
        duration: 6.8,
    },
]; */

const slides = [
    { src: "/hero/1.jpg", width: 754, height: 800 },
    { src: "/hero/2.jpg", width: 1230, height: 800 },
    { src: "/hero/3.jpg", width: 1200, height: 800 },
    { src: "/hero/4.jpg", width: 1200, height: 800 },
    { src: "/hero/5.jpg", width: 1334, height: 800 },
    { src: "/hero/6.jpg", width: 1382, height: 1080 },
    { src: "/hero/7.jpg", width: 533, height: 800 },
];

const slideVariants = {
    initial: { opacity: 0, scale: 1.025 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 },
};

export default function Hero({ t = {}, language }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const stackRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    const title = t.title || "Digital work that moves your business forward.";
    const subtitle =
        t.subtitle ||
        "Design, development, data, and automation that turn ambitious ideas into dependable systems.";

    const stackBadgeTextClass =
        language === "es"
            ? "font-sans text-base font-bold uppercase leading-none tracking-[0.08em] text-heading-color [text-shadow:0_1px_0_var(--tech-card-highlight),0_-1px_0_var(--tech-card-edge)] sm:text-xl"
            : "font-sans text-xl font-bold uppercase leading-none tracking-[0.16em] text-heading-color [text-shadow:0_1px_0_var(--tech-card-highlight),0_-1px_0_var(--tech-card-edge)] sm:text-3xl";

    useEffect(() => {
        if (!isPlaying || shouldReduceMotion) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
        }, 5600);

        return () => window.clearInterval(intervalId);
    }, [isPlaying, shouldReduceMotion]);

    const goToSlide = (direction) => {
        setActiveSlide((currentSlide) => (currentSlide + direction + slides.length) % slides.length);
        setIsPlaying(false);
    };

    return (
        <section id="techstack" className="scroll-mt-20 overflow-hidden bg-section-alpha">
            <div className="mx-auto grid min-h-150 max-w-[1600px] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                <div
                    ref={stackRef}
                    className="relative isolate min-h-150 overflow-hidden border-b border-card-border bg-section-beta px-5 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-12"
                >
                    <div
                        className="pointer-events-none absolute inset-0 -z-20"
                        style={{
                            backgroundImage: "var(--stack-pattern)",
                            backgroundSize: "var(--stack-pattern-size)",
                        }}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-color/20 sm:size-80" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent-color/25 sm:size-64" />

                    <div className="tech-stack-badge pointer-events-none absolute left-1/2 top-1/2 z-40 flex size-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-tech-card-bg text-center backdrop-blur-md sm:size-48">
                        <span className={stackBadgeTextClass}>{t.stackTitle || "Tech"}</span>
                        <span className={`mt-1.5 ${stackBadgeTextClass}`}>{t.stackSubtitle || "Stack"}</span>
                    </div>

                    {techTools.map(
                        ({ name, slogan, Icon, imageSrc, color, usesThemeColor, position, x, y, rotate, duration }) => (
                            <motion.div
                                key={name}
                                className={`absolute z-10 cursor-grab touch-none active:cursor-grabbing ${position}`}
                                animate={
                                    shouldReduceMotion
                                        ? undefined
                                        : {
                                              x: [0, x, 0, -x / 2, 0],
                                              y: [0, y, -y / 2, 0],
                                              rotate: [0, rotate, -rotate / 2, 0],
                                          }
                                }
                                transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
                                drag
                                dragConstraints={stackRef}
                                dragElastic={0.12}
                                whileDrag={{ scale: 1.12, rotate: 0, zIndex: 30 }}
                            >
                                <div
                                    title={`${name}: ${slogan}`}
                                    aria-label={name}
                                    className="group relative flex size-30 flex-col overflow-hidden rounded-xl border border-tech-card-border bg-tech-card-bg p-3 shadow-[inset_0_1px_0_var(--tech-card-highlight),0_10px_0_-7px_var(--tech-card-edge),0_18px_24px_-16px_var(--tech-card-depth)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.04] hover:border-tech-card-border-hover hover:shadow-[inset_0_1px_0_var(--tech-card-highlight),0_14px_0_-8px_var(--tech-card-edge),0_24px_32px_-14px_var(--tech-card-glow)] sm:size-36 sm:p-4"
                                >
                                    {name === "CapCut" ? (
                                        <span
                                            role="img"
                                            aria-label="CapCut logo"
                                            className="size-8 shrink-0 bg-(--tech-logo-color) mask-[url('/hero/tech/capcut.svg')] mask-center mask-no-repeat mask-contain sm:size-8"
                                        />
                                    ) : imageSrc ? (
                                        <Image
                                            src={imageSrc}
                                            alt={`${name} logo`}
                                            width={32}
                                            height={32}
                                            className="size-8 shrink-0 object-contain"
                                        />
                                    ) : (
                                        <Icon
                                            className="size-7 shrink-0 sm:size-8"
                                            style={{
                                                color: usesThemeColor
                                                    ? color
                                                    : `color-mix(in srgb, ${color} 72%, var(--text-muted) 28%)`,
                                            }}
                                            aria-hidden="true"
                                        />
                                    )}

                                    <div className="mt-2 text-center">
                                        <span className="block text-[0.7rem] font-bold leading-tight text-text-main sm:text-xs">
                                            {name}
                                        </span>
                                        <span className="mx-auto my-2 block h-px w-4/5 bg-(--tech-card-divider) shadow-[0_1px_0_var(--tech-card-divider-highlight)]" />
                                        <span className="line-clamp-2 block text-[0.6rem] font-medium leading-[1.2] text-text-muted sm:text-[0.65rem]">
                                            {slogan}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    )}
                </div>

                <div
                    className="relative isolate h-150 overflow-hidden bg-section-beta"
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => setIsPlaying(true)}
                >
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={slides[activeSlide].src}
                            className="absolute inset-y-0 right-0"
                            variants={slideVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: "easeOut" }}
                        >
                            <Image
                                src={slides[activeSlide].src}
                                alt={`Selected portfolio work, slide ${activeSlide + 1}`}
                                width={slides[activeSlide].width}
                                height={slides[activeSlide].height}
                                priority={activeSlide === 0}
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                className="h-150 w-auto max-w-none object-right"
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div
                        className="pointer-events-none absolute inset-0 z-10"
                        style={{
                            backgroundImage: "var(--hero-overlay-pattern)",
                            backgroundSize: "var(--stack-pattern-size)",
                            maskImage: "var(--hero-overlay-mask)",
                            WebkitMaskImage: "var(--hero-overlay-mask)",
                        }}
                    />
                    <div
                        className="pointer-events-none absolute inset-0 z-10"
                        style={{ backgroundImage: "var(--hero-overlay-gradient)" }}
                    />
                    <div className="absolute inset-x-0 top-0 z-20 h-1 bg-accent-color" />

                    <div className="absolute inset-y-0 left-0 z-20 flex w-[75%] flex-col justify-center p-6 sm:w-[58%] sm:p-10 lg:p-14">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.12 }}
                        >
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-color">
                                {t.eyebrow || "Independent digital partner"}
                            </p>
                            <h1 className="text-3xl font-bold leading-[1.05] text-(--hero-overlay-title) sm:text-4xl lg:text-5xl">
                                {title}
                            </h1>
                            <p className="mt-5 max-w-md text-sm leading-6 text-(--hero-overlay-body) sm:text-base">
                                {subtitle}
                            </p>
                            <div className="mt-7 flex flex-wrap gap-3">
                                <a
                                    href="#portfolio"
                                    className="rounded-md bg-accent-color px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
                                >
                                    {t.ctaMain || "Explore work"}
                                </a>
                                <a
                                    href="#contact"
                                    className="rounded-md border border-(--hero-overlay-control-border) px-4 py-2.5 text-sm font-bold text-(--hero-overlay-control-text) transition-colors hover:border-(--hero-overlay-control-text) hover:bg-[color-mix(in_srgb,var(--hero-overlay-control-text)_10%,transparent)]"
                                >
                                    {t.ctaSub || "Start a conversation"}
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => goToSlide(-1)}
                            title="Previous slide"
                            aria-label="Previous slide"
                            className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-(--hero-overlay-control-border) bg-[rgba(var(--hero-overlay-control-bg),0.7)] text-(--hero-overlay-control-text) backdrop-blur-sm transition-colors hover:border-(--hero-overlay-control-text)"
                        >
                            <HiArrowLeft className="size-4" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsPlaying((playing) => !playing)}
                            title={isPlaying ? "Pause slideshow" : "Play slideshow"}
                            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                            className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-(--hero-overlay-control-border) bg-[rgba(var(--hero-overlay-control-bg),0.7)] text-(--hero-overlay-control-text) backdrop-blur-sm transition-colors hover:border-(--hero-overlay-control-text)"
                        >
                            {isPlaying ? (
                                <HiPause className="size-4" aria-hidden="true" />
                            ) : (
                                <HiPlay className="size-4" aria-hidden="true" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => goToSlide(1)}
                            title="Next slide"
                            aria-label="Next slide"
                            className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-(--hero-overlay-control-border) bg-[rgba(var(--hero-overlay-control-bg),0.7)] text-(--hero-overlay-control-text) backdrop-blur-sm transition-colors hover:border-(--hero-overlay-control-text)"
                        >
                            <HiArrowRight className="size-4" aria-hidden="true" />
                        </button>
                    </div>

                    <div
                        className="absolute bottom-7 left-6 z-30 flex gap-1.5 sm:left-10"
                        aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}
                    >
                        {slides.map((slide, index) => (
                            <button
                                key={slide.src}
                                type="button"
                                onClick={() => {
                                    setActiveSlide(index);
                                    setIsPlaying(false);
                                }}
                                aria-label={`Show slide ${index + 1}`}
                                aria-current={index === activeSlide}
                                className={`h-1.5 cursor-pointer rounded-full transition-all ${
                                    index === activeSlide
                                        ? "w-7 bg-accent-color"
                                        : "w-1.5 bg-[color-mix(in_srgb,var(--hero-overlay-control-text)_45%,transparent)] hover:bg-(--hero-overlay-control-text)"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
