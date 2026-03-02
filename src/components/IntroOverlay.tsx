"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Orb from "@/components/ui/orb";
import Cookies from "js-cookie";
import { IconArrowRight } from "@tabler/icons-react";

const COOKIE_NAME = "portfolio_intro_seen";

export const IntroOverlay = ({ children }: { children: React.ReactNode }) => {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const seen = Cookies.get(COOKIE_NAME);
    if (!seen) {
      setShowIntro(true);
    }
  }, []);

  const handleStart = () => {
    Cookies.set(COOKIE_NAME, "true", { expires: 7 }); // expires in 7 days
    setShowIntro(false);
  };

  if (!isClient) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <Orb
                hoverIntensity={0}
                rotateOnHover={false}
                hue={0}
                forceHoverState={false}
                backgroundColor="#000000"
                noiseScale={0}
              />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-12 px-6 text-center">
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-indigo-400 text-sm font-medium tracking-widest uppercase"
                >
                  개발자 포트폴리오
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl md:text-8xl font-bold tracking-tight text-white"
                >
                  안녕하세요 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">정찬영입니다</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="max-w-md text-neutral-400 text-lg font-light leading-relaxed"
              >
                사용자 경험을 고민하며 성장하는 개발자입니다. <br />
                함께 만들어가는 서비스를 지향합니다.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:bg-neutral-100 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <span>포트폴리오 보기</span>
                <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Subtle floating circles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] animate-pulse delay-700" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          key="content"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
