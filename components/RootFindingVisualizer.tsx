"use client";

import { useEffect, useRef } from "react";

type MethodType = "bisezione" | "secanti" | "newton" | "punto-fisso";

interface RootFindingVisualizerProps {
  method: MethodType;
  width?: number;
  height?: number;
}

// Bisezione and Newton: f(x) = x² - 2 (root at √2 ≈ 1.414)
const f = (x: number) => x * x - 2;
const df = (x: number) => 2 * x;
const ROOT = Math.sqrt(2);

// Secant method: f(x) = 2cos(x) - x (root at ~1.03) - steeper vertical slopes
const fSecant = (x: number) => 2 * Math.cos(x) - x;
const ROOT_SECANT = 1.0298665293;

export function RootFindingVisualizer({
  method,
  width = 650,
  height: propHeight,
}: RootFindingVisualizerProps) {
  // Secanti needs more height to show the steep slopes clearly
  const height = propHeight ?? (method === "secanti" ? 320 : 170);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Colors
    const colors = {
      bisezione: { main: "#2563eb", light: "#93c5fd", dark: "#1d4ed8" },
      secanti: { main: "#16a34a", light: "#86efac", dark: "#15803d" },
      newton: { main: "#dc2626", light: "#fca5a5", dark: "#b91c1c" },
      "punto-fisso": { main: "#9333ea", light: "#c4b5fd", dark: "#7c3aed" },
    };
    const color = colors[method];

    if (method === "punto-fisso") {
      // Fixed-point iteration to find zero of f(x) = e^(-x) - x
      // The zero is where e^(-x) = x, i.e., fixed point of g(x) = e^(-x)
      // Fixed point at ξ ≈ 0.5671
      const fPunto = (x: number) => Math.exp(-x) - x;
      const g = (x: number) => Math.exp(-x);
      const FIXED_POINT = 0.5671432904;
      
      const xMin = -0.2, xMax = 2.0;
      const yMin = -0.8, yMax = 1.5;

      const padding = { left: 35, right: 20, top: 15, bottom: 25 };
      const plotWidth = width - padding.left - padding.right;
      const plotHeight = height - padding.top - padding.bottom;

      const toCanvasX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
      const toCanvasY = (y: number) => padding.top + ((yMax - y) / (yMax - yMin)) * plotHeight;

      // Draw light grid
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= 2; x += 0.5) {
        ctx.beginPath();
        ctx.moveTo(toCanvasX(x), padding.top);
        ctx.lineTo(toCanvasX(x), height - padding.bottom);
        ctx.stroke();
      }

      for (let y = -0.5; y <= 1.5; y += 0.5) {
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
      const x0 = toCanvasX(0);
      ctx.moveTo(padding.left, y0);
      ctx.lineTo(width - padding.right, y0);
      ctx.moveTo(x0, padding.top);
      ctx.lineTo(x0, height - padding.bottom);
      ctx.stroke();

      // Axis labels
      ctx.font = "9pt sans-serif";
      ctx.fillStyle = "#374151";
      ctx.textAlign = "center";
      ctx.fillText("0.5", toCanvasX(0.5), height - 8);
      ctx.fillText("1", toCanvasX(1), height - 8);
      ctx.fillText("1.5", toCanvasX(1.5), height - 8);
      ctx.textAlign = "right";
      ctx.fillText("0", x0 - 5, y0 + 12);
      ctx.fillText("1", padding.left - 5, toCanvasY(1) + 4);
      ctx.fillText("-0.5", padding.left - 5, toCanvasY(-0.5) + 4);

      // Draw g(x) = e^(-x) curve (dashed, light purple)
      ctx.beginPath();
      ctx.strokeStyle = color.light;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);

      for (let px = 0; px <= plotWidth; px++) {
        const x = xMin + (px / plotWidth) * (xMax - xMin);
        const y = g(x);
        const canvasX = toCanvasX(x);
        const canvasY = toCanvasY(y);

        if (canvasY < padding.top - 10 || canvasY > height - padding.bottom + 10) continue;

        if (px === 0) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Label g(x)
      ctx.font = "bold 9pt sans-serif";
      ctx.fillStyle = color.main;
      ctx.textAlign = "left";
      ctx.fillText("g(x) = e⁻ˣ", toCanvasX(0.02), toCanvasY(1.15));

      // Draw f(x) = e^(-x) - x curve (solid)
      ctx.beginPath();
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 2;

      let firstPoint = true;
      for (let px = 0; px <= plotWidth; px++) {
        const x = xMin + (px / plotWidth) * (xMax - xMin);
        const y = fPunto(x);
        const canvasX = toCanvasX(x);
        const canvasY = toCanvasY(y);

        if (canvasY < padding.top - 10 || canvasY > height - padding.bottom + 10) {
          firstPoint = true;
          continue;
        }

        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
      ctx.stroke();

      // Label the function f(x)
      ctx.font = "bold 10pt sans-serif";
      ctx.fillStyle = "#374151";
      ctx.textAlign = "left";
      ctx.fillText("f(x) = e⁻ˣ − x", toCanvasX(1.1), toCanvasY(0.45));

      // Calculate iterations starting from x₀ = 0
      const xValues: number[] = [0];
      for (let i = 0; i < 6; i++) {
        xValues.push(g(xValues[xValues.length - 1]));
      }
      // xValues ≈ [0, 1, 0.368, 0.692, 0.501, 0.606, 0.545, ...]

      // Draw iteration points and connecting lines
      const labels = ["x₀", "x₁", "x₂", "x₃", "x₄", "x₅"];
      
      xValues.slice(0, 6).forEach((xi, i) => {
        const yi = fPunto(xi);
        const gi = g(xi);
        
        // Point on f(x) curve
        ctx.beginPath();
        ctx.fillStyle = color.main;
        ctx.arc(toCanvasX(xi), toCanvasY(yi), 4, 0, 2 * Math.PI);
        ctx.fill();

        // Point on g(x) curve (shows where next x comes from)
        ctx.beginPath();
        ctx.fillStyle = color.light;
        ctx.arc(toCanvasX(xi), toCanvasY(gi), 4, 0, 2 * Math.PI);
        ctx.fill();

        // Vertical line connecting f(xi) to g(xi) - shows the iteration step
        ctx.beginPath();
        ctx.strokeStyle = color.main;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        ctx.moveTo(toCanvasX(xi), toCanvasY(yi));
        ctx.lineTo(toCanvasX(xi), toCanvasY(gi));
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Horizontal dashed line from g(xi) to x-axis at x_{i+1}
        if (i < 5) {
          const xNext = xValues[i + 1];
          ctx.beginPath();
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = color.light;
          ctx.lineWidth = 1;
          ctx.moveTo(toCanvasX(xi), toCanvasY(gi));
          ctx.lineTo(toCanvasX(xNext), toCanvasY(gi));
          ctx.lineTo(toCanvasX(xNext), y0);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Point on x-axis
        ctx.beginPath();
        ctx.fillStyle = color.main;
        ctx.arc(toCanvasX(xi), y0, 3, 0, 2 * Math.PI);
        ctx.fill();

        // Label (only first 4 to avoid clutter)
        if (i < 4) {
          ctx.font = "bold 8pt sans-serif";
          ctx.fillStyle = color.main;
          ctx.textAlign = "center";
          const yOffset = (i % 2 === 0) ? 12 : 22;
          ctx.fillText(labels[i], toCanvasX(xi), y0 + yOffset);
        }
      });

      // Mark the zero (fixed point)
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.moveTo(toCanvasX(FIXED_POINT), y0 - 8);
      ctx.lineTo(toCanvasX(FIXED_POINT), y0 + 8);
      ctx.stroke();

      ctx.font = "bold 9pt sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText("ξ ≈ 0.567", toCanvasX(FIXED_POINT), y0 - 12);

      // Legend
      const legendX = width - 175;
      const legendY = padding.top + 5;

      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillRect(legendX - 5, legendY - 3, 160, 42);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.strokeRect(legendX - 5, legendY - 3, 160, 42);

      ctx.font = "9pt sans-serif";
      ctx.fillStyle = "#374151";
      ctx.textAlign = "left";
      ctx.fillText("Iterazione: xₙ₊₁ = g(xₙ) = e⁻ˣⁿ", legendX, legendY + 12);
      ctx.fillText("g(xₙ) proiettato su asse x → xₙ₊₁", legendX, legendY + 27);

    } else if (method === "secanti") {
      // Secant method with 2cos(x) - x
      // Using wider bounds to show x₀=-1 and x₁=4
      const xMin = -1.5, xMax = 4.5;
      const yMin = -5.5, yMax = 3.5;

      const padding = { left: 35, right: 20, top: 15, bottom: 25 };
      const plotWidth = width - padding.left - padding.right;
      const plotHeight = height - padding.top - padding.bottom;

      const toCanvasX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
      const toCanvasY = (y: number) => padding.top + ((yMax - y) / (yMax - yMin)) * plotHeight;

      // Different colors for each iteration step
      const stepColors = [
        { line: "#3b82f6", point: "#2563eb" },  // Blue for step 1
        { line: "#f97316", point: "#ea580c" },  // Orange for step 2
        { line: "#a855f7", point: "#9333ea" },  // Purple for step 3
      ];

      // Draw light grid
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 0.5;

      for (let x = -1; x <= 4; x += 1) {
        ctx.beginPath();
        ctx.moveTo(toCanvasX(x), padding.top);
        ctx.lineTo(toCanvasX(x), height - padding.bottom);
        ctx.stroke();
      }

      for (let y = -4; y <= 2; y += 1) {
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
      ctx.moveTo(toCanvasX(0), padding.top);
      ctx.lineTo(toCanvasX(0), height - padding.bottom);
      ctx.stroke();

      // Axis labels
      ctx.font = "9pt sans-serif";
      ctx.fillStyle = "#374151";
      ctx.textAlign = "center";
      for (let x = -1; x <= 4; x += 1) {
        if (x !== 0) {
          ctx.fillText(x.toString(), toCanvasX(x), height - 8);
        }
      }
      ctx.textAlign = "right";
      ctx.fillText("0", toCanvasX(0) - 5, y0 - 5);

      // Draw function curve
      ctx.beginPath();
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 2;

      let firstPoint = true;
      for (let px = 0; px <= plotWidth; px++) {
        const x = xMin + (px / plotWidth) * (xMax - xMin);
        const y = fSecant(x);
        const canvasX = toCanvasX(x);
        const canvasY = toCanvasY(y);

        if (canvasY < padding.top || canvasY > height - padding.bottom) {
          firstPoint = true;
          continue;
        }

        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
      ctx.stroke();

      // Label the function
      ctx.font = "bold 10pt sans-serif";
      ctx.fillStyle = "#374151";
      ctx.textAlign = "left";
      ctx.fillText("f(x) = 2cos(x) - x", toCanvasX(2.5), toCanvasY(2.8));

      // Calculate secant iterations starting from x₀=-1 and x₁=4
      // 3 iterations for clarity
      let x0 = -1, x1 = 4;
      const iterations: { x0: number; x1: number; x2: number; fx0: number; fx1: number }[] = [];

      for (let i = 0; i < 3; i++) {
        const fx0 = fSecant(x0), fx1 = fSecant(x1);
        const x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0);
        iterations.push({ x0, x1, x2, fx0, fx1 });
        x0 = x1;
        x1 = x2;
      }

      // Draw secant lines with different colors for each step
      iterations.forEach((iter, i) => {
        const stepColor = stepColors[i];

        const p1 = { x: iter.x0, y: iter.fx0 };
        const p2 = { x: iter.x1, y: iter.fx1 };

        // Calculate secant line
        const slope = (p2.y - p1.y) / (p2.x - p1.x);
        
        // Step 1: full width to show the initial secant clearly
        // Steps 2 & 3: only from one point to the other (plus the x-intercept)
        let lineXStart: number, lineXEnd: number;
        
        if (i === 0) {
          // First step: full width
          lineXStart = xMin;
          lineXEnd = xMax;
        } else {
          // Later steps: from leftmost point to rightmost point (including x-intercept)
          const minX = Math.min(p1.x, p2.x, iter.x2);
          const maxX = Math.max(p1.x, p2.x, iter.x2);
          lineXStart = minX - 0.1;
          lineXEnd = maxX + 0.1;
        }
        
        const lineYStart = p1.y + slope * (lineXStart - p1.x);
        const lineYEnd = p1.y + slope * (lineXEnd - p1.x);

        // Draw secant line
        ctx.beginPath();
        ctx.strokeStyle = stepColor.line;
        ctx.lineWidth = 2.5;
        ctx.moveTo(toCanvasX(lineXStart), toCanvasY(lineYStart));
        ctx.lineTo(toCanvasX(lineXEnd), toCanvasY(lineYEnd));
        ctx.stroke();

        // Points on curve for this step
        ctx.beginPath();
        ctx.fillStyle = stepColor.point;
        ctx.arc(toCanvasX(p1.x), toCanvasY(p1.y), 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(toCanvasX(p2.x), toCanvasY(p2.y), 5, 0, 2 * Math.PI);
        ctx.fill();

        // Vertical dashed line from curve point to x-axis
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = stepColor.point;
        ctx.lineWidth = 1;
        ctx.moveTo(toCanvasX(p1.x), y0);
        ctx.lineTo(toCanvasX(p1.x), toCanvasY(p1.y));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(toCanvasX(p2.x), y0);
        ctx.lineTo(toCanvasX(p2.x), toCanvasY(p2.y));
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw x-axis points with labels (x₀, x₁, x₂, x₃, x₄)
      const pointsWithLabels = [
        { x: -1, label: "x₀", color: stepColors[0].point },
        { x: 4, label: "x₁", color: stepColors[0].point },
        { x: iterations[0].x2, label: "x₂", color: stepColors[1].point },
        { x: iterations[1].x2, label: "x₃", color: stepColors[2].point },
        { x: iterations[2].x2, label: "x₄", color: "#15803d" },  // Final point in green
      ];
      
      pointsWithLabels.forEach((point, i) => {
        const isLast = i === pointsWithLabels.length - 1;
        
        // Point on x-axis
        ctx.beginPath();
        ctx.fillStyle = point.color;
        ctx.arc(toCanvasX(point.x), y0, isLast ? 6 : 4, 0, 2 * Math.PI);
        ctx.fill();

        // Label below x-axis
        ctx.font = "bold 9pt sans-serif";
        ctx.fillStyle = point.color;
        ctx.textAlign = "center";
        ctx.fillText(point.label, toCanvasX(point.x), y0 + 14);
      });

      // Mark the actual root
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.moveTo(toCanvasX(ROOT_SECANT), y0 - 6);
      ctx.lineTo(toCanvasX(ROOT_SECANT), y0 + 6);
      ctx.stroke();

      ctx.font = "bold 9pt sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText("ξ", toCanvasX(ROOT_SECANT), y0 - 10);

      // Legend with color coding
      const legendX = width - 130;
      const legendY = padding.top + 5;

      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillRect(legendX - 5, legendY - 3, 115, 54);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.strokeRect(legendX - 5, legendY - 3, 115, 54);

      ctx.font = "9pt sans-serif";
      
      // Step 1 legend
      ctx.fillStyle = stepColors[0].line;
      ctx.fillRect(legendX, legendY + 4, 12, 3);
      ctx.fillStyle = "#374151";
      ctx.textAlign = "left";
      ctx.fillText("Passo 1: x₀,x₁ → x₂", legendX + 16, legendY + 10);
      
      // Step 2 legend
      ctx.fillStyle = stepColors[1].line;
      ctx.fillRect(legendX, legendY + 19, 12, 3);
      ctx.fillStyle = "#374151";
      ctx.fillText("Passo 2: x₁,x₂ → x₃", legendX + 16, legendY + 25);

      // Step 3 legend
      ctx.fillStyle = stepColors[2].line;
      ctx.fillRect(legendX, legendY + 34, 12, 3);
      ctx.fillStyle = "#374151";
      ctx.fillText("Passo 3: x₂,x₃ → x₄", legendX + 16, legendY + 40);

    } else {
      // Bisezione and Newton use f(x) = x² - 2
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
    }

  }, [method, width, height]);

  return (
    <div className="root-finding-visualizer">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
