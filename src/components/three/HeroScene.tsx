'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/* Animated "code editor" texture drawn on a canvas                    */
/* ------------------------------------------------------------------ */

const CODE_COLORS = ['#f59e0b', '#60a5fa', '#a78bfa', '#34d399', '#f472b6', '#e5e5e5'];

interface CodeLine {
  indent: number;
  tokens: { width: number; color: string }[];
}

function randomLine(): CodeLine {
  const indent = Math.floor(Math.random() * 4);
  const count = 2 + Math.floor(Math.random() * 4);
  const tokens = Array.from({ length: count }, () => ({
    width: 18 + Math.random() * 70,
    color: CODE_COLORS[Math.floor(Math.random() * CODE_COLORS.length)],
  }));
  return { indent, tokens };
}

function useCodeTexture(animate: boolean) {
  const state = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    const lines: CodeLine[] = Array.from({ length: 11 }, randomLine);
    return { canvas, ctx, texture, lines, progress: 0, last: 0 };
  }, []);

  const draw = (typingProgress: number) => {
    const { ctx, canvas, lines } = state;
    const w = canvas.width;
    const h = canvas.height;

    // Editor background
    ctx.fillStyle = '#0b0b0f';
    ctx.fillRect(0, 0, w, h);

    // Title bar
    ctx.fillStyle = '#15151b';
    ctx.fillRect(0, 0, w, 28);
    ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(16 + i * 18, 14, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(w / 2 - 60, 9, 120, 10);

    // Gutter
    ctx.fillStyle = '#101016';
    ctx.fillRect(0, 28, 40, h - 28);

    const lineH = 24;
    const top = 44;
    lines.forEach((line, i) => {
      const y = top + i * lineH;
      const isLast = i === lines.length - 1;

      // line number
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(14, y + 2, 14, 8);

      let x = 56 + line.indent * 22;
      let budget = isLast ? typingProgress : 1;
      line.tokens.forEach((t) => {
        if (budget <= 0) return;
        const visible = Math.min(1, budget);
        ctx.fillStyle = t.color;
        ctx.globalAlpha = 0.9;
        roundRect(ctx, x, y, t.width * visible, 10, 3);
        ctx.globalAlpha = 1;
        x += t.width + 10;
        budget -= 1 / line.tokens.length;
      });

      if (isLast) {
        // Blinking cursor
        const blink = Math.floor(performance.now() / 500) % 2 === 0;
        if (blink) {
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(x, y - 2, 2, 14);
        }
      }
    });

    // Status bar
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, h - 14, w, 14);
    ctx.fillStyle = '#0b0b0f';
    ctx.fillRect(12, h - 9, 60, 4);
    ctx.fillRect(w - 90, h - 9, 78, 4);

    state.texture.needsUpdate = true;
  };

  useFrame((_, delta) => {
    if (!animate) {
      if (state.last === 0) {
        draw(1);
        state.last = 1;
      }
      return;
    }
    state.progress += delta * 1.6;
    if (state.progress >= 1.25) {
      state.progress = 0;
      state.lines.shift();
      state.lines.push(randomLine());
    }
    draw(Math.min(1, state.progress));
  });

  return state.texture;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  if (w <= 0) return;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

/* ------------------------------------------------------------------ */
/* Laptop model                                                        */
/* ------------------------------------------------------------------ */

const W = 3.2; // base width
const D = 2.1; // base depth
const T = 0.1; // base thickness
const LID_H = 2.0;
const LID_T = 0.07;

interface Palette {
  body: string;
  keys: string;
  keyWell: string;
  trackpad: string;
  shadowOpacity: number;
}

interface LaptopProps {
  animate: boolean;
  palette: Palette;
  accent: string;
}

