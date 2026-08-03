'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { techStack } from '@/lib/data/techstack';

const FIELD_HEIGHT = 600;
const FIELD_PADDING = 18;
const CARD_GAP = 12;
const CARD_HEIGHT = 96;
function createCardLayout(width) {
  const columns = width >= 720 ? 3 : width >= 440 ? 3 : 2;
  const rows = Math.ceil(techStack.length / columns);
  const cardWidth = Math.min(190, (width - FIELD_PADDING * 2 - CARD_GAP * (columns - 1)) / columns);
  const gridWidth = columns * cardWidth + (columns - 1) * CARD_GAP;
  const rowGap = rows > 1 ? (FIELD_HEIGHT - FIELD_PADDING * 2 - rows * CARD_HEIGHT) / (rows - 1) : 0;
  const startX = (width - gridWidth) / 2;

  return {
    width,
    positions: techStack.map((_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);

      return {
        x: startX + column * (cardWidth + CARD_GAP),
        y: FIELD_PADDING + row * (CARD_HEIGHT + rowGap),
        rotate: ((index % 3) - 1) * 2,
        width: cardWidth,
        hiddenX: width / 2 - cardWidth / 2 + ((index % 3) - 1) * 8,
        hiddenY: FIELD_HEIGHT / 2 - CARD_HEIGHT / 2 + ((index % 2) - 0.5) * 10,
      };
    }),
  };
}

