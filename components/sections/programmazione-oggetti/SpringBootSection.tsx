import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components";

export function SpringBootSection() {
  return (
    <Section title="9. Spring Boot & Dependency Injection">
      <Row>
        <Column width="half">
          <Definition term="Spring Boot">
            Framework Java con IoC container che gestisce oggetti (&quot;beans&quot;) e
            dipendenze. Auto-configurazione, embedded server, no XML.
          </Definition>
        </Column>
        <Column width="half">
          <Definition term="Dependency Injection">
            Il container crea e &quot;inietta&quot; le dipendenze automaticamente tramite
            <code>@Autowired</code> (preferire constructor injection).
          </Definition>
        </Column>
      </Row>

      <Note>
        <strong>Dipendenze progetto (start.spring.io):</strong> Spring Data JPA, Spring Web, H2 Database
      </Note>

      <Box color="gray" border="left" title="Architettura MVC: Controller → Service → Repository → Model">
        <Row>
          <Column width="fourth">
            <p><strong>Controller</strong></p>
            <p>Gestisce HTTP request/response. Chiama il Service.</p>
            <p><code>@RestController</code></p>
          </Column>
          <Column width="fourth">
            <p><strong>Service</strong></p>
            <p>Business logic. Chiama Repository.</p>
            <p><code>@Service</code></p>
          </Column>
          <Column width="fourth">
            <p><strong>Repository</strong></p>
            <p>Accesso dati (CRUD). Interfaccia verso DB.</p>
            <p><code>@Repository</code></p>
          </Column>
          <Column width="fourth">
            <p><strong>Model</strong></p>
            <p>Entità JPA mappate su tabelle DB.</p>
            <p><code>@Entity</code></p>
          </Column>
        </Row>
      </Box>

      <Row>
        <Column width="third">
          <Box color="blue" border="left" title="Model (Entity)">
            <CodeBlock language="java">{`@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String email;
    // getters, setters
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="green" border="left" title="Repository">
            <CodeBlock language="java">{`@Repository
public interface UserRepository
    extends JpaRepository<User, Long> {
    // CRUD già incluso!
    // Query methods automatiche:
    List<User> findByName(String name);
    List<User> findByEmailContaining(String s);
    Optional<User> findByEmail(String email);
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="third">
          <Box color="purple" border="left" title="Controller">
            <CodeBlock language="java">{`@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository repo;

    @GetMapping
    public List<User> getAll() {
        return repo.findAll();
    }
    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
    @PostMapping
    public User create(@RequestBody User u) {
        return repo.save(u);
    }
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="JpaRepository metodi built-in">
            <CodeBlock language="java">{`repo.findAll()              // List<T>
repo.findById(id)           // Optional<T>
repo.save(entity)           // T (insert o update)
repo.deleteById(id)         // void
repo.existsById(id)         // boolean
repo.count()                // long`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Query Methods (naming convention)">
            <CodeBlock language="java">{`findBy<Field>               // WHERE field = ?
findBy<Field>Containing     // WHERE field LIKE %?%
findBy<Field>GreaterThan    // WHERE field > ?
findBy<F1>And<F2>           // WHERE f1 = ? AND f2 = ?
findBy<Field>OrderBy<F>Desc // ORDER BY f DESC
countBy<Field>              // COUNT WHERE field = ?`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Box color="gray" border="left" title="ResponseEntity - Status Codes">
        <CodeBlock language="java">{`@GetMapping("/{id}")
public ResponseEntity<User> get(@PathVariable Long id) {
    return repo.findById(id)
        .map(ResponseEntity::ok)                              // 200 OK
        .orElse(ResponseEntity.notFound().build());           // 404 Not Found
}

@PostMapping
public ResponseEntity<User> create(@RequestBody User u) {
    if (u.getName() == null)
        return ResponseEntity.badRequest().build();           // 400 Bad Request
    User saved = repo.save(u);
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);  // 201 Created
}

// Altri: .noContent() (204), .status(HttpStatus.FORBIDDEN) (403)`}</CodeBlock>
      </Box>
    </Section>
  );
}
