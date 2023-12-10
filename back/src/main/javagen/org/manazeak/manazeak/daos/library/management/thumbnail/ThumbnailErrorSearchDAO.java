package org.manazeak.manazeak.daos.library.management.thumbnail;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.entity.dto.admin.thumbnail.ThumbnailErrorCriteriaDto;
import org.manazeak.manazeak.entity.dto.admin.thumbnail.ThumbnailErrorLineDto;
import org.manazeak.manazeak.entity.management.ThumbnailError;
import org.manazeak.manazeak.entity.management.ThumbnailError_;
import org.manazeak.manazeak.entity.reference.ThumbErrorType;
import org.manazeak.manazeak.entity.reference.ThumbErrorType_;
import org.manazeak.manazeak.entity.track.*;
import org.manazeak.manazeak.util.FieldUtil;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Allows searching thumbnail error in the database.
 */
@Repository
@RequiredArgsConstructor
public class ThumbnailErrorSearchDAO {

    /**
     * The size of the page for this search.
     */
    private static final int PAGE_SIZE = 20;

    private final EntityManager em;

    /**
     * Create the predicate used to filter the entity type used by the request.
     *
     * @param entityType The type of entities to filter in the request.
     * @param builder    The builder of the request.
     * @param tables     The tables used by this request.
     * @return The predicate that will be used for the requests.
     */
    private static Predicate getEntityTypeFilter(Long entityType,
                                                 CriteriaBuilder builder,
                                                 ThumbnailUsedTables tables) {
        // If there is no constraint on the entity id, then no expression to apply.
        if (entityType == null) {
            return null;
        }

        // Getting the thumbnail type.
        ThumbnailTypeEnum thumbnailType = ThumbnailTypeEnum.getThumbTypeByEntityTypeId(entityType);

        // Returning the filter for the entity type.
        return switch (thumbnailType) {
            case ALBUM -> builder.isNotNull(tables.thumbErrorAlbum.get(Album_.ALBUM_ID));
            case GENRE -> builder.isNotNull(tables.thumbErrorGenre.get(Genre_.GENRE_ID));
            case ARTIST -> builder.isNotNull(tables.thumbErrorArtist.get(Artist_.ARTIST_ID));
            case LABEL -> builder.isNotNull(tables.thumbErrorLabel.get(Label_.LABEL_ID));
        };
    }

    /**
     * Apply the criteria to the query depending on the content of the criteria.
     *
     * @param criteria The information used to filter the results of the query.
     * @param builder  The criteria builder.
     * @param query    The query to be built.
     * @param tables   The tables used by this request.
     */
    private static void applyCriteria(ThumbnailErrorCriteriaDto criteria, CriteriaBuilder builder,
                                      CriteriaQuery<?> query, ThumbnailUsedTables tables) {
        List<Predicate> conditions = new ArrayList<>();
        // Define the where clause with the information contained in the criteria.
        if (criteria.entityTypeId() != null) {
            Predicate predicate = getEntityTypeFilter(criteria.entityTypeId(), builder, tables);
            if (predicate != null) {
                conditions.add(predicate);
            }
        }

        // Add the condition on the error type.
        if (criteria.errorType() != null) {
            conditions.add(builder.equal(tables.thumbErrorType.get(ThumbErrorType_.THUMB_ERROR_TYPE_ID), criteria.errorType()));
        }

        // Add the condition on the processed error
        if (criteria.processed() != null) {
            conditions.add(builder.equal(tables.root.get(ThumbnailError_.PROCESSED), criteria.processed()));
        }

        // Add the where clause on the query.
        if (!conditions.isEmpty()) {
            Predicate[] test = conditions.toArray(new Predicate[0]);
            // Applying all the condition to the request.
            query.where(test);
        }
    }

