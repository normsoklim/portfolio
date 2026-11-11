"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { TOPO_PATH } from "./topoPattern";

const GREEN = "#4f6b4b";
const GREEN_LIGHT = "#62805c";
const GREEN_DARK = "#3b5539";
const GREEN_DEEP = "#2e4a2e";
const CREAM = "#f1ede0";
const ACCENT = "#03631d";

export function InteractiveIdCard() {
  const reduceMotion = useReducedMotion();

  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);

  // Card swings from its top edge as it is dragged sideways
  const rotate = useTransform(x, [-100, 100], [-12, 12]);
  // Slight 3D tilt and a glare band that slides across the card as it moves
  const tiltY = useTransform(x, [-100, 100], [14, -14]);
  const glareX = useTransform(x, [-100, 100],   [-150, 150]);

  // Card pivot (top-centre) in the 380 x 680 scene
  const PIVOT_X = 190;
  const PIVOT_Y = 200;
  const CLIP_REACH = 96; // distance from card top up to where the strap enters the crimp

  // Builds the strap centre-line (or an offset copy for edge stitching)
  const buildStrap = (dx: number, dy: number, deg: number, off: number) => {
    const rad = (deg * Math.PI) / 180;
    const ex = PIVOT_X + dx + Math.sin(rad) * CLIP_REACH + off * Math.cos(rad);
    const ey = PIVOT_Y + dy - Math.cos(rad) * CLIP_REACH + off * Math.sin(rad);
    const mx = 190 + (ex - 190) * 0.6;
    return `M ${190 + off} -100 C ${190 + off} 30, ${mx} ${ey - 90}, ${ex} ${ey}`;
  };
  const strapPath = useTransform([x, y, rotate], (l: number[]) => buildStrap(l[0], l[1], l[2], 0));
  const stitchL = useTransform([x, y, rotate], (l: number[]) => buildStrap(l[0], l[1], l[2], -13));
  const stitchR = useTransform([x, y, rotate], (l: number[]) => buildStrap(l[0], l[1], l[2], 13));

  // Blue card behind trails the front card with a spring for a loose feel
  const backRotateTarget = useTransform(x, [-100, 100], [-20, -6]);
  const backRotate = useSpring(backRotateTarget, { stiffness: 90, damping: 10 });

  return (
    <div className="relative flex h-[680px] w-[380px] items-center justify-center overflow-visible">
      <motion.div
        animate={reduceMotion ? undefined : { x: [0, 5, 0, -5, 0], y: [0, 3, 0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* ---------- Back card (green, tilted) ---------- */}
        <motion.div
          className="absolute left-[48px] top-[220px] z-10 h-[360px] w-[250px] overflow-hidden rounded-[18px] shadow-[0_2px_0_#243a25,0_20px_40px_rgba(0,0,0,0.3)]"
          style={{
            rotate: backRotate,
            transformOrigin: "50% 0%",
            background: `linear-gradient(165deg, ${GREEN_LIGHT} 0%, ${GREEN} 55%, ${GREEN_DARK} 100%)`,
          }}
        >
          <svg viewBox="0 0 250 360" className="absolute inset-0 h-full w-full" fill="none" strokeLinejoin="round">
            <path d={TOPO_PATH} stroke="#ffffff" strokeOpacity="0.14" strokeWidth="0.9" transform="translate(0.8 0.8)" />
            <path d={TOPO_PATH} stroke="#16301a" strokeOpacity="0.28" strokeWidth="0.9" />
            <rect x="104" y="12" width="42" height="12" rx="6" fill={CREAM} />
            <text x="125" y="205" textAnchor="middle" fontSize="70" fontWeight="900" letterSpacing="2" fill={CREAM}>
              NORM
            </text>
            <text x="125" y="236" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="5" fill={CREAM}>
              FULL-STACK DEV
            </text>
          </svg>
          <div
            className="absolute inset-x-[10px] bottom-[8px] flex h-[30px] items-center justify-center rounded-[10px] text-[9px] font-extrabold tracking-[0.2em] shadow-[0_3px_6px_rgba(0,0,0,0.3)]"
            style={{ color: GREEN_DEEP, background: `linear-gradient(${CREAM}, #d9d2bd)` }}
          >
            SOFTWARE ENGINEER
          </div>
        </motion.div>

        {/* ---------- Lanyard ---------- */}
        <svg
          className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
          viewBox="0 0 380 680"
        >
          <defs>
            <filter id="strap-shadow" x="-60%" y="-10%" width="220%" height="130%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Soft cast shadow on the page */}
          <g transform="translate(6 9)" opacity="0.3">
            <motion.path d={strapPath} stroke="#000" strokeWidth="34" fill="none" filter="url(#strap-shadow)" />
          </g>

          {/* Edge (darker rolled border) */}
          <motion.path d={strapPath} stroke="#2a4528" strokeWidth="36" fill="none" />
          {/* Fabric body */}
          <motion.path d={strapPath} stroke="#4a6b47" strokeWidth="32" fill="none" />
          {/* Ribbon sheen down the middle */}
          <motion.path d={strapPath} stroke="#a3c796" strokeOpacity="0.38" strokeWidth="14" fill="none" />
          <motion.path d={strapPath} stroke="#ffffff" strokeOpacity="0.12" strokeWidth="4" fill="none" />
          {/* Woven twill (cross threads) */}
          <motion.path d={strapPath} stroke="#16281a" strokeOpacity="0.16" strokeWidth="32" strokeDasharray="1.2 2.4" fill="none" />
          <motion.path d={strapPath} stroke="#ffffff" strokeOpacity="0.09" strokeWidth="32" strokeDasharray="1.2 2.4" strokeDashoffset="1.8" fill="none" />
          {/* Edge stitching */}
          <motion.path d={stitchL} stroke="#e8f0dc" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="4 3" fill="none" />
          <motion.path d={stitchR} stroke="#e8f0dc" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="4 3" fill="none" />

          {/* Printed text that bends with the strap */}
          <motion.path id="strap-center" d={strapPath} fill="none" stroke="none" />
          <text fontSize="10" fontWeight="800" letterSpacing="2.5" fill="#16281a" fillOpacity="0.8" dy="3.5">
            <textPath href="#strap-center" startOffset="96">NORM SOKLIM</textPath>
          </text>
        </svg>

        {/* ---------- Front card (draggable) ---------- */}
        <motion.div
          className="absolute left-[65px] top-[200px] z-30 h-[360px] w-[250px] cursor-grab touch-none select-none rounded-[18px] bg-white shadow-[0_2px_0_#c9d1db,0_25px_50px_rgba(0,0,0,0.22),0_8px_16px_rgba(0,0,0,0.1)]"
          drag
          dragConstraints={{ left: -100, right: 100, top: -60, bottom: 90 }}
          dragElastic={0.2}
          dragMomentum
          dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
          style={{ x, y, rotate, rotateY: tiltY, transformPerspective: 900, transformOrigin: "50% 0%" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Metal crimp + swivel + hook, fixed to the card */}
          <svg
            viewBox="0 0 60 130"
            className="pointer-events-none absolute left-1/2 top-[-104px] z-40 h-[130px] w-[60px] -translate-x-1/2 overflow-visible"
          >
            <defs>
              <linearGradient id="steel-x" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#7d8fa3" />
                <stop offset="0.25" stopColor="#f1f5f9" />
                <stop offset="0.55" stopColor="#a9b8c8" />
                <stop offset="1" stopColor="#5b6c80" />
              </linearGradient>
              <linearGradient id="steel-y" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="125">
                <stop offset="0" stopColor="#e8eef5" />
                <stop offset="0.45" stopColor="#8b9cb0" />
                <stop offset="1" stopColor="#4a5a6e" />
              </linearGradient>
              <filter id="hw-shadow" x="-40%" y="-20%" width="180%" height="160%">
                <feDropShadow dx="2" dy="4" stdDeviation="2.5" floodColor="#000" floodOpacity="0.35" />
              </filter>
            </defs>

            <g filter="url(#hw-shadow)">
              {/* Ribbon crimp the strap slides into */}
              <rect x="9" y="2" width="42" height="24" rx="4" fill="url(#steel-x)" stroke="#4a5a6e" strokeWidth="0.8" />
              <path d="M13 8 H47 M13 13 H47 M13 18 H47" stroke="#4a5a6e" strokeOpacity="0.45" strokeWidth="0.9" />
              <path d="M12 5 H48" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" />

              {/* Split ring */}
              <circle cx="30" cy="35" r="8.5" fill="none" stroke="url(#steel-y)" strokeWidth="3.6" />
              <circle cx="30" cy="35" r="8.5" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="14 40" />

              {/* Swivel barrel */}
              <rect x="23" y="42" width="14" height="20" rx="4.5" fill="url(#steel-x)" stroke="#4a5a6e" strokeWidth="0.8" />
              <path d="M23.5 50 H36.5" stroke="#4a5a6e" strokeOpacity="0.5" strokeWidth="0.9" />
              <circle cx="30" cy="46" r="1.4" fill="#4a5a6e" />

              {/* J-hook */}
              <path d="M30 62 V100 Q30 118 17 118 Q9 118 9 108" fill="none" stroke="#3d4c5f" strokeWidth="6.4" strokeLinecap="round" />
              <path d="M30 62 V100 Q30 118 17 118 Q9 118 9 108" fill="none" stroke="url(#steel-y)" strokeWidth="5" strokeLinecap="round" />
              <path d="M28.4 66 V100" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.1" strokeLinecap="round" />
            </g>
          </svg>

          <div
            className="relative h-full w-full overflow-hidden rounded-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(0,0,0,0.12)]"
            style={{
              background: `linear-gradient(165deg, ${GREEN_LIGHT} 0%, ${GREEN} 55%, ${GREEN_DARK} 100%)`,
            }}
          >
            {/* Darker side band for the vertical title */}
            <div className="absolute inset-y-0 left-0 w-[46px]" style={{ background: GREEN_DEEP }} />

            {/* Topographic contour lines + vertical title */}
            <svg aria-hidden viewBox="0 0 250 360" className="absolute inset-0 h-full w-full" fill="none" strokeLinejoin="round">
              <path d={TOPO_PATH} stroke="#ffffff" strokeOpacity="0.14" strokeWidth="0.9" transform="translate(0.8 0.8)" />
              <path d={TOPO_PATH} stroke="#16301a" strokeOpacity="0.28" strokeWidth="0.9" />
              <text transform="translate(10 322) rotate(-90)" fontSize="32" fontWeight="900" letterSpacing="3" stroke={CREAM} strokeOpacity="0.4" strokeWidth="1">
                PORTFOLIO
              </text>
              <text transform="translate(38 322) rotate(-90)" fontSize="32" fontWeight="900" letterSpacing="3" fill={CREAM}>
                PORTFOLIO
              </text>
            </svg>

            {/* Photo with faded echo */}
            <div className="absolute left-[34px] top-[58px] h-[214px] w-[200px]">
              <Image
                src="/images/profile.jpg"
                alt=""
                aria-hidden
                width={110}
                height={190}
                draggable={false}
                className="absolute left-[92px] top-[18px] h-[190px] w-[110px] object-cover object-top opacity-25 grayscale"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent)",
                  maskImage: "linear-gradient(to bottom, #000 55%, transparent)",
                }}
              />
              <Image
                src="/images/profile.jpg"
                alt="Norm Soklim"
                width={150}
                height={206}
                priority
                draggable={false}
                className="absolute left-0 top-0 h-[206px] w-[150px] rounded-t-[16px] object-cover object-top"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent)",
                  maskImage: "linear-gradient(to bottom, #000 82%, transparent)",
                }}
              />
            </div>

            {/* Torn-paper header */}
            <svg
              aria-hidden
              viewBox="0 0 250 60"
              preserveAspectRatio="none"
              className="absolute left-0 top-0 z-10 h-[60px] w-full drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)]"
            >
              <path
                d="M0 0H250V38C238 46 226 40 214 45C202 50 190 42 176 46C162 50 150 43 136 47C122 51 108 44 94 48C80 52 66 45 52 49C38 53 24 46 12 50L0 47Z"
                fill={CREAM}
              />
            </svg>

            <span className="absolute left-[54px] top-[17px] z-20 text-[8px] font-semibold tracking-wide" style={{ color: GREEN_DEEP }}>
              ID #0014
            </span>

            {/* Logo seal */}
            <div
              className="absolute right-[34px] top-[12px] z-20 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white shadow"
              style={{ boxShadow: `0 0 0 2px ${GREEN}, 0 2px 4px rgba(0,0,0,0.25)` }}
            >
              <svg viewBox="0 0 40 40" className="h-[14px] w-[14px]">
                <path
                  d="M4 4 H18 V10 H10 V16 H18 V22 H10 V36 H4 Z M22 4 H36 V36 H22 V28 H30 V22 H22 Z"
                  fill={GREEN}
                />
              </svg>
            </div>

            {/* Lanyard slot */}
            <div className="absolute left-1/2 top-[12px] z-20 h-[14px] w-[46px] -translate-x-1/2 rounded-full bg-[#eef2f7] shadow-[inset_0_1px_1px_#fff,0_1px_2px_rgba(0,0,0,0.15)]">
              <div className="absolute inset-[3px] rounded-full bg-[#b9c3a9] shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)]" />
            </div>

            {/* Name plate */}
            <div className="absolute left-[18px] top-[262px] z-10 w-[214px] overflow-hidden rounded-[10px] bg-white py-[7px] pl-4 pr-3 shadow-[0_8px_14px_rgba(0,0,0,0.28)]">
              <span className="absolute inset-y-0 left-0 w-[5px]" style={{ background: ACCENT }} />
              <p className="m-0 text-[15px] font-bold leading-tight tracking-tight" style={{ color: ACCENT }}>
                Norm Soklim
              </p>
              <div className="mt-[2px] flex justify-between text-[9px] font-medium text-gray-500">
                <span>Full-Stack Developer</span>
                <span>0014</span>
              </div>
            </div>

            {/* Footer bar */}
            <div
              className="absolute inset-x-[10px] bottom-[8px] z-10 flex h-[30px] items-center justify-center rounded-[10px] text-[9px] font-extrabold tracking-[0.2em] shadow-[0_3px_6px_rgba(0,0,0,0.3)]"
              style={{ color: GREEN_DEEP, background: `linear-gradient(${CREAM}, #d9d2bd)` }}
            >
              SOFTWARE ENGINEER
            </div>

            {/* Glossy glare that follows the drag */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-[40px] bottom-[-40px] left-[60px] z-30 w-[70px] rotate-[18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ x: glareX }}
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 flex items-center text-[12px] tracking-widest text-gray-400">
        <span className="mr-2 text-[18px]">↔</span>
        <span>Drag to interact</span>
      </div>
    </div>
  );
}