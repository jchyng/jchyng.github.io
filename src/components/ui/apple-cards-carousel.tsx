"use client";
import React, { useState } from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface CardData {
  src: string;
  title: string;
  category: string;
  period?: string;
  affiliation?: string;
  summary?: string;
  href?: string;
}

interface CarouselProps {
  cards: CardData[];
}

export const Carousel = ({ cards }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < cards.length - 1;

  const goPrev = () => {
    if (canGoPrev) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goNext = () => {
    if (canGoNext) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goTo = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 180 : -180,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -180 : 180,
      opacity: 0,
    }),
  };

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-neutral-500">
        등록된 프로젝트가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 px-2 sm:px-4">
      {/* Card row with nav buttons */}
      <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
        {/* Left nav — always takes space to keep card centered */}
        <div className="hidden sm:flex flex-shrink-0 w-12 justify-center">
          {canGoPrev && (
            <button
              onClick={goPrev}
              aria-label="Previous project"
              className="h-12 w-12 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              <IconArrowNarrowLeft className="h-5 w-5 text-white" />
            </button>
          )}
        </div>

        {/* Card */}
        <div className="overflow-hidden w-full max-w-[680px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Card card={cards[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right nav */}
        <div className="hidden sm:flex flex-shrink-0 w-12 justify-center">
          {canGoNext && (
            <button
              onClick={goNext}
              aria-label="Next project"
              className="h-12 w-12 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              <IconArrowNarrowRight className="h-5 w-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile navigation buttons */}
      <div className="flex sm:hidden justify-center gap-4">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Previous project"
          className="h-11 w-11 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 flex items-center justify-center disabled:opacity-30 transition-all"
        >
          <IconArrowNarrowLeft className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Next project"
          className="h-11 w-11 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 flex items-center justify-center disabled:opacity-30 transition-all"
        >
          <IconArrowNarrowRight className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Paging dots */}
      {cards.length > 1 && (
        <div className="flex gap-2 items-center">
          {cards.map((_, i) => (
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
      )}
    </div>
  );
};

const BlurImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn(
        "object-cover transition duration-500",
        isLoading ? "blur-sm scale-105" : "blur-0 scale-100"
      )}
      onLoad={() => setLoading(false)}
    />
  );
};

export const Card = ({ card }: { card: CardData }) => {
  const inner = (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="w-full rounded-3xl overflow-hidden flex flex-col bg-neutral-900 shadow-2xl cursor-pointer group"
    >
      {/* Top info section */}
      <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-7 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-neutral-400 text-xs font-semibold tracking-widest uppercase">
            {card.category}
          </span>
          {card.affiliation && (
            <span className="text-neutral-500 text-xs flex-shrink-0">
              {card.affiliation}
            </span>
          )}
        </div>

        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
          {card.title}
        </h3>

        {card.period && (
          <p className="text-neutral-500 text-xs sm:text-sm font-medium">{card.period}</p>
        )}

        {card.summary && (
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
            {card.summary}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-800 mx-4 sm:mx-6" />

      {/* Thumbnail section */}
      <div className="relative h-48 sm:h-72 md:h-96">
        <BlurImage src={card.src} alt={card.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {card.href && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs font-medium bg-black/50 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
              프로젝트 보기 →
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (card.href) {
    return <Link href={card.href}>{inner}</Link>;
  }
  return inner;
};
