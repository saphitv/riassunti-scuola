import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components";

export function HibernateJpaSection() {
  return (
    <Section title="10. Hibernate & JPA (ORM)">
      <Definition term="Object-Relational Mapping">
        Mappa classi ↔ tabelle, oggetti ↔ righe, campi ↔ colonne.{" "}
        <strong>JPA</strong> = specifica standard (EntityManager, JPQL).{" "}
        <strong>Hibernate</strong> = implementazione JPA (usa JDBC internamente).
      </Definition>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Entity & Annotations">
            <CodeBlock language="java">{`@Entity
@Table(name = "users") // opzionale
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name") // opzionale
    private String name;

    @Transient // NON persistito
    private String tempData;

    // Costruttore no-arg OBBLIGATORIO
    public User() {}
}`}</CodeBlock>
            <Note>
              Usa <code>jakarta.persistence.*</code> (non javax con JPA 3+).
            </Note>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Relazioni tra Entity">
            <CodeBlock language="java">{`@Entity
public class Order {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order")
    @OrderBy("id asc")
    private List<OrderItem> items;
}

// Relazioni: @OneToOne, @OneToMany,
//            @ManyToOne, @ManyToMany`}</CodeBlock>
          </Box>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="yellow" border="left" title="Field vs Property Access">
            <p>
              <strong>Field access:</strong> annotations sui campi (consigliato)
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
              <li>JPA usa reflection direttamente</li>
              <li>Più leggibile, getter/setter opzionali</li>
              <li>Logica custom nei getter senza interferire</li>
            </ul>
            <p style={{ marginTop: "0.5em" }}>
              <strong>Property access:</strong> annotations sui getter
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
              <li>JPA usa getter/setter</li>
              <li>Meno flessibile</li>
            </ul>
          </Box>
        </Column>
        <Column width="half">
          <Box color="red" border="left" title="Requisiti & Gotchas">
            <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
              <li>
                <strong>Costruttore no-arg</strong> obbligatorio (può essere private)
              </li>
              <li>
                <strong>equals()/hashCode()</strong>: attenzione! Possono rompere
                collections e identity logic
              </li>
              <li>
                <strong>Lazy loading</strong> (default per associazioni): le
                reference vengono caricate on-demand
              </li>
              <li>
                Navigare object graph come se fosse in memoria
              </li>
            </ul>
            <Note>
              LazyInitializationException se accedi a lazy reference fuori dalla session!
            </Note>
          </Box>
        </Column>
      </Row>

      <Box color="gray" border="left" title="JDBC vs JPA (quando usare cosa)">
        <Row>
          <Column width="half">
            <p><strong>JDBC diretto:</strong></p>
            <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
              <li>Query SQL complesse/ottimizzate</li>
              <li>Bulk operations ad alte performance</li>
              <li>Controllo totale sulle query</li>
            </ul>
            <CodeBlock language="java">{`Connection conn = DriverManager.getConnection(url);
PreparedStatement ps = conn.prepareStatement(sql);
ResultSet rs = ps.executeQuery();`}</CodeBlock>
          </Column>
          <Column width="half">
            <p><strong>JPA/Hibernate:</strong></p>
            <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
              <li>CRUD standard, modello a oggetti</li>
              <li>Relazioni e navigazione tra entità</li>
              <li>Portabilità tra database</li>
            </ul>
            <CodeBlock language="java">{`// EntityManager gestisce persistence context
User user = entityManager.find(User.class, id);
entityManager.persist(newUser);
entityManager.merge(updatedUser);`}</CodeBlock>
          </Column>
        </Row>
      </Box>
    </Section>
  );
}
