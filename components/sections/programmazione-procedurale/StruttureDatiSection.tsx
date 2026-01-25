import { Section, Row, Column, Box, CodeBlock, Note } from "@/components";

export function StruttureDatiSection() {
  return (
    <Section title="12. Strutture Dati">
      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Lista Concatenata (Linked List)">
            <CodeBlock language="c">{`typedef struct Nodo {
    int dato;
    struct Nodo *next;
} Nodo;

// Creazione nuovo nodo
Nodo *creaNodo(int val) {
    Nodo *nuovo = malloc(sizeof(Nodo));
    nuovo->dato = val;
    nuovo->next = NULL;
    return nuovo;
}

// Inserimento in testa
void inserisciTesta(Nodo **head, int val) {
    Nodo *nuovo = creaNodo(val);
    nuovo->next = *head;
    *head = nuovo;
}

// Inserimento in coda
void inserisciCoda(Nodo **head, int val) {
    Nodo *nuovo = creaNodo(val);
    if (*head == NULL) {
        *head = nuovo;
        return;
    }
    Nodo *temp = *head;
    while (temp->next != NULL)
        temp = temp->next;
    temp->next = nuovo;
}`}</CodeBlock>
          </Box>
          <Box color="green" border="left" title="Operazioni su Lista">
            <CodeBlock language="c">{`// Ricerca elemento
Nodo *cerca(Nodo *head, int val) {
    while (head != NULL) {
        if (head->dato == val)
            return head;
        head = head->next;
    }
    return NULL;
}

// Eliminazione nodo
void elimina(Nodo **head, int val) {
    Nodo *temp = *head, *prev = NULL;
    if (temp && temp->dato == val) {
        *head = temp->next;
        free(temp);
        return;
    }
    while (temp && temp->dato != val) {
        prev = temp;
        temp = temp->next;
    }
    if (temp == NULL) return;
    prev->next = temp->next;
    free(temp);
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="yellow" border="left" title="Lista Bidirezionale">
            <CodeBlock language="c">{`typedef struct NodoBi {
    int dato;
    struct NodoBi *prev;
    struct NodoBi *next;
} NodoBi;

// Inserimento in lista bidirezionale
void inserisciBi(NodoBi **head, int val) {
    NodoBi *nuovo = malloc(sizeof(NodoBi));
    nuovo->dato = val;
    nuovo->prev = NULL;
    nuovo->next = *head;
    if (*head != NULL)
        (*head)->prev = nuovo;
    *head = nuovo;
}`}</CodeBlock>
            <Note>
              La lista bidirezionale permette di navigare in entrambe le
              direzioni (prev/next) ma richiede il doppio della memoria per i
              puntatori.
            </Note>
          </Box>
          <Box color="purple" border="left" title="Albero Binario">
            <CodeBlock language="c">{`typedef struct NodoAlbero {
    int dato;
    struct NodoAlbero *sx;
    struct NodoAlbero *dx;
} NodoAlbero;

// Inserimento in BST (Binary Search Tree)
NodoAlbero *inserisci(NodoAlbero *root, int val) {
    if (root == NULL) {
        NodoAlbero *nuovo = malloc(sizeof(NodoAlbero));
        nuovo->dato = val;
        nuovo->sx = nuovo->dx = NULL;
        return nuovo;
    }
    if (val < root->dato)
        root->sx = inserisci(root->sx, val);
    else
        root->dx = inserisci(root->dx, val);
    return root;
}

// Visita in-order (ordinata)
void inOrder(NodoAlbero *root) {
    if (root != NULL) {
        inOrder(root->sx);
        printf("%d ", root->dato);
        inOrder(root->dx);
    }
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>
      <Row>
        <Column width="half">
          <Box color="red" border="left" title="Hash Table - Chaining (Open)">
            <CodeBlock language="c">{`#define SIZE 10
Nodo *table[SIZE]; // array di liste

int hash(int key) {
    return key % SIZE;
}

void insert(int key) {
    int idx = hash(key);
    inserisciTesta(&table[idx], key);
}

Nodo *search(int key) {
    int idx = hash(key);
    return cerca(table[idx], key);
}`}</CodeBlock>
            <Note>
              Chaining: ogni slot contiene una lista di elementi con stesso
              hash. Gestisce collisioni senza limiti.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="gray" border="left" title="Hash Table - Open Addressing (Closed)">
            <CodeBlock language="c">{`int table[SIZE];
int occupied[SIZE] = {0};

// Linear probing
void insert(int key) {
    int idx = hash(key);
    while (occupied[idx])
        idx = (idx + 1) % SIZE;
    table[idx] = key;
    occupied[idx] = 1;
}

int search(int key) {
    int idx = hash(key);
    while (occupied[idx]) {
        if (table[idx] == key) return idx;
        idx = (idx + 1) % SIZE;
    }
    return -1; // non trovato
}`}</CodeBlock>
            <Note>
              Open addressing: cerca slot libero nella tabella stessa. Linear
              probing soffre di clustering.
            </Note>
          </Box>
        </Column>
      </Row>
    </Section>
  );
}
