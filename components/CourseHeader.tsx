interface CourseHeaderProps {
  title: string;
}

export function CourseHeader({ title }: CourseHeaderProps) {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
}
