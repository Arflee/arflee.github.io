"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BusinessCard from "@/components/businessCard";
import { AnimatePresence, motion } from "framer-motion";

// ─── TYPES ──────────────────────────────────────────────────────────────────

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

// ─── DATA ────────────────────────────────────────────────────────────────────

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-60px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "4/3",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#080808",
      }}
    >
      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Always-visible bottom gradient with title */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "32px 20px 18px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "0.04em",
          }}
        >
          {project.title}
        </p>
      </div>

      {/* Hover overlay with details */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "28px",
              gap: "12px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.04em",
              }}
            >
              {project.title}
            </p>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ borderRadius: "16px" }}
      >
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#ffffff"
        />
        <BusinessCard />
      </Canvas>

      <h2>Projects</h2>

      <div className="grid gap-5 grid-cols-4">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
