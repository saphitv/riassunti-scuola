"use client";

import { useEffect, useRef } from "react";
import { Math as MathComponent } from "./Math";

type VolumeType =
  | "piramide"
  | "cono"
  | "sfera"
  | "cilindro"
  | "toro"
  | "paraboloide"
  | "tetraedro"
  | "cubo";

interface VolumeConfig {
  name: string;
  volumeFormula: string;
  surfaceFormula?: string;
  description: string;
  draw: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string
  ) => void;
}

const drawPyramid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  const cx = width / 2;
  const cy = height / 2;
  const baseSize = Math.min(width, height) * 0.35;
  const pyramidHeight = Math.min(width, height) * 0.4;

  // Apex
  const apex = { x: cx, y: cy - pyramidHeight * 0.5 };
  
  // Base vertices (square base in perspective)
  const baseY = cy + pyramidHeight * 0.3;
  const frontLeft = { x: cx - baseSize * 0.6, y: baseY };
  const frontRight = { x: cx + baseSize * 0.6, y: baseY };
  const backLeft = { x: cx - baseSize * 0.3, y: baseY - baseSize * 0.3 };
  const backRight = { x: cx + baseSize * 0.3, y: baseY - baseSize * 0.3 };

  // Draw back faces (darker)
  ctx.fillStyle = shadeColor(color, -30);
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;

  // Back left face
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(backLeft.x, backLeft.y);
  ctx.lineTo(backRight.x, backRight.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw base (visible part)
  ctx.fillStyle = shadeColor(color, -20);
  ctx.beginPath();
  ctx.moveTo(frontLeft.x, frontLeft.y);
  ctx.lineTo(frontRight.x, frontRight.y);
  ctx.lineTo(backRight.x, backRight.y);
  ctx.lineTo(backLeft.x, backLeft.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw front faces (lighter)
  // Front left face
  ctx.fillStyle = shadeColor(color, 10);
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(frontLeft.x, frontLeft.y);
  ctx.lineTo(backLeft.x, backLeft.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Front right face
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(frontRight.x, frontRight.y);
  ctx.lineTo(frontLeft.x, frontLeft.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Right face
  ctx.fillStyle = shadeColor(color, -10);
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(backRight.x, backRight.y);
  ctx.lineTo(frontRight.x, frontRight.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Height indicator
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(apex.x, baseY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Label h
  ctx.fillStyle = "#374151";
  ctx.font = "italic 12px serif";
  ctx.fillText("h", apex.x + 5, (apex.y + baseY) / 2);
};

const drawCone = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.3;
  const coneHeight = Math.min(width, height) * 0.45;

  const apex = { x: cx, y: cy - coneHeight * 0.4 };
  const baseY = cy + coneHeight * 0.35;

  // Draw ellipse (base)
  const ellipseHeight = radius * 0.3;
  
  // Back half of cone (darker)
  ctx.fillStyle = shadeColor(color, -20);
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(cx - radius, baseY);
  ctx.quadraticCurveTo(cx, baseY - ellipseHeight, cx + radius, baseY);
  ctx.closePath();
  ctx.fill();

  // Front surface of cone
  const gradient = ctx.createLinearGradient(cx - radius, apex.y, cx + radius, baseY);
  gradient.addColorStop(0, shadeColor(color, 20));
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(1, shadeColor(color, -10));
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(cx - radius, baseY);
  ctx.quadraticCurveTo(cx, baseY + ellipseHeight, cx + radius, baseY);
  ctx.closePath();
  ctx.fill();

  // Edge lines
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(cx - radius, baseY);
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(cx + radius, baseY);
  ctx.stroke();

  // Base ellipse
  ctx.beginPath();
  ctx.ellipse(cx, baseY, radius, ellipseHeight, 0, 0, 2 * Math.PI);
  ctx.stroke();

  // Height and radius indicators
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(apex.x, baseY);
  ctx.moveTo(cx, baseY);
  ctx.lineTo(cx + radius, baseY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Labels
  ctx.fillStyle = "#374151";
  ctx.font = "italic 12px serif";
  ctx.fillText("h", apex.x + 5, (apex.y + baseY) / 2);
  ctx.fillText("r", cx + radius / 2, baseY + 15);
};

const drawSphere = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.35;

  // Sphere with gradient
  const gradient = ctx.createRadialGradient(
    cx - radius * 0.3,
    cy - radius * 0.3,
    0,
    cx,
    cy,
    radius
  );
  gradient.addColorStop(0, shadeColor(color, 40));
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(1, shadeColor(color, -30));

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.fill();

  // Outline
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Equator line (dashed behind)
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius, radius * 0.25, 0, Math.PI, 2 * Math.PI);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Equator line (solid front)
  ctx.strokeStyle = "#374151";
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius, radius * 0.25, 0, 0, Math.PI);
  ctx.stroke();

  // Radius indicator
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + radius * 0.7, cy - radius * 0.7);
  ctx.stroke();
  ctx.setLineDash([]);

  // Label
  ctx.fillStyle = "#374151";
  ctx.font = "italic 12px serif";
  ctx.fillText("r", cx + radius * 0.4, cy - radius * 0.3);
};

const drawCylinder = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.25;
  const cylinderHeight = Math.min(width, height) * 0.45;
  const ellipseHeight = radius * 0.25;

  const topY = cy - cylinderHeight * 0.4;
  const bottomY = cy + cylinderHeight * 0.4;

  // Back surface
  ctx.fillStyle = shadeColor(color, -20);
  ctx.beginPath();
  ctx.moveTo(cx - radius, topY);
  ctx.lineTo(cx - radius, bottomY);
  ctx.quadraticCurveTo(cx, bottomY - ellipseHeight, cx + radius, bottomY);
  ctx.lineTo(cx + radius, topY);
  ctx.quadraticCurveTo(cx, topY - ellipseHeight, cx - radius, topY);
  ctx.closePath();
  ctx.fill();

  // Front surface with gradient
  const gradient = ctx.createLinearGradient(cx - radius, 0, cx + radius, 0);
  gradient.addColorStop(0, shadeColor(color, 10));
  gradient.addColorStop(0.3, shadeColor(color, 30));
  gradient.addColorStop(0.7, color);
  gradient.addColorStop(1, shadeColor(color, -15));

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(cx - radius, topY);
  ctx.lineTo(cx - radius, bottomY);
  ctx.quadraticCurveTo(cx, bottomY + ellipseHeight, cx + radius, bottomY);
  ctx.lineTo(cx + radius, topY);
  ctx.closePath();
  ctx.fill();

  // Top ellipse
  ctx.fillStyle = shadeColor(color, 20);
  ctx.beginPath();
  ctx.ellipse(cx, topY, radius, ellipseHeight, 0, 0, 2 * Math.PI);
  ctx.fill();

  // Outlines
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;
  
  // Side lines
  ctx.beginPath();
  ctx.moveTo(cx - radius, topY);
  ctx.lineTo(cx - radius, bottomY);
  ctx.moveTo(cx + radius, topY);
  ctx.lineTo(cx + radius, bottomY);
  ctx.stroke();

  // Top ellipse outline
  ctx.beginPath();
  ctx.ellipse(cx, topY, radius, ellipseHeight, 0, 0, 2 * Math.PI);
  ctx.stroke();

  // Bottom ellipse (front half solid, back dashed)
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.beginPath();
  ctx.ellipse(cx, bottomY, radius, ellipseHeight, 0, Math.PI, 2 * Math.PI);
  ctx.stroke();
  ctx.setLineDash([]);
  
  ctx.strokeStyle = "#374151";
  ctx.beginPath();
  ctx.ellipse(cx, bottomY, radius, ellipseHeight, 0, 0, Math.PI);
  ctx.stroke();

  // Height and radius indicators
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx + radius + 10, topY);
  ctx.lineTo(cx + radius + 10, bottomY);
  ctx.moveTo(cx, bottomY);
  ctx.lineTo(cx + radius, bottomY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Labels
  ctx.fillStyle = "#374151";
  ctx.font = "italic 12px serif";
  ctx.fillText("h", cx + radius + 15, cy);
  ctx.fillText("r", cx + radius / 2, bottomY + 15);
};

