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

  // Mouse spotlight spring physics with ultra-smooth easing
  const mouseX = useMotionValue(-800);
  const mouseY = useMotionValue(-800);
  const springX = useSpring(mouseX, { damping: 45, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 120 });

  // 1. Generate Organic Bubbles with unique sizes, blurs, and paths
  useEffect(() => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);

    const count = mobileCheck ? 10 : 28;
    const blurClasses = ["blur-md", "blur-lg", "blur-xl", "blur-2xl"];
    const colorClasses = [
      "from-primary/25 via-secondary/15 to-transparent",
      "from-secondary/25 via-accent/15 to-transparent",
      "from-accent/20 via-primary/15 to-transparent",
      "from-primary/20 via-accent/10 to-transparent",
    ];

    const generated: BubbleData[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i * (100 / count) + Math.random() * 10) % 95,
      size: Math.random() * 160 + 90, // 90px - 250px
      duration: Math.random() * 18 + 22, // 22s - 40s
      delay: Math.random() * 12,
      blurClass: blurClasses[i % blurClasses.length],
      maxOpacity: Math.random() * 0.45 + 0.25,
      colorClass: colorClasses[i % colorClasses.length],
    }));

    setBubbles(generated);
  }, []);

  // 2. Multi-Depth Canvas Particle Field & Shooting Stars System
  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic theme color sampling
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

    // Multi-depth particle generation: 3 layers (Background, Midground, Foreground)
    const particleCount = isMobile ? 80 : 280;
    const particles = Array.from({ length: particleCount }, (_, idx) => {
      // Depth layer assignment: 0 = Deep Background (small, slow), 1 = Midground, 2 = Foreground (larger, faster)
      const depth = idx < particleCount * 0.5 ? 0 : idx < particleCount * 0.85 ? 1 : 2;

      const size = depth === 0 ? Math.random() * 1.2 + 0.4 : depth === 1 ? Math.random() * 2 + 1 : Math.random() * 3 + 1.8;
      const speedMult = depth === 0 ? 0.08 : depth === 1 ? 0.2 : 0.4;
      const baseAlpha = depth === 0 ? Math.random() * 0.4 + 0.1 : depth === 1 ? Math.random() * 0.6 + 0.2 : Math.random() * 0.75 + 0.35;

      // Clustered organic distribution band
      const isClustered = Math.random() > 0.4;
      const clusterCenterY = height * 0.45;
      const y = isClustered
        ? clusterCenterY + (Math.random() - 0.5) * height * 0.6
        : Math.random() * height;

      return {
        x: Math.random() * width,
        y: y,
        vx: (Math.random() - 0.5) * speedMult,
        vy: (Math.random() - 0.5) * speedMult,
        size,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: Math.random() * 0.012 + 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        depth,
        sineOffset: Math.random() * Math.PI * 2,
      };
    });

    // Shooting Stars Queue
    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Math.random() * 400 + 300; // frames till next streak

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

      // --- A. Render Multi-Depth Particles ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic sway using sine wave on x position
        p.x += p.vx + Math.sin(time * 0.5 + p.sineOffset) * 0.05;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Twinkle oscillation
        p.alpha =
          p.baseAlpha +
          Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase) * (p.baseAlpha * 0.45);

        // Render particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, p.alpha));
        ctx.fill();

        // Foreground particles get soft blur glow
        if (p.depth === 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.12;
          ctx.fill();
        }
      }

      // --- B. Render Occasional Shooting Stars / Light Streaks ---
      nextShootingStarTime--;
      if (nextShootingStarTime <= 0 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.5,
          length: Math.random() * 120 + 80,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg
          alpha: 0,
          maxAlpha: Math.random() * 0.4 + 0.3,
          life: 0,
          maxLife: Math.random() * 35 + 25,
        });
        nextShootingStarTime = Math.random() * 500 + 400; // 7-12 seconds
      }

      for (let sIdx = shootingStars.length - 1; sIdx >= 0; sIdx--) {
        const star = shootingStars[sIdx];
        star.life++;
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Fade in and fade out
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
        ctx.lineWidth = 1.6;
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
      {/* LAYER 1: Base Dark Atmosphere */}
      <div className="absolute inset-0 bg-[#0B0F19]" />

      {/* LAYER 2: Slow Breathing Background Motion Wrapper */}
      <motion.div
        className="absolute inset-0"
        animate={reducedMotion ? {} : { scale: [1, 1.02, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* LAYER 3: Dynamic Theme Aurora Mesh Gradients */}
        <div className="absolute inset-0 opacity-35 mix-blend-screen">
          <div className="absolute top-[-20%] left-[-15%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-[160px] animate-aurora" />
          <div className="absolute bottom-[-20%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-accent/25 via-primary/20 to-transparent blur-[170px] animate-aurora [animation-delay:8s]" />
          <div className="absolute top-[40%] left-[30%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-r from-secondary/20 via-accent/15 to-transparent blur-[150px] animate-pulse-glow" />
        </div>

        {/* LAYER 4: Slowly Orbiting Ambient Light Sources */}
        {!reducedMotion && (
          <div className="absolute inset-0 opacity-25">
            <motion.div
              className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-primary/30 to-accent/20 blur-[130px]"
              animate={{
                x: [0, 120, -120, 0],
                y: [0, -80, 80, 0],
              }}
              transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: "20%", left: "15%" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-secondary/30 to-primary/20 blur-[130px]"
              animate={{
                x: [0, -100, 100, 0],
                y: [0, 90, -90, 0],
              }}
              transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
              style={{ bottom: "25%", right: "20%" }}
            />
          </div>
        )}

        {/* LAYER 5: Realistic Organic Floating Light Bubbles */}
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
                  bottom: -300,
                }}
                animate={{
                  y: [0, -window.innerHeight - 500],
                  x: [0, (b.id % 2 === 0 ? 60 : -60), (b.id % 3 === 0 ? -40 : 40), 0],
                  scale: [0.85, 1.2, 0.85],
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

      {/* LAYER 6: Multi-Depth Particle & Shooting Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />

      {/* LAYER 7: Soft Eased Mouse Spotlight Glow */}
      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full bg-gradient-to-r from-primary/15 via-accent/10 to-transparent blur-[110px] pointer-events-none mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* LAYER 8: Tactile Noise Texture Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-25 mix-blend-overlay" />
    </div>
  );
}