/** Soft radial shadow texture so the ground shadow fades out instead of ending in a hard disc */
function useShadowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(0.45, 'rgba(0,0,0,0.55)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function Laptop({ animate, palette, accent }: LaptopProps) {
  const shadowTexture = useShadowTexture();
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const keys = useRef<THREE.InstancedMesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const opened = useRef(0);
  const screenTexture = useCodeTexture(animate);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Lay out keyboard keys once
  useEffect(() => {
    if (!keys.current) return;
    const cols = 14;
    const rows = 5;
    const keyW = 0.17;
    const keyD = 0.17;
    const gap = 0.035;
    const totalW = cols * keyW + (cols - 1) * gap;
    const totalD = rows * keyD + (rows - 1) * gap;
    const m = new THREE.Matrix4();
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = -totalW / 2 + keyW / 2 + c * (keyW + gap);
        const z = -D / 2 + 0.32 + keyD / 2 + r * (keyD + gap) - 0.02;
        m.makeTranslation(x, T / 2 + 0.015, z);
        keys.current.setMatrixAt(i++, m);
      }
    }
    keys.current.instanceMatrix.needsUpdate = true;
    void totalD;
  }, []);

  useFrame((state, delta) => {
    if (!root.current || !lid.current) return;
    const t = state.clock.getElapsedTime();

    // Lid opens on mount (eased), closed = 0, open = 1
    const targetOpen = 1;
    opened.current += (targetOpen - opened.current) * Math.min(1, delta * 2.2);
    const openAngle = -Math.PI / 2 - 0.35; // ~110 degrees
    lid.current.rotation.x = openAngle * (animate ? opened.current : 1);

    if (animate) {
      root.current.position.y = -0.55 + Math.sin(t * 1.1) * 0.08;
      root.current.rotation.y = -0.45 + Math.sin(t * 0.35) * 0.18;
    } else {
      root.current.position.y = -0.55;
      root.current.rotation.y = -0.45;
    }

    // Parallax toward the pointer
    const tx = 0.12 + pointer.current.y * -0.12;
    const ty = root.current.rotation.y + pointer.current.x * 0.25;
    root.current.rotation.x += (tx - root.current.rotation.x) * 0.05;
    root.current.rotation.y += (ty - root.current.rotation.y) * 0.05;
  });

  const body = (
    <meshStandardMaterial color={palette.body} metalness={0.6} roughness={0.4} />
  );

  return (
    <group ref={root} position={[0, -0.55, 0]} rotation={[0.12, -0.45, 0]}>
      {/* Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, T, D]} />
        {body}
      </mesh>

      {/* Keyboard well */}
      <mesh position={[0, T / 2 + 0.002, -0.12]}>
        <boxGeometry args={[W - 0.3, 0.004, 1.1]} />
        <meshStandardMaterial color={palette.keyWell} metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Keys */}
      <instancedMesh ref={keys} args={[undefined, undefined, 70]}>
        <boxGeometry args={[0.17, 0.03, 0.17]} />
        <meshStandardMaterial color={palette.keys} metalness={0.2} roughness={0.7} />
      </instancedMesh>

      {/* Trackpad */}
      <mesh position={[0, T / 2 + 0.003, 0.62]}>
        <boxGeometry args={[1.0, 0.004, 0.62]} />
        <meshStandardMaterial color={palette.trackpad} metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Hinge */}
      <mesh position={[0, T / 2, -D / 2 + 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, W - 0.5, 16]} />
        <meshStandardMaterial color={palette.keyWell} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Lid, pivoting at the back edge */}
      <group ref={lid} position={[0, T / 2, -D / 2 + 0.05]}>
        <group position={[0, 0, LID_H / 2]}>
          {/* Lid shell */}
          <mesh castShadow>
            <boxGeometry args={[W, LID_T, LID_H]} />
            {body}
          </mesh>
          {/* Screen bezel */}
          <mesh position={[0, -LID_T / 2 - 0.002, 0]}>
            <boxGeometry args={[W - 0.16, 0.004, LID_H - 0.16]} />
            <meshStandardMaterial color="#0a0a0d" roughness={0.6} />
          </mesh>
          {/* Screen */}
          <mesh position={[0, -LID_T / 2 - 0.006, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[W - 0.32, LID_H - 0.32]} />
            <meshBasicMaterial map={screenTexture} toneMapped={false} />
          </mesh>
          {/* Screen glow */}
          <pointLight position={[0, -0.5, 0.2]} intensity={1.2} distance={3.5} color={accent} />
          {/* Logo on the back of the lid */}
          <mesh position={[0, LID_T / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.16, 32]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
          </mesh>
        </group>
      </group>

      {/* Soft ground shadow */}
      <mesh position={[0, -T / 2 - 0.02, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.4, 4.2]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          opacity={palette.shadowOpacity}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

export default function HeroScene() {
  const { resolvedTheme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const isDark = resolvedTheme !== 'light';

  const accent = '#f59e0b';
  const palette: Palette = isDark
    ? { body: '#4b4b55', keys: '#2a2a32', keyWell: '#111114', trackpad: '#3a3a44', shadowOpacity: 0.55 }
    : { body: '#c9cbd3', keys: '#3b3d47', keyWell: '#2a2b33', trackpad: '#b4b6bf', shadowOpacity: 0.28 };

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.6, 6.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ pointerEvents: 'none' }}
      onCreated={({ camera }) => camera.lookAt(0, 0.1, 0)}
      aria-hidden
    >
      <ambientLight intensity={isDark ? 1.1 : 1.4} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <directionalLight position={[-5, 3, -3]} intensity={0.9} color="#c7d2fe" />
      <hemisphereLight args={['#ffffff', '#3f3f46', 0.6]} />
      <Laptop animate={!reduced} palette={palette} accent={accent} />
    </Canvas>
  );
}