    /**
     * Build thumbnail table structures.
     *
     * @param query The query being built.
     * @return The tables used for the request.
     */
    private static ThumbnailUsedTables getThumbnailUsedTables(CriteriaQuery<?> query) {
        Root<ThumbnailError> root = query.from(ThumbnailError.class);

        // Joining the other elements.
        Join<ThumbnailError, Label> thumbErrorLabel = root.join(ThumbnailError_.label, JoinType.LEFT);
        Join<ThumbnailError, Artist> thumbErrorArtist = root.join(ThumbnailError_.artist, JoinType.LEFT);
        Join<ThumbnailError, Genre> thumbErrorGenre = root.join(ThumbnailError_.genre, JoinType.LEFT);
        Join<ThumbnailError, Album> thumbErrorAlbum = root.join(ThumbnailError_.album, JoinType.LEFT);
        Join<ThumbnailError, ThumbErrorType> thumbErrorType = root.join(ThumbnailError_.thumbErrorType);

        return new ThumbnailUsedTables(root, thumbErrorLabel, thumbErrorArtist, thumbErrorGenre, thumbErrorAlbum, thumbErrorType);
    }

    /**
     * Get thumbnail generation errors filtered by the user option.
     *
     * @param criteria The information about the filters to apply to the request.
     * @return The element corresponding to the user filter.
     */
    public List<ThumbnailErrorLineDto> getThumbnailsFromCriteria(ThumbnailErrorCriteriaDto criteria) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<ThumbnailErrorLineDto> query = builder.createQuery(ThumbnailErrorLineDto.class);
        // Setting the starting table of the query.
        ThumbnailUsedTables tables = getThumbnailUsedTables(query);

        // Creating coalesce to get the name of the element.
        CriteriaBuilder.Coalesce<String> coalesce = builder.coalesce();
        coalesce.value(tables.thumbErrorArtist.get(Artist_.NAME))
                .value(tables.thumbErrorLabel.get(Label_.NAME))
                .value(tables.thumbErrorGenre.get(Genre_.NAME))
                .value(tables.thumbErrorAlbum.get(Album_.TITLE));


        // Creating the select with the projection.
        query.select(
                builder.construct(
                        ThumbnailErrorLineDto.class,
                        tables.root.get(ThumbnailError_.THUMB_ERR_ID),
                        tables.root.get(ThumbnailError_.ERROR),
                        tables.root.get(ThumbnailError_.PROCESSED),
                        tables.thumbErrorLabel.get(Label_.LABEL_ID),
                        tables.thumbErrorAlbum.get(Album_.ALBUM_ID),
                        tables.thumbErrorGenre.get(Genre_.GENRE_ID),
                        tables.thumbErrorArtist.get(Artist_.ARTIST_ID),
                        coalesce,
                        tables.thumbErrorType.get(ThumbErrorType_.CODE)
                )
        );

        // Apply the criteria on the request
        applyCriteria(criteria, builder, query, tables);

        // Adding an order to always have the same result order.
        query.orderBy(builder.asc(tables.root.get(ThumbnailError_.THUMB_ERR_ID)));

        // Requesting the database.
        return em.createQuery(query)
                .setFirstResult(FieldUtil.getIntFromInteger(criteria.page()) * PAGE_SIZE)
                .setMaxResults(PAGE_SIZE)
                .getResultList();
    }

    public Long getNumberThumbError(ThumbnailErrorCriteriaDto criteria) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        // Setting the return type of the query.
        CriteriaQuery<Long> query = builder.createQuery(Long.class);

        // Getting the tables needed for the request.
        ThumbnailUsedTables tables = getThumbnailUsedTables(query);

        // Setting the selected columns.
        query.select(
                builder.count(tables.root)
        );

        // Applying the search criteria.
        applyCriteria(criteria, builder, query, tables);

        // Run the query.
        return em.createQuery(query).getSingleResult();
    }


    /**
     * Data structure used to store the tables used by the request.
     *
     * @param root             The starting table of the query.
     * @param thumbErrorLabel  The label table linked to the thumbnail error.
     * @param thumbErrorArtist The artist table linked to the thumbnail error table.
     * @param thumbErrorGenre  The genre table linked to the thumbnail error table.
     * @param thumbErrorAlbum  The album table linked to the thumbnail error table.
     * @param thumbErrorType   The thumbnail error type table linked to the thumbnail error table.
     */
    private record ThumbnailUsedTables(Root<ThumbnailError> root, Join<ThumbnailError, Label> thumbErrorLabel,
                                       Join<ThumbnailError, Artist> thumbErrorArtist,
                                       Join<ThumbnailError, Genre> thumbErrorGenre,
                                       Join<ThumbnailError, Album> thumbErrorAlbum,
                                       Join<ThumbnailError, ThumbErrorType> thumbErrorType) {
    }

}
