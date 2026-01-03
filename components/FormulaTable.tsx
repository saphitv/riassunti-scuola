"use client";

import { MathJax } from "better-react-mathjax";

interface FormulaRow {
  label: string;
  cells: string[];
}

interface FormulaTableProps {
  headers: string[];
  rows: FormulaRow[];
}

export function FormulaTable({ headers, rows }: FormulaTableProps) {
  return (
    <div className="formula-table-wrapper">
      <table className="formula-table">
        <thead>
          <tr>
            <th className="formula-table-label-header"></th>
            {headers.map((header, index) => (
              <th key={index} className="formula-table-header">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="formula-table-label">{row.label}</td>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} className="formula-table-cell">
                  <MathJax>{`\\[${cell}\\]`}</MathJax>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
