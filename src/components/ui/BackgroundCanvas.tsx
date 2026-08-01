"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function createSoftDotTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.35, "rgba(255, 255, 255, 0.5)");
    grad.addColorStop(0.7, "rgba(255, 255, 255, 0.12)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

export function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);
    if (prefersReduced) return;

    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.06);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- 2. SOFT ELEGANT COLOR PALETTE (Matching Image: Soft Emerald, Cyan, Cobalt, Teal) ---
    const colorEmerald = new THREE.Color("#10B981");
    const colorCyan = new THREE.Color("#00D4FF");
    const colorCobalt = new THREE.Color("#3B82F6");
    const colorTeal = new THREE.Color("#14B8A6");

    const palette = [colorEmerald, colorCyan, colorCobalt, colorTeal];

    // --- 3. SOFT GLOWING PARTICLES (Low Brightness, Soft Radial Glow) ---
    const particleCount = window.innerWidth < 768 ? 350 : 1100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r * 0.75; // Soften color intensity
      colors[i * 3 + 1] = color.g * 0.75;
      colors[i * 3 + 2] = color.b * 0.75;

      sizes[i] = Math.random() * 0.18 + 0.06;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const dotTexture = createSoftDotTexture();

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.18,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.48, // Dim, subtle, non-distracting opacity
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, pointsMaterial);
    scene.add(particleSystem);

    // --- 4. INTERACTIVE MOUSE & SLOW ELEGANT DRIFT LOOP ---
    const mouseTarget = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      if (!isTabActive) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Subtle slow wave & drift motion
      const pos = particleSystem.geometry.attributes.position.array as Float32Array;
      const orig = originalPositions;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = orig[i3];
        const oy = orig[i3 + 1];

        pos[i3 + 2] = orig[i3 + 2] + Math.sin(ox * 0.4 + elapsedTime * 0.6) * 0.25;
        pos[i3 + 1] = oy + Math.sin(ox * 0.3 + elapsedTime * 0.4) * 0.15;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Slow 3D Parallax Camera Tilt
      camera.position.x += (mouseTarget.x * 0.4 - camera.position.x) * 0.03;
      camera.position.y += (mouseTarget.y * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#060913] select-none">
      {/* Deep Dark Atmosphere Background */}
      <div className="absolute inset-0 bg-[#060913]" />

      {/* THREE.JS SOFT GLOWING PARTICLES CANVAS */}
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full opacity-90 pointer-events-none" />
    </div>
  );
}
