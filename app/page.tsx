import { CourseCardLink } from "@/components";

const courses = [
  { slug: "analisi-2", name: "Analisi 2", description: "Integrali, curve, equazioni differenziali" },
  { slug: "numerica", name: "Numerica (Semestre 1)", description: "Trovare zeri di funzioni, sistemi lineari" },
  { slug: "programmazione-oggetti", name: "Programmazione a Oggetti", description: "Generics, Reflection, Annotations, Nested Classes" },
  { slug: "probabilita-e-statistica", name: "Probabilita e Statistica", description: "Eventi, probabilita condizionata, Bayes, indipendenza" },
  { slug: "programmazione-procedurale", name: "Programmazione Procedurale", description: "Stringhe, Puntatori, Struct, I/O, Tempo" },
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
          <CourseCardLink
            key={course.slug}
            slug={course.slug}
            name={course.name}
            description={course.description}
          />
        ))}
      </nav>
    </div>
  );
}
