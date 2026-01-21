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
      <Definition term="Spring Framework">
        Framework Java + IoC container. Gestisce oggetti (&quot;beans&quot;), il loro
        ciclo di vita e le dipendenze. <strong>Spring Boot</strong> aggiunge
        convenzioni e auto-configurazione per app standalone production-ready.
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="IoC e Dependency Injection">
            <p>
              <strong>IoC:</strong> il container gestisce creazione e wiring degli oggetti.
            </p>
            <CodeBlock language="java">{`// BAD: tight coupling
Item item = new ItemImpl1();

// GOOD: dependency injection
public class Store {
    private final Item item;

    // Constructor injection (preferito)
    @Autowired
    public Store(Item item) {
        this.item = item;
    }
}`}</CodeBlock>
            <Note>
              <strong>ApplicationContext</strong> = interfaccia del container che
              istanzia, configura e assembla i beans.
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Definire Beans">
            <CodeBlock language="java">{`// Metodo 1: @Configuration + @Bean
@Configuration
public class AppConfig {
    @Bean
    public Item item() {
        return new ItemImpl();
    }
}

// Metodo 2: Component scanning
@Component  // oppure @Service, @Repository
public class ItemImpl implements Item { }

// Il container inietta automaticamente
@Autowired
private Item item;`}</CodeBlock>
            <Note>
              Scope default dei beans: <strong>singleton</strong>.
            </Note>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Spring Boot Features">
            <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
              <li>
                <strong>Embedded server</strong> (Tomcat/Jetty) → no WAR deploy
              </li>
              <li>
                <strong>Starters</strong>: dipendenze pre-configurate
              </li>
              <li>
                <strong>Auto-configuration</strong>: configura Spring + librerie
              </li>
              <li>
                <strong>No XML</strong>: tutto via annotations
              </li>
            </ul>
            <CodeBlock language="bash">{`# Build e run
mvn package
java -jar target/app.jar
# Test
curl http://localhost:8080/users`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="purple" border="left" title="REST Controller">
            <CodeBlock language="java">{`@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
            userService.findById(id));
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
}`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Box color="gray" border="left" title="Stereotype Annotations">
        <Row>
          <Column width="third">
            <p>
              <code>@Component</code>
              <br />
              Bean generico gestito dal container
            </p>
          </Column>
          <Column width="third">
            <p>
              <code>@Service</code>
              <br />
              Business logic layer
            </p>
          </Column>
          <Column width="third">
            <p>
              <code>@Repository</code>
              <br />
              Data access layer (+ exception translation)
            </p>
          </Column>
        </Row>
      </Box>
    </Section>
  );
}
