"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse spring for spotlight & 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 45, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 120 });

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
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.08);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- 2. DYNAMIC THEME COLORS ---
    const computedStyle = getComputedStyle(document.documentElement);
    const colorPrimaryHex = computedStyle.getPropertyValue("--primary").trim() || "#4F8CFF";
    const colorSecondaryHex = computedStyle.getPropertyValue("--secondary").trim() || "#7B61FF";
    const colorAccentHex = computedStyle.getPropertyValue("--accent").trim() || "#00D4FF";

    const colorPrimary = new THREE.Color(colorPrimaryHex);
    const colorSecondary = new THREE.Color(colorSecondaryHex);
    const colorAccent = new THREE.Color(colorAccentHex);

    // --- 3. 3D PARTICLE CLOUD (1,200 Vertices in 3D Space) ---
    const particleCount = window.innerWidth < 768 ? 400 : 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const palette = [colorPrimary, colorSecondary, colorAccent, new THREE.Color(0xffffff)];

    for (let i = 0; i < particleCount; i++) {
      // Clustered 3D distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 12;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      scales[i] = Math.random() * 0.15 + 0.05;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Custom Shading Points Material
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, pointsMaterial);
    scene.add(particleSystem);

    // --- 4. FLOATING 3D LIGHT ORBS & SHADER SPHERES ---
    const orbGroup = new THREE.Group();
    const orbGeom = new THREE.SphereGeometry(0.8, 32, 32);

    const createOrb = (color: THREE.Color, x: number, y: number, z: number) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.25,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(orbGeom, mat);
      mesh.position.set(x, y, z);
      orbGroup.add(mesh);
      return mesh;
    };

    const orb1 = createOrb(colorPrimary, -3.5, 2, -2);
    const orb2 = createOrb(colorSecondary, 3.5, -2, -3);
    const orb3 = createOrb(colorAccent, 0, -3, -1);
    scene.add(orbGroup);

    // --- 5. INTERACTIVE MOUSE & ANIMATION LOOP ---
    let mouseTargetX = 0;
    let mouseTargetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseTargetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTargetY = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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

    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      if (!isTabActive) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // 3D Particle Cloud Motion & Wave
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = elapsedTime * 0.015;

      const pos = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3 + 1] += Math.sin(elapsedTime * 0.8 + pos[i3]) * 0.002;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Floating 3D Orbs Rotation & Oscillation
      orb1.position.y = 2 + Math.sin(elapsedTime * 0.5) * 0.5;
      orb1.rotation.y = elapsedTime * 0.2;

      orb2.position.y = -2 + Math.cos(elapsedTime * 0.6) * 0.5;
      orb2.rotation.x = elapsedTime * 0.25;

      orb3.position.x = Math.sin(elapsedTime * 0.4) * 1.5;
      orb3.rotation.z = elapsedTime * 0.15;

      // Smooth Camera Parallax Tilt
      camera.position.x += (mouseTargetX * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (mouseTargetY * 0.8 - camera.position.y) * 0.04;
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
  }, [reducedMotion, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#0B0F19] select-none">
      {/* 1. Base Dark Background */}
      <div className="absolute inset-0 bg-[#0B0F19]" />

      {/* 2. Three.js WebGL 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* 3. CSS Aurora Gradient Layer */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-20%] left-[-15%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-[160px] animate-aurora" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-accent/25 via-primary/20 to-transparent blur-[170px] animate-aurora [animation-delay:8s]" />
      </div>

      {/* 4. Interactive Eased Mouse Spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/15 via-accent/10 to-transparent blur-[120px] pointer-events-none mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 5. Tactile Noise Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-25 mix-blend-overlay" />
    </div>
  );
}
