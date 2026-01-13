"use client";

import { useEffect, useRef } from "react";

type MethodType = "bisezione" | "secanti" | "newton";

interface RootFindingVisualizerProps {
  method: MethodType;
  width?: number;
  height?: number;
}

// Example function: f(x) = x² - 2 (root at √2 ≈ 1.414)
const f = (x: number) => x * x - 2;
const df = (x: number) => 2 * x;
const ROOT = Math.sqrt(2);

// Single step visualization for secanti method
function SecantStepCanvas({
  step,
  width,
  height,
}: {
  step: number;
  width: number;
  height: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Define view bounds
    const xMin = 0.5, xMax = 2.3;
    const yMin = -1.5, yMax = 2.5;

    const padding = { left: 30, right: 15, top: 20, bottom: 25 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    const toCanvasX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
    const toCanvasY = (y: number) => padding.top + ((yMax - y) / (yMax - yMin)) * plotHeight;

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;

    for (let x = 1; x <= 2; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), padding.top);
      ctx.lineTo(toCanvasX(x), height - padding.bottom);
      ctx.stroke();
    }

    for (let y = -1; y <= 2; y += 1) {
      ctx.beginPath();
      ctx.moveTo(padding.left, toCanvasY(y));
      ctx.lineTo(width - padding.right, toCanvasY(y));
      ctx.stroke();
    }

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 1;

    const y0 = toCanvasY(0);
    ctx.moveTo(padding.left, y0);
    ctx.lineTo(width - padding.right, y0);
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();

    // Axis labels
    ctx.font = "8px sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "center";
    ctx.fillText("1", toCanvasX(1), height - 8);
    ctx.fillText("2", toCanvasX(2), height - 8);

    // Draw function curve
    ctx.beginPath();
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 1.5;

    for (let px = 0; px <= plotWidth; px++) {
      const x = xMin + (px / plotWidth) * (xMax - xMin);
      const y = f(x);
      const canvasX = toCanvasX(x);
      const canvasY = toCanvasY(y);

      if (px === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();

    // Calculate secant iterations
    let x0 = 1, x1 = 2;
    const iterations: { x0: number; x1: number; x2: number }[] = [];

    for (let i = 0; i < 3; i++) {
      const fx0 = f(x0), fx1 = f(x1);
      const x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0);
      iterations.push({ x0, x1, x2 });
      x0 = x1;
      x1 = x2;
    }

    const color = { main: "#16a34a", light: "#86efac", dark: "#15803d" };
    const currentIter = iterations[step];

    // Draw previous points (grayed out)
    for (let i = 0; i < step; i++) {
      const iter = iterations[i];
      ctx.beginPath();
      ctx.fillStyle = "#d1d5db";
      ctx.arc(toCanvasX(iter.x0), toCanvasY(f(iter.x0)), 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(toCanvasX(iter.x1), toCanvasY(f(iter.x1)), 3, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw secant line for current step
    const p1 = { x: currentIter.x0, y: f(currentIter.x0) };
    const p2 = { x: currentIter.x1, y: f(currentIter.x1) };

    // Extend the secant line
    const slope = (p2.y - p1.y) / (p2.x - p1.x);
    const lineXMin = Math.max(xMin, currentIter.x2 - 0.1);
    const lineXMax = Math.min(xMax, p2.x + 0.3);
    const lineYMin = p1.y + slope * (lineXMin - p1.x);
    const lineYMax = p1.y + slope * (lineXMax - p1.x);

    ctx.beginPath();
    ctx.strokeStyle = color.light;
    ctx.lineWidth = 2;
    ctx.moveTo(toCanvasX(lineXMin), toCanvasY(lineYMin));
    ctx.lineTo(toCanvasX(lineXMax), toCanvasY(lineYMax));
    ctx.stroke();

    // Draw points on curve
    ctx.beginPath();
    ctx.fillStyle = color.main;
    ctx.arc(toCanvasX(p1.x), toCanvasY(p1.y), 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = color.main;
    ctx.arc(toCanvasX(p2.x), toCanvasY(p2.y), 5, 0, 2 * Math.PI);
    ctx.fill();

    // Vertical dashed line to x2
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = color.dark;
    ctx.lineWidth = 1;
    ctx.moveTo(toCanvasX(currentIter.x2), y0);
    ctx.lineTo(toCanvasX(currentIter.x2), toCanvasY(0) - 8);
    ctx.stroke();
    ctx.setLineDash([]);

    // New point on x-axis
    ctx.beginPath();
    ctx.fillStyle = color.dark;
    ctx.arc(toCanvasX(currentIter.x2), y0, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Labels
    ctx.font = "bold 9px sans-serif";
    ctx.fillStyle = color.main;
    ctx.textAlign = "center";

    const labels = ["x₀", "x₁", "x₂", "x₃"];
    ctx.fillText(labels[step], toCanvasX(p1.x), y0 + 12);
    ctx.fillText(labels[step + 1], toCanvasX(p2.x), y0 + 12);

    ctx.fillStyle = color.dark;
    ctx.fillText(labels[step + 2], toCanvasX(currentIter.x2), y0 + 12);

    // Mark root
    ctx.beginPath();
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.moveTo(toCanvasX(ROOT), y0 - 4);
    ctx.lineTo(toCanvasX(ROOT), y0 + 4);
    ctx.stroke();
    ctx.setLineDash([]);

    // Step title
    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.textAlign = "left";
    ctx.fillText(`Passo ${step + 1}`, padding.left + 5, padding.top + 12);

  }, [step, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ background: "white", borderRadius: "4px", border: "1px solid #e5e7eb" }}
    />
  );
}

export function RootFindingVisualizer({
  method,
  width = 650,
  height = 170,
}: RootFindingVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // For secanti, show 3 step-by-step charts
  if (method === "secanti") {
    const stepWidth = Math.floor((width - 20) / 3);
    const stepHeight = height - 30;

    return (
      <div className="root-finding-visualizer" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          padding: "6px",
          background: "#f9fafb",
          borderRadius: "4px",
          border: "1px solid #e5e7eb",
          maxWidth: "100%",
          overflow: "hidden"
        }}>
          <SecantStepCanvas step={0} width={stepWidth} height={stepHeight} />
          <SecantStepCanvas step={1} width={stepWidth} height={stepHeight} />
          <SecantStepCanvas step={2} width={stepWidth} height={stepHeight} />
        </div>
        <div style={{
          fontSize: "10px",
          color: "#6b7280",
          textAlign: "center",
          padding: "3px 6px",
          background: "#f0fdf4",
          borderRadius: "3px",
          border: "1px solid #bbf7d0"
        }}>
          <strong style={{ color: "#15803d" }}>Metodo delle Secanti:</strong> La retta per (x<sub>n-1</sub>, f(x<sub>n-1</sub>)) e (x<sub>n</sub>, f(x<sub>n</sub>)) interseca l&apos;asse x in x<sub>n+1</sub>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Define view bounds
    const xMin = 0.5, xMax = 2.5;
    const yMin = -1.5, yMax = 2.5;

    const padding = { left: 35, right: 20, top: 15, bottom: 25 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    const toCanvasX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
    const toCanvasY = (y: number) => padding.top + ((yMax - y) / (yMax - yMin)) * plotHeight;

    // Draw light grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;

    for (let x = 0.5; x <= 2.5; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), padding.top);
      ctx.lineTo(toCanvasX(x), height - padding.bottom);
      ctx.stroke();
    }

    for (let y = -1; y <= 2; y += 1) {
      ctx.beginPath();
      ctx.moveTo(padding.left, toCanvasY(y));
      ctx.lineTo(width - padding.right, toCanvasY(y));
      ctx.stroke();
    }

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 1.5;

    const y0 = toCanvasY(0);
    ctx.moveTo(padding.left, y0);
    ctx.lineTo(width - padding.right, y0);
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();

    // Axis labels
    ctx.font = "9pt sans-serif";
    ctx.fillStyle = "#374151";
    ctx.textAlign = "center";
    ctx.fillText("1", toCanvasX(1), height - 8);
    ctx.fillText("2", toCanvasX(2), height - 8);
    ctx.textAlign = "right";
    ctx.fillText("0", padding.left - 5, y0 + 4);
    ctx.fillText("2", padding.left - 5, toCanvasY(2) + 4);
    ctx.fillText("-1", padding.left - 5, toCanvasY(-1) + 4);

    // Draw function curve
    ctx.beginPath();
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 2;

    for (let px = 0; px <= plotWidth; px++) {
      const x = xMin + (px / plotWidth) * (xMax - xMin);
      const y = f(x);
      const canvasX = toCanvasX(x);
      const canvasY = toCanvasY(y);

      if (px === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();

    // Label the function
    ctx.font = "bold 10pt sans-serif";
    ctx.fillStyle = "#374151";
    ctx.textAlign = "left";
    ctx.fillText("f(x) = x² − 2", toCanvasX(2.0), toCanvasY(2.0));

    // Colors
    const colors = {
      bisezione: { main: "#2563eb", light: "#93c5fd", dark: "#1d4ed8" },
      newton: { main: "#dc2626", light: "#fca5a5", dark: "#b91c1c" },
    };
    const color = colors[method as "bisezione" | "newton"];

    if (method === "bisezione") {
      // Show iterations below the chart
      const iterations = [
        { a: 1, b: 2, c: 1.5, label: "1" },
        { a: 1, b: 1.5, c: 1.25, label: "2" },
        { a: 1.25, b: 1.5, c: 1.375, label: "3" },
        { a: 1.375, b: 1.5, c: 1.4375, label: "4" },
      ];

      // Draw iterations below x-axis
      iterations.forEach((iter, i) => {
        const yOffset = y0 + 12 + i * 14;

        ctx.strokeStyle = color.main;
        ctx.fillStyle = color.main;
        ctx.globalAlpha = 0.5 + (i / iterations.length) * 0.5;
        ctx.lineWidth = 3;

        // Interval line
        ctx.beginPath();
        ctx.moveTo(toCanvasX(iter.a), yOffset);
        ctx.lineTo(toCanvasX(iter.b), yOffset);
        ctx.stroke();

        // Bracket ends
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(iter.a), yOffset - 4);
        ctx.lineTo(toCanvasX(iter.a), yOffset + 4);
        ctx.moveTo(toCanvasX(iter.b), yOffset - 4);
        ctx.lineTo(toCanvasX(iter.b), yOffset + 4);
        ctx.stroke();

        // Midpoint
        ctx.beginPath();
        ctx.arc(toCanvasX(iter.c), yOffset, 3, 0, 2 * Math.PI);
        ctx.fill();

        // Label
        ctx.globalAlpha = 1;
        ctx.font = "8pt sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`n=${iter.label}: [${iter.a}, ${iter.b}]`, toCanvasX(iter.b) + 12, yOffset + 3);
      });

      ctx.globalAlpha = 1;

      // Vertical line from final c to curve
      const lastIter = iterations[iterations.length - 1];
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = color.main;
      ctx.lineWidth = 1.5;
      ctx.moveTo(toCanvasX(lastIter.c), y0 + 12 + (iterations.length - 1) * 14);
      ctx.lineTo(toCanvasX(lastIter.c), toCanvasY(f(lastIter.c)));
      ctx.stroke();
      ctx.setLineDash([]);

      // Point on curve
      ctx.beginPath();
      ctx.fillStyle = color.dark;
      ctx.arc(toCanvasX(lastIter.c), toCanvasY(f(lastIter.c)), 5, 0, 2 * Math.PI);
      ctx.fill();

      // Labels for a and b
      ctx.font = "bold 10pt sans-serif";
      ctx.fillStyle = color.main;
      ctx.textAlign = "center";
      ctx.fillText("a", toCanvasX(1), y0 - 8);
      ctx.fillText("b", toCanvasX(2), y0 - 8);

    } else if (method === "newton") {
      let x = 2;
      const points: { x: number; y: number; xNext: number }[] = [];

      for (let i = 0; i < 4; i++) {
        const y = f(x);
        const xNext = x - y / df(x);
        points.push({ x, y, xNext });
        x = xNext;
      }

      // Draw tangent lines
      points.forEach((p, i) => {
        ctx.globalAlpha = 0.4 + (i / points.length) * 0.6;

        // Tangent line
        ctx.beginPath();
        ctx.strokeStyle = color.light;
        ctx.lineWidth = 2;

        // Extend tangent
        const slope = df(p.x);
        const xExtend = p.x + 0.4;
        const yExtend = p.y + slope * 0.4;

        ctx.moveTo(toCanvasX(xExtend), toCanvasY(yExtend));
        ctx.lineTo(toCanvasX(p.xNext), y0);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;

      // Draw points and labels
      points.forEach((p, i) => {
        // Point on curve
        ctx.beginPath();
        ctx.fillStyle = color.main;
        ctx.arc(toCanvasX(p.x), toCanvasY(p.y), 5, 0, 2 * Math.PI);
        ctx.fill();

        // Vertical dashed line
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = color.main;
        ctx.lineWidth = 1;
        ctx.moveTo(toCanvasX(p.x), y0);
        ctx.lineTo(toCanvasX(p.x), toCanvasY(p.y));
        ctx.stroke();
        ctx.setLineDash([]);

        // Point on x-axis
        ctx.beginPath();
        ctx.fillStyle = color.main;
        ctx.arc(toCanvasX(p.x), y0, 3, 0, 2 * Math.PI);
        ctx.fill();

        // Labels
        ctx.font = "bold 9pt sans-serif";
        ctx.fillStyle = color.main;
        ctx.textAlign = "center";
        const labels = ["x₀", "x₁", "x₂", "x₃"];
        ctx.fillText(labels[i], toCanvasX(p.x), y0 + 14);
      });

      // Final point
      const lastP = points[points.length - 1];
      ctx.beginPath();
      ctx.fillStyle = color.dark;
      ctx.arc(toCanvasX(lastP.xNext), y0, 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = "bold 9pt sans-serif";
      ctx.fillStyle = color.dark;
      ctx.textAlign = "center";
      ctx.fillText("x₄ ≈ √2", toCanvasX(lastP.xNext), y0 + 14);

      // Legend - positioned in top right with background
      const legendX = width - 145;
      const legendY = padding.top + 5;

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillRect(legendX - 5, legendY - 3, 130, 36);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.strokeRect(legendX - 5, legendY - 3, 130, 36);

      ctx.font = "9pt sans-serif";
      ctx.fillStyle = "#374151";
      ctx.textAlign = "left";
      ctx.fillText("Tangente in (xₙ, f(xₙ))", legendX, legendY + 10);
      ctx.fillText("interseca asse x in xₙ₊₁", legendX, legendY + 25);
    }

    // Mark the actual root
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.moveTo(toCanvasX(ROOT), y0 - 6);
    ctx.lineTo(toCanvasX(ROOT), y0 + 6);
    ctx.stroke();

    ctx.font = "bold 9pt sans-serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("ξ = √2", toCanvasX(ROOT), y0 - 10);

  }, [method, width, height]);

  return (
    <div className="root-finding-visualizer">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
