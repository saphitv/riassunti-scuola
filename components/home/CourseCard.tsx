"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ViewTransition } from "@/components/ViewTransition";
import type { Course } from "@/lib/courses";
import { CATEGORY_LABELS, SEMESTER_ROMAN } from "@/lib/courses";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  /** Stagger delay in ms for mount animation. */
  indexDelay?: number;
}

export function CourseCard({ course, indexDelay = 0 }: CourseCardProps) {
  const router = useRouter();
  const prefetchedRef = useRef(false);
  const href = `/${course.slug}`;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (prefetchedRef.current) return;
      prefetchedRef.current = true;
      router.prefetch(href);
    }, 150);
    return () => window.clearTimeout(timeoutId);
  }, [href, router]);

  return (
    <Link
      href={href}
      transitionTypes={["course-navigation"]}
      className={cn(
        "course-card group relative flex flex-col gap-4",
        "border border-rule bg-surface p-6",
        "transition-[transform,border-color,background-color] duration-300 ease-out",
        "hover:border-ink hover:-translate-y-[2px]",
        "outline-none focus:outline-none focus-visible:outline-none",
      )}
      style={{
        animation: "cardIn 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
        animationDelay: `${indexDelay}ms`,
      }}
    >
      {/* left accent bar reveals on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-y-100"
      />

      {/* Meta row: semester */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
        <span className="inline-flex items-center gap-2">
          <span className="text-ink">
            SEM {SEMESTER_ROMAN[course.semester]}
          </span>
          <span aria-hidden className="h-px w-4 bg-rule" />
          <span>{course.slug}</span>
        </span>
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 -translate-x-0.5 translate-y-0.5 text-ink-muted transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[var(--accent)]"
        />
      </div>

      {/* Title with View Transition so the morph to /course header still plays */}
      <ViewTransition name={getCourseTitleTransitionName(course.slug)}>
        <h2 className="font-serif text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--ink)]">
          {course.title}
        </h2>
      </ViewTransition>

      <p className="font-serif italic text-[1rem] leading-snug text-ink-muted">
        {course.description}
      </p>

      <span aria-hidden className="h-px w-8 bg-rule" />

      {/* Category chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {course.categories.map((cat) => (
          <span
            key={cat}
            className="inline-flex items-center border border-rule px-2 py-4 font-mono text-[10px] uppercase tracking-[0.14em] leading-none text-ink-muted"
          >
            {CATEGORY_LABELS[cat]}
          </span>
        ))}
      </div>
    </Link>
  );
}
