"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ViewTransition } from "@/components/ViewTransition";
import { getCourseTitleTransitionName } from "@/lib/courseViewTransition";

interface CourseCardLinkProps {
  slug: string;
  name: string;
  description: string;
}

export function CourseCardLink({
  slug,
  name,
  description,
}: CourseCardLinkProps) {
  const router = useRouter();
  const prefetchedRef = useRef(false);
  const href = `/${slug}`;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (prefetchedRef.current) {
        return;
      }

      prefetchedRef.current = true;
      router.prefetch(href);
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [href, router]);

  return (
    <Link
      href={href}
      className="course-card"
      transitionTypes={["course-navigation"]}
    >
      <ViewTransition name={getCourseTitleTransitionName(slug)}>
        <span className="course-card-name">{name}</span>
      </ViewTransition>
      <span className="course-card-description">{description}</span>
    </Link>
  );
}
