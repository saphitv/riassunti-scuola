"use client";

import { useEffect, useRef, useState } from "react";
import { Math as MathComponent } from "./Math";

type CurveType =
  | "cicloide"
  | "astroide"
  | "cardioide"
  | "lemniscata";

interface CurveConfig {
  name: string;
  parametric: {
    x: (t: number, params?: Record<string, number>) => number;
    y: (t: number, params?: Record<string, number>) => number;
  };
  tRange: [number, number];
  formula: { x: string; y: string };
  description: string;
  defaultParams?: Record<string, number>;
}

const CURVES: Record<CurveType, CurveConfig> = {
  cicloide: {
    name: "Cicloide",
    parametric: {
      x: (t, p) => (p?.r ?? 1) * (t - Math.sin(t)),
      y: (t, p) => (p?.r ?? 1) * (1 - Math.cos(t)),
    },
    tRange: [0, 4 * Math.PI],
    formula: { x: "r(t - \\sin t)", y: "r(1 - \\cos t)" },
    description: "Curva tracciata da un punto su un cerchio che rotola",
    defaultParams: { r: 1 },
  },
  astroide: {
    name: "Astroide",
    parametric: {
      x: (t, p) => (p?.a ?? 1) * Math.pow(Math.cos(t), 3),
      y: (t, p) => (p?.a ?? 1) * Math.pow(Math.sin(t), 3),
    },
    tRange: [0, 2 * Math.PI],
    formula: { x: "a\\cos^3 t", y: "a\\sin^3 t" },
    description: "Ipocicloide con 4 cuspidi",
    defaultParams: { a: 1 },
  },
  cardioide: {
    name: "Cardioide",
    parametric: {
      x: (t, p) =>
        (p?.a ?? 1) * (2 * Math.cos(t) - Math.cos(2 * t)),
      y: (t, p) =>
        (p?.a ?? 1) * (2 * Math.sin(t) - Math.sin(2 * t)),
    },
    tRange: [0, 2 * Math.PI],
    formula: { x: "a(2\\cos t - \\cos 2t)", y: "a(2\\sin t - \\sin 2t)" },
    description: "Curva a forma di cuore",
    defaultParams: { a: 1 },
  },
  lemniscata: {
    name: "Lemniscata di Bernoulli",
    parametric: {
      x: (t, p) =>
        ((p?.a ?? 1) * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2)),
      y: (t, p) =>
        ((p?.a ?? 1) * Math.sin(t) * Math.cos(t)) /
        (1 + Math.pow(Math.sin(t), 2)),
    },
    tRange: [0, 2 * Math.PI],
    formula: {
      x: "\\frac{a\\cos t}{1 + \\sin^2 t}",
      y: "\\frac{a\\sin t \\cos t}{1 + \\sin^2 t}",
    },
    description: "Curva a forma di otto (∞)",
    defaultParams: { a: 1.5 },
  },
};

interface CurveVisualizerProps {
  type: CurveType;
  width?: number;
  height?: number;
  color?: string;
  animate?: boolean;
  showFormula?: boolean;
}

export function CurveVisualizer({
  type,
  width = 130,
  height = 90,
  color = "#3b82f6",
  animate = true,
  showFormula = true,
}: CurveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(animate ? 0 : 1);
  const [animationKey, setAnimationKey] = useState(0);
  const animationRef = useRef<number>(0);
  const curve = CURVES[type];

  useEffect(() => {
    if (!animate) {
      animationRef.current = requestAnimationFrame(() => {
        setProgress(1);
      });
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }

    let start: number | null = null;
    const duration = 2000; // 2 seconds

    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animateProgress);
      }
    };

    animationRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, type, animationKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate points
    const points: { x: number; y: number }[] = [];
    const [tMin, tMax] = curve.tRange;
    const tRange = tMax - tMin;
    const steps = 500;
    const currentTMax = tMin + tRange * progress;

    for (let i = 0; i <= steps * progress; i++) {
      const t = tMin + (i / steps) * tRange;
      if (t > currentTMax) break;
      points.push({
        x: curve.parametric.x(t, curve.defaultParams),
        y: curve.parametric.y(t, curve.defaultParams),
      });
    }

    if (points.length < 2) return;

    // Find bounds
    // Calculate full curve bounds for consistent scaling
    const allPoints: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = tMin + (i / steps) * tRange;
      allPoints.push({
        x: curve.parametric.x(t, curve.defaultParams),
        y: curve.parametric.y(t, curve.defaultParams),
      });
    }
    const allXs = allPoints.map((p) => p.x);
    const allYs = allPoints.map((p) => p.y);
    
    const minX = Math.min(...allXs);
    const maxX = Math.max(...allXs);
    const minY = Math.min(...allYs);
    const maxY = Math.max(...allYs);

    // Calculate scale and offset
    const padding = 20;
    const scaleX = (width - 2 * padding) / (maxX - minX || 1);
    const scaleY = (height - 2 * padding) / (maxY - minY || 1);
    const scale = Math.min(scaleX, scaleY);

    const offsetX = padding + ((width - 2 * padding) - (maxX - minX) * scale) / 2 - minX * scale;
    const offsetY = padding + ((height - 2 * padding) - (maxY - minY) * scale) / 2 - minY * scale;

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    
    // Draw axes if visible
    const originX = offsetX;
    const originY = height - offsetY;
    
    ctx.beginPath();
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    // X axis
    if (originY >= 0 && originY <= height) {
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
    }
    // Y axis
    if (originX >= 0 && originX <= width) {
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
    }
    ctx.stroke();

    // Draw curve
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    points.forEach((point, i) => {
      const canvasX = offsetX + point.x * scale;
      const canvasY = height - (offsetY + point.y * scale);
      if (i === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    });
    ctx.stroke();

    // Draw current point (animated dot)
    if (progress < 1 && points.length > 0) {
      const lastPoint = points[points.length - 1];
      const dotX = offsetX + lastPoint.x * scale;
      const dotY = height - (offsetY + lastPoint.y * scale);
      
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(dotX, dotY, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [curve, progress, width, height, color]);

  const styles = {
    visualizer: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "0.15rem",
      padding: "0.35rem",
      background: "#fafafa",
      borderRadius: "0.35rem",
      border: "1px solid #e5e7eb",
      minWidth: 0,
      flex: "1 1 0",
      maxWidth: `${width + 20}px`,
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontWeight: 600,
      fontSize: "0.65rem",
      textAlign: "center" as const,
      lineHeight: 1.1,
    },
    canvas: {
      background: "white",
      borderRadius: "0.2rem",
      cursor: animate ? "pointer" : "default",
    },
    formula: {
      fontSize: "0.5rem",
      color: "#6b7280",
      textAlign: "center" as const,
      lineHeight: 1.15,
    },
  };

  return (
    <div style={styles.visualizer}>
      <div style={styles.header}>
        <span style={styles.name}>{curve.name}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={styles.canvas}
        onClick={() => {
          if (animate) {
            setProgress(0);
            setAnimationKey((key) => key + 1);
          }
        }}
      />
      {showFormula && (
        <div style={styles.formula}>
          <MathComponent>{`x = ${curve.formula.x}`}</MathComponent>
          <br />
          <MathComponent>{`y = ${curve.formula.y}`}</MathComponent>
        </div>
      )}
    </div>
  );
}

export { CURVES };
export type { CurveType };
