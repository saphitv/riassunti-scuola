import Link from "next/link";

const courses = [
  { slug: "analisi-2", name: "Analisi 2", description: "Integrali, curve, equazioni differenziali" },
  { slug: "numerica", name: "Numerica", description: "Coming soon" },
  { slug: "programmazione-oggetti", name: "Programmazione a Oggetti", description: "Generics, Reflection, Annotations, Nested Classes" },
];

export default function Home() {
  return (
    <div className="page home-page">
      <header className="home-header">
        <h1>Appunti</h1>
        <p>Riassunti per gli esami universitari</p>
      </header>

      <nav className="course-grid">
        {courses.map((course) => (
          <Link key={course.slug} href={`/${course.slug}`} className="course-card">
            <span className="course-card-name">{course.name}</span>
            <span className="course-card-description">{course.description}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