function FloatingTechCard({ item, index, Icon, iconColor, initialPosition, fieldWidth, isDragging, isRevealed, onDragStart, onDragEnd }) {
  const maxX = Math.max(FIELD_PADDING, fieldWidth - initialPosition.width - FIELD_PADDING);
  const maxY = FIELD_HEIGHT - CARD_HEIGHT - FIELD_PADDING;

  const targetX = Math.min(initialPosition.x, maxX);
  const targetY = Math.min(initialPosition.y, maxY);
  const hiddenX = Math.min(initialPosition.hiddenX ?? fieldWidth / 2 - initialPosition.width / 2, maxX);
  const hiddenY = Math.min(initialPosition.hiddenY ?? FIELD_HEIGHT / 2 - CARD_HEIGHT / 2, maxY);

  const floatDuration = 6.8 + (index % 4) * 1.2;
  const floatDelay = (index % 5) * 0.45 + 4.2;
  const floatYOffset = 4 + (index % 3) * 1.4;
  const floatXOffset = 2.6 + (index % 2) * 1.2;

  return (
    <motion.div
      drag
      dragConstraints={{
        left: FIELD_PADDING,
        right: maxX,
        top: FIELD_PADDING,
        bottom: maxY,
      }}
      dragElastic={0.15}
      dragMomentum={true}
      dragTransition={{ power: 0.5, timeConstant: 340, bounceStiffness: 700, bounceDamping: 18, restDelta: 0.5 }}
      initial={{
        x: hiddenX,
        y: hiddenY,
        scale: 0.86,
        opacity: 0,
        rotate: 0,
      }}
      animate={isRevealed ? {
        x: [targetX, targetX + floatXOffset, targetX - floatXOffset, targetX],
        y: [targetY, targetY - floatYOffset, targetY + floatYOffset, targetY],
        rotate: [initialPosition.rotate, initialPosition.rotate + 2, initialPosition.rotate - 2, initialPosition.rotate],
        scale: 1,
        opacity: 1,
      } : {
        x: hiddenX,
        y: hiddenY,
        rotate: 0,
        scale: 0.86,
        opacity: 0,
      }}
      transition={isRevealed ? {
        x: {
          duration: 5.2,
          ease: 'easeOut',
          repeat: Infinity,
          repeatType: 'mirror',
          times: [0, 0.33, 0.66, 1],
          delay: floatDelay,
        },
        y: {
          duration: floatDuration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
          times: [0, 0.33, 0.66, 1],
          delay: floatDelay,
        },
        rotate: {
          duration: floatDuration * 1.2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
          delay: floatDelay,
        },
        default: {
          duration: 4.2,
          ease: 'easeOut',
          delay: index * 0.1,
        },
      } : {
        x: { duration: 0.45, ease: 'easeOut' },
        y: { duration: 0.45, ease: 'easeOut' },
        rotate: { duration: 0.35, ease: 'easeOut' },
        opacity: { duration: 0.35, ease: 'easeOut' },
        scale: { duration: 0.35, ease: 'easeOut' },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onDragStart={() => onDragStart(index)}
      onDragEnd={onDragEnd}
      style={{
        width: initialPosition.width,
        height: CARD_HEIGHT,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: isDragging ? 100 : 'auto',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      className={`tech-stack-motion-container ${isDragging ? 'is-dragging' : ''}`}
    >
      <div className="tech-stack-card h-full w-full rounded-xl">
        <div className="tech-stack-card-content grid h-full grid-rows-[34px_1px_1fr] px-3 py-2 opacity-100">
          <div className="relative flex items-center justify-center text-[var(--theme-heading)]">
            <span className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-center opacity-100" style={{ color: iconColor }}>
              <Icon size={22} aria-hidden="true" />
            </span>
            <span className="tech-stack-engraved px-7 text-center text-sm font-semibold leading-tight opacity-100 mix-blend-normal">{item.name}</span>
          </div>
          <div className="tech-stack-divider" aria-hidden="true" />
          <p className="flex items-center justify-start overflow-hidden px-1 text-left text-[0.65rem] font-medium leading-[1.25] opacity-100 mix-blend-normal text-[var(--theme-subheading)]">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero({ content }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [revealedCards, setRevealedCards] = useState(() => new Set(techStack.map((_, index) => index)));
  const [cardLayout, setCardLayout] = useState(null);
  const techStackRef = useRef(null);

  useLayoutEffect(() => {
    const field = techStackRef.current;
    if (!field) return undefined;

    const updateInitialLayout = () => {
      const { width } = field.getBoundingClientRect();
      if (width > 0) setCardLayout(createCardLayout(width));
    };

    updateInitialLayout();
    const resizeObserver = new ResizeObserver(updateInitialLayout);
    resizeObserver.observe(field);

    return () => resizeObserver.disconnect();
  }, []);

  const slides = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => ({
        src: `/hero/${index + 1}.jpg`,
        alt: `Showcase ${index + 1}`,
      })),
    []
  );

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPlaying, slides.length]);

  if (!content) return null;

  const goToSlide = (direction) => {
    setActiveSlide((current) => {
      if (direction === 'next') {
        return (current + 1) % slides.length;
      }

      return (current - 1 + slides.length) % slides.length;
    });
  };

  const badge = content.badge || 'Virtual Assistant Services';
  const title = content.title || 'Delegate Your Tasks';
  const subtitle = content.subtitle || 'Flexible support crafted to help your business move faster.';
  const primaryCta = content.primaryCta || 'Get Started';
  const secondaryCta = content.secondaryCta || 'Explore Services';

  return (
    <section className="relative overflow-hidden border-y border-[color:var(--theme-border)] bg-primary pt-0 pb-20 lg:pb-28">
      <div className="relative mx-auto grid w-full max-w-none gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 lg:order-1">
          <div className="bg-transparent p-0">
            <div className="relative h-[600px] overflow-hidden p-0">
              <div
                ref={techStackRef}
                className="tech-stack-field relative h-[600px] overflow-hidden rounded-2xl"
              >
                {/* Ambient glowing gradient blobs behind tech cards field for rich frosted blur sampling */}
                <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 opacity-30 blur-3xl" />
                <div className="pointer-events-none absolute left-1/3 top-1/3 h-56 w-56 rounded-full bg-gradient-to-r from-amber-400 to-red-500 opacity-25 blur-3xl" />

                <div
                  className="tech-stack-badge pointer-events-none absolute left-1/2 top-1/2 z-50 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-white/20 text-center shadow-[0_18px_48px_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.25)] sm:h-44 sm:w-44"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--theme-primary) 12%, rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(30px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  }}
                >
                  <div className="pointer-events-none flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center leading-none">
                      <span className="text-[0.8rem] font-black uppercase tracking-[0.35em] text-[color:var(--theme-heading)] sm:text-[0.95rem]">
                        TECH
                      </span>
                      <span className="mt-1 text-[0.8rem] font-black uppercase tracking-[0.35em] text-[color:var(--theme-heading)] sm:text-[0.95rem]">
                        STACK
                      </span>
                    </div>
                  </div>
                </div>

                {cardLayout && techStack.map((item, index) => {
                  const Icon = item.icon || Code2;
                  const iconColor = item.color || 'var(--theme-accent)';

                  return (
                    <FloatingTechCard
                      key={item.name}
                      item={item}
                      index={index}
                      Icon={Icon}
                      iconColor={iconColor}
                      initialPosition={cardLayout.positions[index]}
                      fieldWidth={cardLayout.width}
                      isDragging={draggingIndex === index}
                      isRevealed={revealedCards.has(index)}
                      onDragStart={(cardIndex) => {
                        setDraggingIndex(cardIndex);
                        setRevealedCards((current) => {
                          const next = new Set(current);
                          next.add(cardIndex);
                          return next;
                        });
                      }}
                      onDragEnd={() => setDraggingIndex(null)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex h-full flex-col bg-transparent p-0 sm:p-0">
            <div className="relative h-[600px] overflow-hidden lg:ml-auto lg:w-[calc(100%+2rem)]">
              <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[activeSlide].src}
                      alt={slides[activeSlide].alt}
                      priority
                      quality={100}
                      width={1400}
                      height={900}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="absolute right-0 top-0 h-[600px] w-auto max-w-none object-cover object-right"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                className="absolute inset-0 z-10"
                style={{
                  background: 'linear-gradient(90deg, var(--theme-primary) 0%, var(--theme-primary) 42%, transparent 55%, transparent 100%)',
                }}
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 pl-8 sm:p-8 sm:pl-10 lg:p-10 lg:pl-12">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() => goToSlide('prev')}
                    className="rounded-full border p-2 transition-transform hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text)' }}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={() => goToSlide('next')}
                    className="rounded-full border p-2 transition-transform hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text)' }}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="max-w-[18rem] sm:max-w-[20rem]">
                  <span
                    className="inline-flex rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em]"
                    style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-strip)', color: 'var(--theme-accent)' }}
                  >
                    {badge}
                  </span>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-heading sm:text-4xl">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-subheading sm:text-base">{subtitle}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                      style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--theme-primary)' }}
                    >
                      {primaryCta}
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsPlaying((value) => !value)}
                      className="rounded-full border px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                      style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text)' }}
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
