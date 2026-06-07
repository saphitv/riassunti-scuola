"use client";

import { MathJax } from "better-react-mathjax";
import { useHasMounted } from "@/components/useHasMounted";

interface FormulaRow {
  label: string;
  cells: string[];
}

interface FormulaTableProps {
  headers: string[];
  rows: FormulaRow[];
}

export function FormulaTable({ headers, rows }: FormulaTableProps) {
  const hasMounted = useHasMounted();

  return (
    <div className="formula-table-wrapper">
      <table className="formula-table">
        <thead>
          <tr>
            <th className="formula-table-label-header" aria-label="Formula" scope="col" />
            {headers.map((header) => (
              <th key={header} className="formula-table-header" scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="formula-table-label">{row.label}</td>
              {row.cells.map((cell, cellIndex) => (
                <td key={headers[cellIndex] ?? cell} className="formula-table-cell">
                  {hasMounted ? (
                    <MathJax>{`\\[${cell}\\]`}</MathJax>
                  ) : (
                    <span>{`\\[${cell}\\]`}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