const drawTorus = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  const cx = width / 2;
  const cy = height / 2;
  const R = Math.min(width, height) * 0.25; // Major radius
  const r = R * 0.35; // Minor radius

  // Draw torus using multiple ellipses
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;

  // Back part (dashed)
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = "#9ca3af";
  ctx.beginPath();
  ctx.ellipse(cx, cy, R + r, (R + r) * 0.35, 0, Math.PI, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, R - r, (R - r) * 0.35, 0, Math.PI, 2 * Math.PI);
  ctx.stroke();
  ctx.setLineDash([]);

  // Front tube sections
  const gradient = ctx.createLinearGradient(cx - R - r, cy, cx + R + r, cy);
  gradient.addColorStop(0, shadeColor(color, -10));
  gradient.addColorStop(0.2, shadeColor(color, 20));
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(0.8, shadeColor(color, 20));
  gradient.addColorStop(1, shadeColor(color, -10));

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(cx, cy, R + r, (R + r) * 0.35, 0, 0, Math.PI);
  ctx.ellipse(cx, cy, R - r, (R - r) * 0.35, 0, Math.PI, 0, true);
  ctx.closePath();
  ctx.fill();

  // Outer ellipse front
  ctx.strokeStyle = "#374151";
  ctx.beginPath();
  ctx.ellipse(cx, cy, R + r, (R + r) * 0.35, 0, 0, Math.PI);
  ctx.stroke();

  // Inner ellipse front
  ctx.beginPath();
  ctx.ellipse(cx, cy, R - r, (R - r) * 0.35, 0, 0, Math.PI);
  ctx.stroke();

  // Cross-section circles on sides
  const crossSectionGradient = ctx.createRadialGradient(
    cx - R - r * 0.3, cy, 0,
    cx - R, cy, r
  );
  crossSectionGradient.addColorStop(0, shadeColor(color, 30));
  crossSectionGradient.addColorStop(1, shadeColor(color, -20));
  
  ctx.fillStyle = crossSectionGradient;
  ctx.beginPath();
  ctx.ellipse(cx - R, cy, r * 0.5, r, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // Labels
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx - R, cy);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#374151";
  ctx.font = "italic 12px serif";
  ctx.fillText("R", cx - R / 2, cy - 8);
  ctx.fillText("r", cx - R + r / 2 + 3, cy + r + 10);
};

