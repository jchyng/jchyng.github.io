"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import type { ProjectData } from "@/lib/markdown";
import LightRays from "@/components/LightRays";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop";

export default function GalleryView({ projects }: { projects: ProjectData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (projects.length === 0) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500">No projects yet.</p>
      </div>
    );
  }

  const current = projects[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < projects.length - 1;

  const goPrev = () => {
    if (!canGoPrev) return;
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  };

  const goNext = () => {
    if (!canGoNext) return;
    setDirection(1);
    setCurrentIndex((i) => i + 1);
  };

  const goTo = (i: number) => {
    if (i === currentIndex) return;
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  };

  const imageVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-start lg:items-center">
      <Link
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 text-neutral-700 hover:text-white hover:bg-neutral-800 h-10 w-10 rounded-full flex items-center justify-center transition-all"
        aria-label="Back to home"
      >
        <IconArrowLeft className="h-5 w-5" />
      </Link>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-16 pt-16 pb-8 lg:py-16 flex flex-col lg:flex-row items-center gap-6 lg:gap-24">

        {/* Right: card + nav (order-1 on mobile → appears first) */}
        <div className="order-1 lg:order-2 flex flex-col items-center gap-3 lg:gap-6 w-full lg:w-auto flex-shrink-0">
          {/* Card wrapper */}
          <div className="relative w-full max-w-[92vw] sm:max-w-[420px] lg:max-w-[500px]">
            {/* LightRays glow over card */}
            <div className="absolute -inset-[300px] z-20 opacity-70 pointer-events-none">
              <LightRays
                raysOrigin="top-center"
                raysColor="#ffffff"
                raysSpeed={0.7}
                lightSpread={1.2}
                rayLength={1.8}
                fadeDistance={0.8}
                saturation={0.6}
                followMouse={true}
                mouseInfluence={0.15}
              />
            </div>

            {/* Prev button (desktop only) */}
            {canGoPrev && (
              <button
                onClick={goPrev}
                aria-label="Previous project"
                className="hidden lg:flex absolute -left-14 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full items-center justify-center text-neutral-700 hover:text-white hover:bg-neutral-800 transition-all"
              >
                <IconArrowNarrowLeft className="h-5 w-5 text-white" />
              </button>
            )}

            {/* Image card */}
            <div className="relative z-10 w-full h-[220px] sm:h-[380px] md:h-[500px] lg:h-[640px] rounded-2xl lg:rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Link
                    href={`/projects/${current.slug}`}
                    className="block w-full h-full group"
                  >
                    <Image
                      src={current.thumbnail || FALLBACK_IMAGE}
                      alt={current.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button (desktop only) */}
            {canGoNext && (
              <button
                onClick={goNext}
                aria-label="Next project"
                className="hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full items-center justify-center text-neutral-700 hover:text-white hover:bg-neutral-800 transition-all"
              >
                <IconArrowNarrowRight className="h-5 w-5 text-white" />
              </button>
            )}
          </div>

          {/* Mobile: prev/next + dots */}
          <div className="flex lg:hidden items-center gap-3 relative z-30">
            <button
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Previous project"
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center transition-all",
                canGoPrev
                  ? "text-white bg-neutral-800 hover:bg-neutral-700"
                  : "text-neutral-700 cursor-not-allowed opacity-40"
              )}
            >
              <IconArrowNarrowLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2 items-center">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentIndex
                      ? "w-5 bg-white"
                      : "w-1.5 bg-neutral-600 hover:bg-neutral-400"
                  )}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Next project"
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center transition-all",
                canGoNext
                  ? "text-white bg-neutral-800 hover:bg-neutral-700"
                  : "text-neutral-700 cursor-not-allowed opacity-40"
              )}
            >
              <IconArrowNarrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop: dots only */}
          <div className="hidden lg:flex gap-2.5 items-center relative z-30">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === currentIndex
                    ? "w-6 bg-white"
                    : "w-2 bg-neutral-600 hover:bg-neutral-400"
                )}
              />
            ))}
          </div>
        </div>

        {/* Left: project info (order-2 on mobile → appears below card) */}
        <div className="order-2 lg:order-1 flex-1 flex flex-col min-w-0 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col gap-2 lg:gap-4"
            >
              <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase">
                {current.category}
                {current.affiliation && (
                  <span className="font-normal text-neutral-600">
                    {" "}· {current.affiliation}
                  </span>
                )}
              </p>

              <h3 className="text-white text-xl sm:text-3xl md:text-4xl font-bold leading-tight">
                {current.title}
              </h3>

              {current.period && (
                <p className="text-neutral-500 text-xs sm:text-sm">{current.period}</p>
              )}

              {current.summary && (
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed line-clamp-3 lg:line-clamp-none">
                  {current.summary}
                </p>
              )}

              <Link
                href={`/projects/${current.slug}`}
                className="mt-1 lg:mt-4 inline-flex items-center gap-2 text-white text-sm font-medium border border-white/20 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 w-fit hover:border-white/50 hover:bg-white/5 transition-all"
              >
                View Project →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
