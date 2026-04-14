import { Section, Row, Column, Box, Note, CodeBlock } from "@/components";

export function ModularizzazioneSection() {
  return (
    <Section title="15. Modularizzazione">
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Struttura moduli">
            <CodeBlock language="c">{`// clear.h (dichiarazioni)
#pragma once
void clearscreen();

// clear.c (definizioni)
#include "clear.h"
void clearscreen() {
    printf("\\033[2J");
}`}</CodeBlock>
            <Note>
              <strong>.h</strong> = interfaccia (dichiarazioni)
              <br />
              <strong>.c</strong> = implementazione (definizioni)
            </Note>
          </Box>
          <Box color="gray" border="left" title="Compilazione">
            <CodeBlock language="bash">{`gcc -c clear.c  # -> clear.o
gcc -c use.c    # -> use.o
gcc use.o clear.o  # link`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Include guards">
            <CodeBlock language="c">{`// Metodo 1: #pragma once
#pragma once
void myfunc();

// Metodo 2: #ifndef
#ifndef __CLEAR__
#define __CLEAR__
void clearscreen();
#endif`}</CodeBlock>
            <Note>Evita inclusioni multiple dello stesso header</Note>
          </Box>
          <Box color="purple" border="left" title="static (privato)">
            <CodeBlock language="c">{`// Nel file .c
static int counter = 0;
static int helper() { ... }

// Visibile SOLO in questo
// modulo (come private)`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="yellow" border="left" title="extern (pubblico)">
            <CodeBlock language="c">{`// modulo_a.c
int global_var = 10;

// modulo_b.c
extern int global_var;
// Usa variabile di modulo_a`}</CodeBlock>
            <Note>
              <code>extern</code> nel modulo che <em>usa</em> la variabile, non
              in quello che la definisce
            </Note>
          </Box>
          <Box color="red" border="left" title="Gestione errori">
            <CodeBlock language="c">{`#include <errno.h>

errno = 0;
y = sqrt(x);
if (errno) {
    perror("Errore sqrt");
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>
      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Modulo Stack (header)">
            <CodeBlock language="c">{`// stack.h
#pragma once
#define MAX 20

typedef struct stack {
    int memory[MAX];
    int sp;
} Stack;

void push(Stack *, int);
int pop(Stack *);
int top(Stack *);
void initStack(Stack *);`}</CodeBlock>
            <Note>
              Struct nell&apos;header permette istanze multiple
            </Note>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Modulo Stack (impl)">
            <CodeBlock language="c">{`// stack.c
#include "stack.h"

static int full(Stack *s) {
    return s->sp == MAX;
}

void push(Stack *s, int elt) {
    if (!full(s))
        s->memory[s->sp++] = elt;
}

int pop(Stack *s) {
    return s->memory[--s->sp];
}

void initStack(Stack *s) {
    s->sp = 0;
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="purple" border="left" title="Tipo opaco">
            <CodeBlock language="c">{`// stack.h (opaco)
#pragma once
typedef struct stack Stack;

void push(Stack *, int);
Stack *createStack();
void freeStack(Stack *);

// stack.c
struct stack {
    int memory[MAX];
    int sp;
};`}</CodeBlock>
            <Note>
              Client non vede i campi interni, solo puntatori
            </Note>
          </Box>
          <Box color="yellow" border="left" title="Costruttore/Distruttore">
            <CodeBlock language="c">{`Stack *createStack() {
    Stack *s = malloc(sizeof(Stack));
    s->sp = 0;
    return s;
}

void freeStack(Stack *s) {
    free(s);
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