const drawParaboloid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.min(width, height) * 0.3;
  const parHeight = Math.min(width, height) * 0.4;

  const topY = cy - parHeight * 0.35;
  const bottomY = cy + parHeight * 0.35;
  const ellipseHeight = maxRadius * 0.25;

  // Draw paraboloid surface
  const gradient = ctx.createLinearGradient(cx - maxRadius, 0, cx + maxRadius, 0);
  gradient.addColorStop(0, shadeColor(color, 10));
  gradient.addColorStop(0.5, shadeColor(color, 30));
  gradient.addColorStop(1, shadeColor(color, -10));

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(cx, topY);
  
  // Left parabolic edge
  for (let t = 0; t <= 1; t += 0.05) {
    const y = topY + (bottomY - topY) * t;
    const r = maxRadius * Math.sqrt(t);
    ctx.lineTo(cx - r, y);
  }
  
  // Bottom ellipse
  ctx.quadraticCurveTo(cx, bottomY + ellipseHeight, cx + maxRadius, bottomY);
  
  // Right parabolic edge
  for (let t = 1; t >= 0; t -= 0.05) {
    const y = topY + (bottomY - topY) * t;
    const r = maxRadius * Math.sqrt(t);
    ctx.lineTo(cx + r, y);
  }
  
  ctx.closePath();
  ctx.fill();

  // Outline
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;
  
  // Left edge
  ctx.beginPath();
  ctx.moveTo(cx, topY);
  for (let t = 0; t <= 1; t += 0.05) {
    const y = topY + (bottomY - topY) * t;
    const r = maxRadius * Math.sqrt(t);
    ctx.lineTo(cx - r, y);
  }
  ctx.stroke();
  
  // Right edge
  ctx.beginPath();
  ctx.moveTo(cx, topY);
  for (let t = 0; t <= 1; t += 0.05) {
    const y = topY + (bottomY - topY) * t;
    const r = maxRadius * Math.sqrt(t);
    ctx.lineTo(cx + r, y);
  }
  ctx.stroke();

  // Bottom ellipse
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.beginPath();
  ctx.ellipse(cx, bottomY, maxRadius, ellipseHeight, 0, Math.PI, 2 * Math.PI);
  ctx.stroke();
  ctx.setLineDash([]);
  
  ctx.strokeStyle = "#374151";
  ctx.beginPath();
  ctx.ellipse(cx, bottomY, maxRadius, ellipseHeight, 0, 0, Math.PI);
  ctx.stroke();

  // Axis
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, topY - 10);
  ctx.lineTo(cx, bottomY + 10);
  ctx.stroke();
  ctx.setLineDash([]);
};

