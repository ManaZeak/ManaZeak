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
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Allows to search the thumbnails error in the database.
 */
@Repository
@RequiredArgsConstructor
public class ThumbnailErrorSearchDAO {

    private static final int PAGE_SIZE = 20;

    private final EntityManager em;

    /**
     * Create the predicate used to filter the entity type used by the request.
     *
     * @param entityType       The type of entities to filter in the request.
     * @param builder          The builder of the request.
     * @param thumbErrorArtist The join association for the artist.
     * @param thumbErrorLabel  The join association for the label.
     * @param thumbErrorGenre  The join association for the genre.
     * @param thumbErrorAlbum  The join association for the albums.
     * @return The predicate that will be used for the requests.
     */
    private static Predicate getEntityTypeFilter(Long entityType,
                                                 CriteriaBuilder builder,
                                                 Join<ThumbnailError, Artist> thumbErrorArtist,
                                                 Join<ThumbnailError, Label> thumbErrorLabel,
                                                 Join<ThumbnailError, Genre> thumbErrorGenre,
                                                 Join<ThumbnailError, Album> thumbErrorAlbum) {
        // If there is no constraint on the entity id, then no expression to apply.
        if (entityType == null) {
            return null;
        }

        // Getting the thumbnail type.
        ThumbnailTypeEnum thumbnailType = ThumbnailTypeEnum.getThumbTypeByEntityTypeId(entityType);

        // Returning the filter for the entity type.
        return switch (thumbnailType) {
            case ALBUM -> builder.isNotNull(thumbErrorAlbum.get(Album_.ALBUM_ID));
            case GENRE -> builder.isNotNull(thumbErrorGenre.get(Genre_.GENRE_ID));
            case ARTIST -> builder.isNotNull(thumbErrorArtist.get(Artist_.ARTIST_ID));
            case LABEL -> builder.isNotNull(thumbErrorLabel.get(Label_.LABEL_ID));
        };
    }

    /**
     * Get thumbnail generation errors filtered by the user option.
     *
     * @param pageNumber The page requested by the user.
     * @param criteria   The information about the filters to apply to the request.
     * @return The element corresponding to the user filter.
     */
    public List<ThumbnailErrorLineDto> getThumbnailsFromCriteria(int pageNumber, ThumbnailErrorCriteriaDto criteria) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<ThumbnailErrorLineDto> query = builder.createQuery(ThumbnailErrorLineDto.class);
        // Setting the starting table of the query.
        Root<ThumbnailError> root = query.from(ThumbnailError.class);

        // Joining the other elements.
        Join<ThumbnailError, Label> thumbErrorLabel = root.join(ThumbnailError_.label, JoinType.LEFT);
        Join<ThumbnailError, Artist> thumbErrorArtist = root.join(ThumbnailError_.artist, JoinType.LEFT);
        Join<ThumbnailError, Genre> thumbErrorGenre = root.join(ThumbnailError_.genre, JoinType.LEFT);
        Join<ThumbnailError, Album> thumbErrorAlbum = root.join(ThumbnailError_.album, JoinType.LEFT);
        Join<ThumbnailError, ThumbErrorType> thumbErrorType = root.join(ThumbnailError_.thumbErrorType);


        // Creating coalesce to get the name of the element.
        CriteriaBuilder.Coalesce<String> coalesce = builder.coalesce();
        coalesce.value(thumbErrorArtist.get(Artist_.NAME))
                .value(thumbErrorLabel.get(Label_.NAME))
                .value(thumbErrorGenre.get(Genre_.NAME))
                .value(thumbErrorAlbum.get(Album_.TITLE));


        // Creating the select with the projection.
        query.select(
                builder.construct(
                        ThumbnailErrorLineDto.class,
                        root.get(ThumbnailError_.THUMB_ERR_ID),
                        root.get(ThumbnailError_.ERROR),
                        root.get(ThumbnailError_.PROCESSED),
                        thumbErrorLabel.get(Label_.LABEL_ID),
                        thumbErrorAlbum.get(Album_.ALBUM_ID),
                        thumbErrorGenre.get(Genre_.GENRE_ID),
                        thumbErrorArtist.get(Artist_.ARTIST_ID),
                        coalesce,
                        thumbErrorType.get(ThumbErrorType_.CODE)
                )
        );

