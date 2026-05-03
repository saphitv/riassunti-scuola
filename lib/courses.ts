/**
 * Single source of truth for the course catalog shown on the home page.
 *
 * Each course carries one or more categories (multi-valued) and a semester.
 * The landing page filters against these fields.
 */

export type CourseCategory = "programming" | "math" | "hardware";
export type Semester = 3 | 4;

/**
 * A clickable sub-route of a course. When a course is split into multiple
 * parts (e.g. a long subject covered in two halves), each part has its own
 * page and shows up in the home-page card hover overlay.
 *
 * - `slug` is the path fragment appended to the course slug. Use `""` for
 *   the part that lives at the course root, e.g. `/microcontrollori`.
 * - `numeral` is a short Roman label rendered in the overlay (I, II, ...).
 */
export interface CoursePart {
  slug: string;
  numeral: string;
  title: string;
  description: string;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  categories: CourseCategory[];
  semester: Semester;
  /** Extra tokens that boost search hits (e.g. "bayes", "pic32"). */
  keywords: string[];
  /** Optional split into multiple parts — surfaced on hover from the home card. */
  parts?: CoursePart[];
}

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
  programming: "Programmazione",
  math: "Matematica",
  hardware: "Hardware",
};

export const SEMESTER_ROMAN: Record<Semester, string> = {
  3: "III",
  4: "IV",
};

export const courses: Course[] = [
  {
    slug: "analisi-2",
    title: "Analisi 2",
    description: "Integrali, curve, equazioni differenziali",
    categories: ["math"],
    semester: 3,
    keywords: [
      "integrali",
      "curve parametriche",
      "edo",
      "rotazione",
      "funzioni",
    ],
  },
  {
    slug: "numerica",
    title: "Numerica",
    description: "Zeri di funzioni, sistemi lineari",
    categories: ["math"],
    semester: 3,
    keywords: ["bisezione", "newton", "gauss", "zeri", "sistemi lineari"],
  },
  {
    slug: "programmazione-oggetti",
    title: "Programmazione a Oggetti",
    description: "Generics, Reflection, Annotations, Lambda, Spring",
    categories: ["programming"],
    semester: 3,
    keywords: [
      "java",
      "generics",
      "reflection",
      "annotations",
      "lambda",
      "stream",
      "spring",
      "hibernate",
      "records",
      "sealed",
    ],
  },
  {
    slug: "programmazione-procedurale",
    title: "Programmazione Procedurale",
    description: "Stringhe, puntatori, struct, I/O",
    categories: ["programming"],
    semester: 3,
    keywords: [
      "c",
      "puntatori",
      "struct",
      "union",
      "macro",
      "include",
      "io",
      "bit",
      "tempo",
    ],
  },
  {
    slug: "microcontrollori",
    title: "Microcontrollori",
    description: "PIC32, GPIO, UART, Timer, sistemi embedded",
    categories: ["programming", "hardware"],
    semester: 4,
    keywords: [
      "pic32",
      "gpio",
      "uart",
      "timer",
      "embedded",
      "microcontroller",
      "interrupt",
      "adc",
      "spi",
      "pwm",
      "output compare",
    ],
    parts: [
      {
        slug: "",
        numeral: "I",
        title: "Parte I",
        description: "GPIO, UART, Timer",
      },
      {
        slug: "part-2",
        numeral: "II",
        title: "Parte II",
        description: "Interrupt",
      },
    ],
  },
  {
    slug: "probabilita-e-statistica",
    title: "Probabilità e Statistica",
    description: "Eventi, probabilità condizionata, Bayes, indipendenza",
    categories: ["math"],
    semester: 4,
    keywords: [
      "bayes",
      "probabilità",
      "statistica",
      "condizionata",
      "indipendenza",
      "eventi",
    ],
  },
];

/** Most recent semester — selected by default in the home filter. */
export const DEFAULT_SEMESTER: Semester = Math.max(
  ...courses.map((course) => course.semester),
) as Semester;