const drawTetrahedron = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  const cx = width / 2;
  const cy = height / 2;
  const size = Math.min(width, height) * 0.35;

  // Vertices
  const apex = { x: cx, y: cy - size * 0.6 };
  const frontLeft = { x: cx - size * 0.5, y: cy + size * 0.4 };
  const frontRight = { x: cx + size * 0.5, y: cy + size * 0.4 };
  const back = { x: cx, y: cy + size * 0.1 };

  // Back face
  ctx.fillStyle = shadeColor(color, -30);
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(frontLeft.x, frontLeft.y);
  ctx.lineTo(back.x, back.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(back.x, back.y);
  ctx.lineTo(frontRight.x, frontRight.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Bottom face
  ctx.fillStyle = shadeColor(color, -15);
  ctx.beginPath();
  ctx.moveTo(frontLeft.x, frontLeft.y);
  ctx.lineTo(frontRight.x, frontRight.y);
  ctx.lineTo(back.x, back.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Front face
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(apex.x, apex.y);
  ctx.lineTo(frontLeft.x, frontLeft.y);
  ctx.lineTo(frontRight.x, frontRight.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Edge label
  ctx.fillStyle = "#374151";
  ctx.font = "italic 12px serif";
  ctx.fillText("a", (frontLeft.x + frontRight.x) / 2, frontLeft.y + 15);
};

const drawCube = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  const cx = width / 2;
  const cy = height / 2;
  const size = Math.min(width, height) * 0.28;
  const depth = size * 0.4;

  // Front face vertices
  const frontTL = { x: cx - size, y: cy - size };
  const frontTR = { x: cx + size, y: cy - size };
  const frontBL = { x: cx - size, y: cy + size };
  const frontBR = { x: cx + size, y: cy + size };

  // Back face vertices
  const backTL = { x: frontTL.x + depth, y: frontTL.y - depth };
  const backTR = { x: frontTR.x + depth, y: frontTR.y - depth };
  const backBR = { x: frontBR.x + depth, y: frontBR.y - depth };

  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;

  // Back edges (dashed)
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#9ca3af";
  ctx.beginPath();
  ctx.moveTo(backTL.x, backTL.y);
  ctx.lineTo(frontTL.x, frontTL.y);
  ctx.moveTo(backTL.x, backTL.y);
  ctx.lineTo(backTL.x, backTL.y + size * 2);
  ctx.moveTo(backTL.x, backTL.y);
  ctx.lineTo(backTR.x, backTR.y);
  ctx.stroke();
  ctx.setLineDash([]);

  // Top face
  ctx.fillStyle = shadeColor(color, 20);
  ctx.beginPath();
  ctx.moveTo(frontTL.x, frontTL.y);
  ctx.lineTo(frontTR.x, frontTR.y);
  ctx.lineTo(backTR.x, backTR.y);
  ctx.lineTo(backTL.x, backTL.y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#374151";
  ctx.stroke();

  // Right face
  ctx.fillStyle = shadeColor(color, -10);
  ctx.beginPath();
  ctx.moveTo(frontTR.x, frontTR.y);
  ctx.lineTo(frontBR.x, frontBR.y);
  ctx.lineTo(backBR.x, backBR.y);
  ctx.lineTo(backTR.x, backTR.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Front face
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(frontTL.x, frontTL.y);
  ctx.lineTo(frontTR.x, frontTR.y);
  ctx.lineTo(frontBR.x, frontBR.y);
  ctx.lineTo(frontBL.x, frontBL.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Edge label
  ctx.fillStyle = "#374151";
  ctx.font = "italic 12px serif";
  ctx.fillText("a", frontBL.x - 15, cy);
};

// Helper function to shade colors
function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

const VOLUMES: Record<VolumeType, VolumeConfig> = {
  piramide: {
    name: "Piramide",
    volumeFormula: "V = \\frac{1}{3}A_b \\cdot h",
    surfaceFormula: "S = A_b + A_l",
    description: "Solido con base poligonale e facce triangolari",
    draw: drawPyramid,
  },
  cono: {
    name: "Cono",
    volumeFormula: "V = \\frac{1}{3}\\pi r^2 h",
    surfaceFormula: "S = \\pi r^2 + \\pi r \\sqrt{r^2 + h^2}",
    description: "Solido di rotazione con base circolare",
    draw: drawCone,
  },
  sfera: {
    name: "Sfera",
    volumeFormula: "V = \\frac{4}{3}\\pi r^3",
    surfaceFormula: "S = 4\\pi r^2",
    description: "Solido perfettamente sferico",
    draw: drawSphere,
  },
  cilindro: {
    name: "Cilindro",
    volumeFormula: "V = \\pi r^2 h",
    surfaceFormula: "S = 2\\pi r^2 + 2\\pi rh",
    description: "Solido con basi circolari parallele",
    draw: drawCylinder,
  },
  toro: {
    name: "Toro",
    volumeFormula: "V = 2\\pi^2 R r^2",
    surfaceFormula: "S = 4\\pi^2 Rr",
    description: "Solido a forma di ciambella",
    draw: drawTorus,
  },
  paraboloide: {
    name: "Paraboloide",
    volumeFormula: "V = \\frac{1}{2}\\pi r^2 h",
    description: "Superficie di rotazione parabolica",
    draw: drawParaboloid,
  },
  tetraedro: {
    name: "Tetraedro regolare",
    volumeFormula: "V = \\frac{a^3\\sqrt{2}}{12}",
    surfaceFormula: "S = a^2\\sqrt{3}",
    description: "Poliedro con 4 facce triangolari",
    draw: drawTetrahedron,
  },
  cubo: {
    name: "Cubo",
    volumeFormula: "V = a^3",
    surfaceFormula: "S = 6a^2",
    description: "Poliedro con 6 facce quadrate",
    draw: drawCube,
  },
};

interface VolumeVisualizerProps {
  type: VolumeType;
  width?: number;
  height?: number;
  color?: string;
  showFormula?: boolean;
}

export function VolumeVisualizer({
  type,
  width = 100,
  height = 85,
  color = "#22c55e",
  showFormula = true,
}: VolumeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const volume = VOLUMES[type];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the volume
    volume.draw(ctx, width, height, color);
  }, [volume, width, height, color]);

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
    },
    formula: {
      fontSize: "0.55rem",
      color: "#6b7280",
      textAlign: "center" as const,
      lineHeight: 1.2,
    },
  };

  return (
    <div style={styles.visualizer}>
      <div style={styles.header}>
        <span style={styles.name}>{volume.name}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={styles.canvas}
      />
      {showFormula && (
        <div style={styles.formula}>
          <MathComponent>{volume.volumeFormula}</MathComponent>
        </div>
      )}
    </div>
  );
}

export { VOLUMES };
export type { VolumeType };
