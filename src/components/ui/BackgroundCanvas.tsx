"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface BubbleData {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  blurClass: string;
  maxOpacity: number;
  colorClass: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse spotlight spring coordinates with ultra-soft easing
  const mouseX = useMotionValue(-800);
  const mouseY = useMotionValue(-800);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  // 1. Generate Organic Bubbles & Volumetric Spheres
  useEffect(() => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);

    const count = mobileCheck ? 12 : 32;
    const blurClasses = ["blur-md", "blur-lg", "blur-xl", "blur-2xl", "blur-3xl"];
    const colorClasses = [
      "from-primary/25 via-secondary/15 to-transparent",
      "from-secondary/25 via-accent/15 to-transparent",
      "from-accent/20 via-primary/15 to-transparent",
      "from-primary/20 via-accent/10 to-transparent",
    ];

    const generated: BubbleData[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i * (100 / count) + Math.random() * 8) % 96,
      size: Math.random() * 180 + 100, // 100px - 280px
      duration: Math.random() * 20 + 24, // 24s - 44s
      delay: Math.random() * 14,
      blurClass: blurClasses[i % blurClasses.length],
      maxOpacity: Math.random() * 0.45 + 0.25,
      colorClass: colorClasses[i % colorClasses.length],
    }));

    setBubbles(generated);
  }, []);

  // 2. Multi-Layered Natural Starfield, Constellations & Volumetric Light Rays
  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Read dynamic CSS variables from theme
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

    // Natural non-uniform distribution (Clustered Nebula Bands + Deep Field)
    const particleCount = isMobile ? 90 : 320;
    const particles = Array.from({ length: particleCount }, (_, idx) => {
      const depth = idx < particleCount * 0.55 ? 0 : idx < particleCount * 0.88 ? 1 : 2;

      const size = depth === 0 ? Math.random() * 1.2 + 0.3 : depth === 1 ? Math.random() * 2.2 + 0.8 : Math.random() * 3.2 + 1.6;
      const speedMult = depth === 0 ? 0.06 : depth === 1 ? 0.18 : 0.35;
      const baseAlpha = depth === 0 ? Math.random() * 0.35 + 0.1 : depth === 1 ? Math.random() * 0.55 + 0.2 : Math.random() * 0.75 + 0.35;

      // Galaxy cluster band math (denser near middle-diagonal)
      const inNebulaBand = Math.random() > 0.35;
      const bandY = height * 0.5 + (Math.random() - 0.5) * height * 0.5;
      const y = inNebulaBand ? bandY : Math.random() * height;

      return {
        x: Math.random() * width,
        y,
        vx: (Math.random() - 0.5) * speedMult,
        vy: (Math.random() - 0.5) * speedMult,
        size,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: Math.random() * 0.01 + 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        depth,
        sineOffset: Math.random() * Math.PI * 2,
      };
    });

    // Shooting Stars Queue
    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Math.random() * 350 + 250;

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

      // --- A. Render Volumetric Atmospheric Fog Band ---
      const fogGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        100,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.8
      );
      fogGrad.addColorStop(0, `${colorPrimary}0A`);
      fogGrad.addColorStop(0.5, `${colorSecondary}05`);
      fogGrad.addColorStop(1, "transparent");

      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, width, height);

      // --- B. Render Multi-Depth Organic Particles & Constellation Links ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic sway using sine wave on x position
        p.x += p.vx + Math.sin(time * 0.4 + p.sineOffset) * 0.04;
        p.y += p.vy + Math.cos(time * 0.4 + p.sineOffset) * 0.03;

        // Wrap viewport edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Twinkle oscillation
        p.alpha =
          p.baseAlpha +
          Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase) * (p.baseAlpha * 0.45);

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, p.alpha));
        ctx.fill();

        // Soft outer glow for foreground particles
        if (p.depth === 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.14;
          ctx.fill();
        }

        // Draw subtle constellation lines between close foreground particles
        if (p.depth === 2 && !isMobile) {
          for (let j = i + 1; j < Math.min(i + 15, particles.length); j++) {
            const p2 = particles[j];
            if (p2.depth === 2) {
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = colorAccent;
                ctx.globalAlpha = (1 - dist / 110) * 0.08;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      }

      // --- C. Render Occasional Shooting Stars / Light Streaks ---
      nextShootingStarTime--;
      if (nextShootingStarTime <= 0 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.85,
          y: Math.random() * height * 0.5,
          length: Math.random() * 140 + 90,
          speed: Math.random() * 8.5 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 0,
          maxAlpha: Math.random() * 0.45 + 0.3,
          life: 0,
          maxLife: Math.random() * 40 + 25,
        });
        nextShootingStarTime = Math.random() * 450 + 350;
      }

      for (let sIdx = shootingStars.length - 1; sIdx >= 0; sIdx--) {
        const star = shootingStars[sIdx];
        star.life++;
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.life < star.maxLife * 0.3) {
          star.alpha = (star.life / (star.maxLife * 0.3)) * star.maxAlpha;
        } else {
          star.alpha =
            (1 - (star.life - star.maxLife * 0.3) / (star.maxLife * 0.7)) * star.maxAlpha;
        }

        const headX = star.x;
        const headY = star.y;
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const streakGrad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        streakGrad.addColorStop(0, colorAccent);
        streakGrad.addColorStop(0.3, colorPrimary);
        streakGrad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = streakGrad;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = Math.max(0, star.alpha);
        ctx.stroke();

        if (star.life >= star.maxLife || star.x > width + 100 || star.y > height + 100) {
          shootingStars.splice(sIdx, 1);
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
      {/* LAYER 1: Deep Base Atmosphere */}
      <div className="absolute inset-0 bg-[#0B0F19]" />

      {/* LAYER 2: Slow Living Breathing Environment Wrapper */}
      <motion.div
        className="absolute inset-0"
        animate={reducedMotion ? {} : { scale: [1, 1.025, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* LAYER 3: Theme-Adaptive Aurora & Mesh Gradients */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute top-[-20%] left-[-15%] w-[85vw] h-[85vw] rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-[160px] animate-aurora" />
          <div className="absolute bottom-[-20%] right-[-15%] w-[75vw] h-[75vw] rounded-full bg-gradient-to-br from-accent/25 via-primary/20 to-transparent blur-[170px] animate-aurora [animation-delay:8s]" />
          <div className="absolute top-[35%] left-[25%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-secondary/20 via-accent/15 to-transparent blur-[150px] animate-pulse-glow" />
        </div>

        {/* LAYER 4: Rotating Volumetric Light Beams */}
        {!reducedMotion && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <motion.div
              className="absolute top-[-20%] left-[10%] w-[150%] h-[400px] bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-[80px]"
              animate={{ rotate: [-12, 12, -12] }}
              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-[40%] left-[-20%] w-[150%] h-[350px] bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-[90px]"
              animate={{ rotate: [12, -12, 12] }}
              transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* LAYER 5: Slowly Orbiting Ambient Light Sources */}
        {!reducedMotion && (
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/30 to-accent/20 blur-[140px]"
              animate={{
                x: [0, 140, -140, 0],
                y: [0, -90, 90, 0],
              }}
              transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: "15%", left: "10%" }}
            />
            <motion.div
              className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-secondary/30 to-primary/20 blur-[140px]"
              animate={{
                x: [0, -120, 120, 0],
                y: [0, 100, -100, 0],
              }}
              transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
              style={{ bottom: "20%", right: "15%" }}
            />
          </div>
        )}

        {/* LAYER 6: Realistic Organic Floating Light Bubbles */}
        {!reducedMotion && (
          <div className="absolute inset-0 opacity-55 mix-blend-screen">
            {bubbles.map((b) => (
              <motion.div
                key={b.id}
                className={`absolute rounded-full bg-gradient-to-br ${b.colorClass} ${b.blurClass}`}
                style={{
                  left: `${b.left}%`,
                  width: b.size,
                  height: b.size,
                  bottom: -320,
                }}
                animate={{
                  y: [0, -window.innerHeight - 600],
                  x: [0, (b.id % 2 === 0 ? 70 : -70), (b.id % 3 === 0 ? -50 : 50), 0],
                  scale: [0.8, 1.25, 0.8],
                  opacity: [0, b.maxOpacity, b.maxOpacity, 0],
                }}
                transition={{
                  duration: b.duration,
                  repeat: Infinity,
                  delay: b.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* LAYER 7: Multi-Depth Particle, Constellation & Shooting Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />

      {/* LAYER 8: Soft Interactive Mouse Spotlight Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/15 via-accent/10 to-transparent blur-[120px] pointer-events-none mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* LAYER 9: Tactile Noise Texture Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-25 mix-blend-overlay" />
    </div>
  );
}
