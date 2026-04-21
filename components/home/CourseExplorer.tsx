"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  DEFAULT_SEMESTER,
  type Course,
  type CourseCategory,
} from "@/lib/courses";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/home/SearchBar";
import {
  SemesterFilter,
  type SemesterFilterValue,
} from "@/components/home/SemesterFilter";
import { CategoryFilter } from "@/components/home/CategoryFilter";
import { CourseCard } from "@/components/home/CourseCard";

interface CourseExplorerProps {
  courses: Course[];
}

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

const romanByValue: Record<SemesterFilterValue, string> = {
  all: "—",
  "3": "III",
  "4": "IV",
};

export function CourseExplorer({ courses }: CourseExplorerProps) {
  const [query, setQuery] = useState("");
  const [semester, setSemester] = useState<SemesterFilterValue>(
    String(DEFAULT_SEMESTER) as SemesterFilterValue,
  );
  const [activeCats, setActiveCats] = useState<Set<CourseCategory>>(new Set());

  const availableCategories = useMemo<CourseCategory[]>(() => {
    const s = new Set<CourseCategory>();
    for (const c of courses) for (const cat of c.categories) s.add(cat);
    return Array.from(s);
  }, [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = courses.filter((c) => {
      if (semester !== "all" && c.semester !== Number(semester)) return false;
      if (
        activeCats.size > 0 &&
        !c.categories.some((cat) => activeCats.has(cat))
      )
        return false;
      if (q === "") return true;
      if (c.title.toLowerCase().includes(q)) return true;
      if (c.description.toLowerCase().includes(q)) return true;
      if (c.keywords.some((k) => k.toLowerCase().includes(q))) return true;
      return false;
    });
    // Most recent semester first; alphabetical within a semester.
    return matches.sort(
      (a, b) => b.semester - a.semester || a.title.localeCompare(b.title, "it"),
    );
  }, [courses, query, semester, activeCats]);

  const toggleCategory = (cat: CourseCategory) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery("");
    setSemester(String(DEFAULT_SEMESTER) as SemesterFilterValue);
    setActiveCats(new Set());
  };

  const hasActiveFilters =
    query !== "" ||
    semester !== String(DEFAULT_SEMESTER) ||
    activeCats.size > 0;

  const currentYear = new Date().getFullYear();

  return (
    <div className="appunti-root">
      {/* ══════════ MASTHEAD ══════════ */}
      <header className="masthead">
        <div className="masthead-bar">
          <div className="masthead-brand-wrap">
            <Image
              src="/mascot/red-panda-mascot-notebook.png"
              alt="Mascotte Appunti con libro"
              width={56}
              height={56}
              className="brand-mascot"
              priority
            />
            <span className="masthead-brand">
              <span>APPUNTI</span>
              <span className="masthead-sep" aria-hidden />
              <span>VOL. {currentYear}</span>
              <span className="masthead-sep hide-sm" aria-hidden />
              <span className="hide-sm">ING. INFORMATICA</span>
            </span>
          </div>
          <ThemeToggle />
        </div>

        <div className="masthead-hero">
          <h1 className="masthead-title">
            <span>L&rsquo;esame,</span>
            <span className="masthead-title-em">riassunto.</span>
          </h1>
          <p className="masthead-tagline">
            Una raccolta di riassunti per gli esami universitari,
            impaginati con cura per essere letti e stampati.
          </p>
        </div>
      </header>

      {/* ══════════ CONTROLS ══════════ */}
      <section className="controls" aria-label="Filtri">
        <div className="controls-search">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="controls-row">
          <div className="control-group">
            <span className="control-label">Semestre</span>
            <SemesterFilter value={semester} onChange={setSemester} />
          </div>

          <div className="control-group">
            <span className="control-label">Categoria</span>
            <CategoryFilter
              active={activeCats}
              onToggle={toggleCategory}
              available={availableCategories}
            />
          </div>
        </div>
      </section>

      {/* ══════════ COUNT ══════════ */}
      <div className="catalog-meta">
        <span className="catalog-count">
          <span className="catalog-count-num">{pad2(filtered.length)}</span>
          <span className="catalog-count-slash"> / </span>
          <span className="catalog-count-total">{pad2(courses.length)}</span>
          <span className="catalog-count-label">&nbsp;&nbsp;riassunti</span>
        </span>
        <span className="catalog-meta-rule" aria-hidden />
        <span className="catalog-meta-info">
          attivo&nbsp;&nbsp;·&nbsp;&nbsp;sem.&nbsp;{romanByValue[semester]}
          {activeCats.size > 0 && (
            <>
              &nbsp;&nbsp;·&nbsp;&nbsp;{activeCats.size}&nbsp;cat.
            </>
          )}
          {hasActiveFilters && (
            <>
              {" · "}
              <button
                type="button"
                onClick={clearFilters}
                className="catalog-reset"
              >
                reset
              </button>
            </>
          )}
        </span>
      </div>

      {/* ══════════ GRID ══════════ */}
      {filtered.length > 0 ? (
        <ul className="course-deck" aria-label="Riassunti">
          {filtered.map((course, i) => (
            <li key={course.slug}>
              <CourseCard course={course} indexDelay={i * 60} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="course-empty" role="status">
          <p className="course-empty-title">Nessun riassunto trovato.</p>
          <p className="course-empty-hint">
            Prova a rimuovere un filtro o a cercare un termine diverso.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="course-empty-reset"
          >
            ← torna all&apos;indice
          </button>
        </div>
      )}

      {/* ══════════ FOOTER ══════════ */}
      <footer className="appunti-footer">
        <span>— fine dell&apos;indice —</span>
      </footer>
    </div>
  );
}
