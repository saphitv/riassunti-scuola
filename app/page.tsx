import { CourseExplorer } from "@/components/home/CourseExplorer";
import { courses } from "@/lib/courses";

export default function Home() {
  return <CourseExplorer courses={courses} />;
}
