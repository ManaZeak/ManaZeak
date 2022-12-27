package org.manazeak.manazeak.util.database;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Table;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.Metamodel;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.commons.AppContext;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Classe qui gère un pool d'identifiant pour chaque entité.
 *
 * @author fcrapart
 */
public final class PkIdProvider {

    public static final String SEQ_PREFIX = "SEQ_";
    private static final Integer POOL_SIZE_DEFAULT = 1000;
    /**
     * Singleton local au thread
     */
    private static final ThreadLocal<PkIdProvider> THREAD_LOCAL_SINGLETON =
            ThreadLocal.withInitial(PkIdProvider::new);
    private final Map<Class<?>, Integer> poolSizePerClass = new HashMap<>();
    private final Map<Class<?>, List<Long>> idPoolPerClass = new HashMap<>();

    /**
     * Constructeur privé pour l'instance unique
     */
    private PkIdProvider() {

    }

    /**
     * Renvoie une instance unique (locale au thread) du provider d'id
     *
     * @return provider id local au thread
     */
    public static PkIdProvider singleton() {
        return THREAD_LOCAL_SINGLETON.get();
    }

    /**
     * Renvoie un nouvel identifiant unique pour une entité
     *
     * @param objectClass Classe du dt pour lequel on veut des id
     * @return nouvel id dossier
     */
    public Long getNewPkId(final Class<?> objectClass) {
        Metamodel meta = AppContext.getBean(EntityManager.class).getMetamodel();
        EntityType<?> entityType = meta.entity(objectClass);

        // Check whether @Table annotation is present on the class.
        Table t = objectClass.getAnnotation(Table.class);

        String tableName = t == null ? entityType.getName().toUpperCase() : t.name();

        // Init si pas de valeur dans le pool
        final List<Long> idListForClass = idPoolPerClass.computeIfAbsent(objectClass, cle -> new ArrayList<>());

        // Récupération d'un nouveau pool d'id
        if (idListForClass.isEmpty()) {

            // Taille du pool
            Integer taillePool = poolSizePerClass.get(objectClass);
            if (taillePool == null) {
                taillePool = POOL_SIZE_DEFAULT;
            }

            // Récupération du template jdbc pour faire les requêtes
            final JdbcTemplate jdbcTemplate = AppContext.getBean(JdbcTemplate.class);

            try {
                idListForClass.addAll(jdbcTemplate.
                        query(
                                "SELECT nextVal('" + SEQ_PREFIX + tableName + "') " +
                                        "from generate_series(1," + taillePool + ")"
                                , new RowMapper<Long>() {
                                    @Override
                                    public Long mapRow(final ResultSet rs, final int rowNum) throws SQLException {
                                        return rs.getLong(1);
                                    }
                                }
                        )
                );

            } catch (final DataAccessException e) {
                throw new MzkRuntimeException("Impossible to get the pool of ids for the " + tableName, e);
            }
        }

        // Renvoie le premier id de la liste (et le supprime de la liste)
        return idListForClass.remove(0);
    }

    /**
     * Permet de redéfinir la taille du pool d'id dossier à récupérer à chaque fois pour une entité précise
     *
     * @param entityClass classe de l'entité à impacter
     * @param poolSize    nouvelle taille
     */
    public void setPoolSize(final Class<?> entityClass, final Integer poolSize) {
        if (poolSize == null) {
            throw new IllegalArgumentException("The pool size can't be null." + entityClass.getName());
        }

        if (poolSize > 0) {
            throw new IllegalArgumentException("The number of id to be fecthed must be superior to 0 ("
                    + poolSize + " provided)");
        }

        poolSizePerClass.put(entityClass, poolSize);
    }

}
