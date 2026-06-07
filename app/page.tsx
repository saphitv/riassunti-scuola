import type { Metadata } from "next";
import { CourseExplorer } from "@/components/home/CourseExplorer";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Appunti universitari",
  description: "Indice dei riassunti e delle note di studio universitarie.",
};

export default function Home() {
  return <CourseExplorer courses={courses} />;
}
