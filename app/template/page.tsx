import { CourseHeader, Section, Row, Column, Box, Math, MathBlock } from "@/components";

export default function TemplatePage() {
  return (
    <div className="page">
      <CourseHeader title="Course Name" />

      {/* Example Section - Copy and modify this structure for your content */}
      <Section title="Section Title">
        {/* Single column layout */}
        <Box color="blue" title="Definition or Concept">
          <p>
            Description text with inline math: <Math>{"x^2 + y^2 = r^2"}</Math>
          </p>
        </Box>

        {/* Two column layout */}
        <Row>
          <Column width="half">
            <Box color="yellow" border="left" title="Formula 1">
              <MathBlock>{"\\int_a^b f(x) \\, dx"}</MathBlock>
            </Box>
          </Column>
          <Column width="half">
            <Box color="yellow" border="left" title="Formula 2">
              <MathBlock>{"\\sum_{n=1}^{\\infty} a_n"}</MathBlock>
            </Box>
          </Column>
        </Row>

        {/* Three column layout */}
        <Row>
          <Column width="third">
            <Box color="green">
              <p>First column</p>
            </Box>
          </Column>
          <Column width="third">
            <Box color="green">
              <p>Second column</p>
            </Box>
          </Column>
          <Column width="third">
            <Box color="green">
              <p>Third column</p>
            </Box>
          </Column>
        </Row>
      </Section>

      {/*
        Available components:
        - Section: Main content wrapper with title
        - Row: Horizontal flex container
        - Column: width="auto" | "half" | "third" | "two-thirds" | "fourth" | "three-fourths"
        - Box: color="default" | "blue" | "green" | "red" | "yellow" | "gray"
               border="none" | "solid" | "dashed" | "left"
        - Math: Inline LaTeX
        - MathBlock: Display LaTeX
        - Definition, Theorem, Example, Note: Semantic content boxes
      */}
    </div>
  );
}
