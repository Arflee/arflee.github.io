"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { OrbitControls } from "@react-three/drei";
import BusinessCardScene from "@/components/businessCardScene";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import * as THREE from "three";

interface Star {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
  drift: number;
}

interface Project {
  title: string;
  description: string;
  color: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: "Nebula UI",
    description:
      "Design system built for the cosmos. 80+ components, fully accessible.",
    color: "#1a1a2e",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    title: "Orbit API",
    description:
      "High-performance REST & GraphQL gateway handling 10M+ requests/day.",
    color: "#16213e",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    title: "Stellar ML",
    description:
      "Real-time anomaly detection pipeline for financial data streams.",
    color: "#0f3460",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Void Store",
    description:
      "E-commerce experience with 3D product previews and AR try-on.",
    color: "#1a1a2e",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    title: "Pulsar Chat",
    description: "End-to-end encrypted messaging with ephemeral rooms.",
    color: "#16213e",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  },
  {
    title: "Quasar Maps",
    description: "Geospatial analytics dashboard with heatmap & clustering.",
    color: "#0f3460",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
  },
];

// ─── FALLING STARS ───────────────────────────────────────────────────────────

function FallingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed stars
    starsRef.current = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 2 - window.innerHeight,
      speed: 0.3 + Math.random() * 1.2,
      opacity: 0.2 + Math.random() * 0.8,
      size: 0.5 + Math.random() * 2,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((s) => {
        s.y += s.speed;
        s.x += s.drift;
        if (s.y > canvas.height + 10) {
          s.y = -10;
          s.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();

        // Tiny sparkle cross on larger stars
        if (s.size > 1.4) {
          ctx.strokeStyle = `rgba(255,255,255,${s.opacity * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - s.size * 2, s.y);
          ctx.lineTo(s.x + s.size * 2, s.y);
          ctx.moveTo(s.x, s.y - s.size * 2);
          ctx.lineTo(s.x, s.y + s.size * 2);
          ctx.stroke();
        }
      });
      animRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance (replaces whileInView)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "-60px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <Card
        isPressable
        isHoverable
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative aspect-[4/3] bg-[#080808] overflow-hidden rounded-xl shadow-none"
        radius="lg"
      >
        <CardBody className="p-0 overflow-hidden">
          <Image
            as={NextImage}
            width="0"
            height="0"
            src={project.image}
            alt={project.title}
            removeWrapper
            className="w-full h-full object-cover block transition-transform duration-700 ease-out"
            style={{
              transform: hovered ? "scale(1.07)" : "scale(1)",
              width: "100%",
              height: "auto",
            }}
          />

          {/* Bottom gradient + title — always visible */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pt-10 pb-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10">
            <p className="text-xl font-semibold text-white tracking-wide leading-tight">
              {project.title}
            </p>
          </div>

          <div
            className="absolute inset-0 flex flex-col justify-center gap-3 p-7 backdrop-blur-md z-20 transition-opacity duration-250"
            style={{
              opacity: hovered ? 1 : 0,
              background: "rgba(0,0,0,0.82)",
              pointerEvents: hovered ? "auto" : "none",
            }}
          >
            <p className="text-xl font-bold text-white tracking-wide">
              {project.title}
            </p>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              {project.description}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        <BusinessCardScene />
      </Canvas>
    </div>
  );
}
