import {
  Section,
  Row,
  Column,
  Box,
  Note,
  Definition,
  CodeBlock,
} from "@/components/index";

export function HibernateJpaSection() {
  return (
    <Section title="10. Hibernate & JPA (ORM)">
      <Row>
        <Column width="half">
          <Definition term="JPA (Java Persistence API)">
            Specifica standard per ORM: mappa classi ↔ tabelle, oggetti ↔ righe.
            Usa EntityManager e JPQL.
          </Definition>
        </Column>
        <Column width="half">
          <Definition term="Hibernate">
            Implementazione di JPA. Usa JDBC internamente. Aggiunge features
            come lazy loading e caching.
          </Definition>
        </Column>
      </Row>

      <Row>
        <Column width="half">
          <Box color="blue" border="left" title="Entity Annotations">
            <CodeBlock language="java">{`@Entity
@Table(name = "users")  // opzionale
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")  // opzionale
    private String name;

    @Transient  // NON persistito
    private String tempData;

    public User() {}  // no-arg OBBLIGATORIO
}`}</CodeBlock>
          </Box>
        </Column>
        <Column width="half">
          <Box color="green" border="left" title="Relazioni">
            <CodeBlock language="java">{`@Entity
public class Order {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> items;
}
// @OneToOne, @OneToMany, @ManyToOne, @ManyToMany`}</CodeBlock>
          </Box>
          <Note>
            <strong>Lazy loading</strong> (default): associazioni caricate on-demand.
            LazyInitializationException se accedi fuori dalla session!
          </Note>
        </Column>
      </Row>

      <Box color="yellow" border="left" title="EntityManager (JPA) vs Spring Data Repository">
        <Row>
          <Column width="half">
            <CodeBlock language="java">{`// JPA EntityManager (basso livello)
User u = em.find(User.class, id);
em.persist(newUser);
em.merge(updatedUser);
em.remove(user);`}</CodeBlock>
          </Column>
          <Column width="half">
            <CodeBlock language="java">{`// Spring Data (preferito, vedi sezione 9)
User u = repo.findById(id).orElseThrow();
repo.save(newUser);
repo.save(updatedUser);  // stesso metodo
repo.delete(user);`}</CodeBlock>
          </Column>
        </Row>
      </Box>
    </Section>
  );
}
