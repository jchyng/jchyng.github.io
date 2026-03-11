import Link from "next/link";
import LightRays from "@/components/LightRays";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* LightRays Background Layer - Fixed to cover the whole viewport */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-full h-full opacity-60">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.0}
            lightSpread={1.2}
            rayLength={2.0}
            pulsating={true}
            fadeDistance={1.0}
            saturation={1.0}
            followMouse={true}
            mouseInfluence={0.08}
          />
        </div>
      </div>

      {/* Content Layer - Naturally flows over the fixed background */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-8 sm:gap-12 px-5 sm:px-6 py-12 sm:py-20 text-center">
        <div className="space-y-4 sm:space-y-6">
          <p className="text-indigo-400 text-xs sm:text-sm font-medium tracking-widest uppercase">
            개발자 포트폴리오
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white">
            안녕하세요,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              개발자 정찬영입니다.
            </span>
          </h1>
        </div>

        <p className="max-w-md text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
          사용자 경험을 고민하며 성장하는 개발자입니다.
          <br />
          함께 만들어가는 서비스를 지향합니다.
        </p>

        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full text-sm sm:text-base font-semibold transition-all hover:bg-neutral-100 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          <span>포트폴리오 보기</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