        // Apply the criteria on the request
        applyCriteria(
                criteria,
                builder,
                root,
                query,
                thumbErrorArtist,
                thumbErrorLabel,
                thumbErrorGenre,
                thumbErrorAlbum,
                thumbErrorType
        );

        // Adding an order to always have the same result order.
        query.orderBy(builder.asc(root.get(ThumbnailError_.THUMB_ERR_ID)));

        return em.createQuery(query)
                .setFirstResult(pageNumber * PAGE_SIZE)
                .setMaxResults(PAGE_SIZE)
                .getResultList();
    }

    public Long getNumberThumbError(ThumbnailErrorCriteriaDto criteria) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        // Setting the starting table of the query.
        Root<ThumbnailError> root = query.from(ThumbnailError.class);

        // Joining the other elements.
        Join<ThumbnailError, Label> thumbErrorLabel = root.join(ThumbnailError_.label, JoinType.LEFT);
        Join<ThumbnailError, Artist> thumbErrorArtist = root.join(ThumbnailError_.artist, JoinType.LEFT);
        Join<ThumbnailError, Genre> thumbErrorGenre = root.join(ThumbnailError_.genre, JoinType.LEFT);
        Join<ThumbnailError, Album> thumbErrorAlbum = root.join(ThumbnailError_.album, JoinType.LEFT);
        Join<ThumbnailError, ThumbErrorType> thumbErrorType = root.join(ThumbnailError_.thumbErrorType);

        query.select(
                builder.count(root)
        );

        applyCriteria(criteria, builder, root, query, thumbErrorArtist, thumbErrorLabel, thumbErrorGenre, thumbErrorAlbum, thumbErrorType);

        return em.createQuery(query).getSingleResult();
    }

    /**
     * Apply the criteria to the query depending on the content of the criteria.
     *
     * @param criteria         The information used to filter the results of the query.
     * @param builder          The criteria builder.
     * @param root             The starting table of the request.
     * @param query            The query to be build.
     * @param thumbErrorArtist The join relation between artist and thumbnail error.
     * @param thumbErrorLabel  The join relation between label and thumbnail error.
     * @param thumbErrorGenre  The join relation between genre and thumbnail error.
     * @param thumbErrorAlbum  The join relation between album and thumbnail error.
     * @param thumbErrorType   The join relation between thumbnail error type and thumbnail error.
     */
    private static void applyCriteria(ThumbnailErrorCriteriaDto criteria, CriteriaBuilder builder,
                               Root<ThumbnailError> root, CriteriaQuery<?> query,
                               Join<ThumbnailError, Artist> thumbErrorArtist,
                               Join<ThumbnailError, Label> thumbErrorLabel,
                               Join<ThumbnailError, Genre> thumbErrorGenre,
                               Join<ThumbnailError, Album> thumbErrorAlbum,
                               Join<ThumbnailError, ThumbErrorType> thumbErrorType) {
        List<Predicate> conditions = new ArrayList<>();
        // Define the where clause with the information contained in the criteria.
        if (criteria.entityTypeId() != null) {
            Predicate predicate = getEntityTypeFilter(criteria.entityTypeId(), builder, thumbErrorArtist, thumbErrorLabel, thumbErrorGenre, thumbErrorAlbum);
            if (predicate != null) {
                conditions.add(predicate);
            }
        }

        // Add the condition on the error type.
        if (criteria.errorType() != null) {
            conditions.add(builder.equal(thumbErrorType.get(ThumbErrorType_.THUMB_ERROR_TYPE_ID), criteria.errorType()));
        }

        // Add the condition on the processed error
        if (criteria.processed() != null) {
            conditions.add(builder.equal(root.get(ThumbnailError_.PROCESSED), criteria.processed()));
        }

        // Add the where clause on the query.
        if (!conditions.isEmpty()) {
            Predicate[] test = conditions.toArray(new Predicate[0]);
            // Applying all the condition to the request.
            query.where(test);
        }
    }

}
