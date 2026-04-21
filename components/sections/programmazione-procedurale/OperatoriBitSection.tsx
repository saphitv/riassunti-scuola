import { Section, Row, Column, Box, CodeBlock } from "@/components/index";

export function OperatoriBitSection() {
  return (
    <Section title="13. Operatori Bit a Bit">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Operatori">
            <ul className="ref-list">
              <li><code>&amp;</code> AND bit a bit</li>
              <li><code>|</code> OR bit a bit</li>
              <li><code>^</code> XOR bit a bit</li>
              <li><code>~</code> NOT (complemento a 1)</li>
              <li><code>&lt;&lt;</code> Shift left (moltiplica x2)</li>
              <li><code>&gt;&gt;</code> Shift right (divide x2)</li>
            </ul>
          </Box>
          <Box color="green" border="left" title="Esempi operatori">
            <CodeBlock language="c">{`// AND: 1 se entrambi i bit sono 1
0x45 & 0x71 = 0x41
// 01000101 & 01110001 = 01000001

// OR: 1 se almeno un bit e' 1
0x47 | 0x53 = 0x57
// 01000111 | 01010011 = 01010111

// XOR: 1 se solo un bit e' 1
0x47 ^ 0x53 = 0x14
// 01000111 ^ 01010011 = 00010100

// NOT: inverte tutti i bit
~0x45 = 0xBA
// ~01000101 = 10111010`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Shift">
            <CodeBlock language="c">{`int i = 0x1C;  // 00011100
i << 1 = 0x38  // 00111000
i >> 2 = 0x07  // 00000111

// Per salvare: i = i << 3;
// Equivale a: i *= 8;`}</CodeBlock>
          </Box>
          <Box color="red" border="left" title="Maschere (Mask)">
            <CodeBlock language="c">{`// Verificare se pari/dispari
int even(int x) {
    return (x & 1) == 0;
}

// Estrarre il quinto bit
(v & 0x10) ? 1 : 0

// Byte di ordine inferiore
v & 0xFF

// Stampare bit di un intero
void printBit(int val) {
    int mask = 1 << 31;
    for (int i = 0; i < 32; i++) {
        putchar((val & mask) ? '1' : '0');
        val <<= 1;
    }
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
