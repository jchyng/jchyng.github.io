"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import type { ProjectData } from "@/lib/markdown";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop";

export default function GalleryView({ projects }: { projects: ProjectData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (projects.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">등록된 프로젝트가 없습니다.</p>
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
    <div className="w-full min-h-screen flex items-center">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center transition-all border border-neutral-700/50"
        aria-label="홈으로 돌아가기"
      >
        <IconArrowLeft className="h-5 w-5" />
      </Link>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-16 py-8 sm:py-16 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-24">

        {/* Left: page title + animated project info */}
        <div className="flex-1 flex flex-col min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase">
                {current.category}
                {current.affiliation && (
                  <span className="font-normal text-neutral-600">
                    {" "}· {current.affiliation}
                  </span>
                )}
              </p>

              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                {current.title}
              </h3>

              {current.period && (
                <p className="text-neutral-500 text-sm">{current.period}</p>
              )}

              {current.summary && (
                <p className="text-neutral-400 text-base leading-relaxed">
                  {current.summary}
                </p>
              )}

              <Link
                href={`/projects/${current.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-white text-sm font-medium border border-white/20 rounded-full px-5 py-2.5 w-fit hover:border-white/50 hover:bg-white/5 transition-all"
              >
                프로젝트 보기 →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: card + nav buttons (absolute) + dots */}
        <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col items-center gap-6">
          {/* Card wrapper with nav buttons */}
          <div className="relative w-full max-w-[340px] lg:max-w-none">
            {/* Navigation buttons - below card on mobile, beside card on sm+ */}
            {canGoPrev && (
              <button
                onClick={goPrev}
                aria-label="Previous project"
                className="hidden sm:flex absolute -left-14 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full items-center justify-center text-neutral-700 hover:text-white hover:bg-neutral-800 transition-all"
              >
                <IconArrowNarrowLeft className="h-5 w-5 text-white" />
              </button>
            )}

            {/* Image card */}
            <div className="relative z-10 w-full aspect-[4/3] lg:aspect-[5/6] rounded-2xl lg:rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl">
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

            {canGoNext && (
              <button
                onClick={goNext}
                aria-label="Next project"
                className="hidden sm:flex absolute -right-14 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full items-center justify-center text-neutral-700 hover:text-white hover:bg-neutral-800 transition-all"
              >
                <IconArrowNarrowRight className="h-5 w-5 text-white" />
              </button>
            )}

            {/* Mobile navigation buttons - visible only on small screens */}
            <div className="flex sm:hidden justify-center gap-6 mt-4">
              <button
                onClick={goPrev}
                disabled={!canGoPrev}
                aria-label="Previous project"
                className="h-11 w-11 rounded-full flex items-center justify-center bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 disabled:opacity-30 transition-all"
              >
                <IconArrowNarrowLeft className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={goNext}
                disabled={!canGoNext}
                aria-label="Next project"
                className="h-11 w-11 rounded-full flex items-center justify-center bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 disabled:opacity-30 transition-all"
              >
                <IconArrowNarrowRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Paging dots */}
          <div className="flex gap-2.5 items-center relative z-30">
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

      </div>
    </div>
  );
}
