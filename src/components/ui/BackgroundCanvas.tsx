"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface BubbleData {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  colorClass: string;
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse spotlight spring coordinates
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const springX = useSpring(mouseX, { damping: 35, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 180 });

  // 1. Generate floating bubbles client-side
  useEffect(() => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);

    const count = mobileCheck ? 12 : 24;
    const colorClasses = [
      "from-primary/20 via-secondary/15 to-transparent",
      "from-secondary/20 via-accent/15 to-transparent",
      "from-accent/20 via-primary/15 to-transparent",
      "from-primary/15 via-accent/10 to-transparent",
    ];

    const generated: BubbleData[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 120 + 80, // 80px - 200px
      duration: Math.random() * 15 + 18, // 18s - 33s
      delay: Math.random() * 10,
      colorClass: colorClasses[i % colorClasses.length],
    }));

    setBubbles(generated);
  }, []);

  // 2. High performance Canvas Particle & Starfield System
  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Read dynamic CSS theme variables
    const computedStyle = getComputedStyle(document.documentElement);
    const colorPrimary = computedStyle.getPropertyValue("--primary").trim() || "#4F8CFF";
    const colorSecondary = computedStyle.getPropertyValue("--secondary").trim() || "#7B61FF";
    const colorAccent = computedStyle.getPropertyValue("--accent").trim() || "#00D4FF";

    const colors = [colorPrimary, colorSecondary, colorAccent, "#FFFFFF"];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle count: 220 on desktop, 70 on mobile
    const particleCount = isMobile ? 70 : 220;
    const particles = Array.from({ length: particleCount }, () => {
      const baseAlpha = Math.random() * 0.6 + 0.15;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // slow drift
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2.2 + 0.6,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isStar: Math.random() > 0.7, // 30% twinkle stars
      };
    });

    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const render = () => {
      if (!isTabActive) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle gently
        p.x += p.vx;
        p.y += p.vy;

        // Wrap viewport bounds smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Twinkle opacity oscillation
        if (p.isStar) {
          p.alpha =
            p.baseAlpha +
            Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase) * (p.baseAlpha * 0.5);
        }

        // Render Particle Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fill();

        // Soft outer glow for larger star particles
        if (p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.15;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, reducedMotion, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#0B0F19] select-none">
      {/* LAYER 1: Base Dark Theme Background */}
      <div className="absolute inset-0 bg-[#0B0F19]" />

      {/* LAYER 2: Animated Mesh & Aurora Gradients */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-15%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-[140px] animate-aurora" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-accent/25 via-primary/20 to-transparent blur-[150px] animate-aurora [animation-delay:6s]" />
        <div className="absolute top-[35%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-secondary/20 via-accent/15 to-transparent blur-[130px] animate-pulse-glow" />
      </div>

      {/* LAYER 3: Animated Subtle Light Streaks */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[10%] left-[-20%] w-[140%] h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent rotate-[-12deg] blur-[1px] animate-pulse-glow" />
        <div className="absolute top-[65%] left-[-20%] w-[140%] h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent rotate-[18deg] blur-[1px] animate-pulse-glow [animation-delay:3s]" />
      </div>

      {/* LAYER 4: Floating Soft Light Bubbles with Backdrop Blur */}
      {!reducedMotion && (
        <div className="absolute inset-0 opacity-60">
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              className={`absolute rounded-full bg-gradient-to-br ${b.colorClass} blur-xl backdrop-blur-md`}
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                bottom: -250,
              }}
              animate={{
                y: [0, -window.innerHeight - 400],
                x: [0, (b.id % 2 === 0 ? 40 : -40), 0],
                scale: [0.9, 1.15, 0.9],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: b.duration,
                repeat: Infinity,
                delay: b.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* LAYER 5: Canvas Particle System (Hundreds of Glowing Dots & Stars) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />

      {/* LAYER 6: Interactive Spring Mouse Spotlight Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/20 via-accent/15 to-transparent blur-[100px] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* LAYER 7: Film Grain Noise Texture Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-30 mix-blend-overlay" />
    </div>
  );
}
