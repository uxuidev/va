"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const containerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.08, delayChildren: 0.04 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const Portfolio = ({ content, locale, category = "website" }) => {
	const reduceMotion = useReducedMotion();
	const categoryContent = content[category];
	const isWideMedia = category === "website" || category === "ecommerce";
	const mediaClass = isWideMedia ? "aspect-[683/325]" : "aspect-square";
	const mediaLabel = (title) => content.mediaLabel.replace("{title}", title);

	return (
		<section aria-label={categoryContent.label}>
			<motion.div
				className="grid gap-5 sm:grid-cols-2 lg:gap-6"
				variants={reduceMotion ? undefined : containerVariants}
				initial={reduceMotion ? false : "hidden"}
				animate={reduceMotion ? undefined : "visible"}
			>
				{categoryContent.items.map((item) => (
					<motion.article
						key={item.id}
						className="group overflow-hidden border border-card-border bg-card-bg shadow-sm"
						variants={reduceMotion ? undefined : cardVariants}
						whileHover={reduceMotion ? undefined : { y: -4 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						<div className={`relative overflow-hidden bg-section-beta ${mediaClass}`}>
							{item.kind === "video" ? (
								<video
									src={item.src}
									className="h-full w-full object-contain"
									autoPlay
									muted
									loop
									playsInline
									controls
									aria-label={mediaLabel(item.title)}
								/>
							) : (
								<Image
									src={item.src}
									alt={mediaLabel(item.title)}
									className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
									fill
									sizes="(min-width: 1024px) 50vw, 100vw"
								/>
							)}
						</div>
						<div className="flex items-center justify-between gap-4 border-t border-card-border px-4 py-2.5">
							{item.url ? (
								<Link
									href={item.url}
									target="_blank"
									rel="noreferrer"
									className="inline-flex min-w-0 items-center gap-2 font-semibold text-heading-color transition-colors hover:text-accent-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
								>
									<span>{item.title}</span>
									<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
								</Link>
							) : (
								<h2 className="font-semibold text-heading-color">{item.title}</h2>
							)}
							{item.type && (
								<span className="shrink-0 border border-card-border bg-section-beta px-2 py-1 text-xs font-semibold text-text-muted">
									{item.type}
								</span>
							)}
						</div>
					</motion.article>
				))}
			</motion.div>

			<div className="mt-10 flex justify-center">
				<Link
					href="/login"
					className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-color px-5 py-3 text-sm font-semibold text-body-bg transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
				>
					Get Started
				</Link>
			</div>
		</section>
	);
};

export default Portfolio;