package org.manazeak.manazeak.mapper.gobal;

import org.manazeak.manazeak.constant.library.LibraryItemTypeEnum;
import org.mapstruct.Mapper;

/**
 * Handles the mappings of library items.
 */
@Mapper
public interface LibraryItemMapper {

    LibraryItemTypeEnum parseItem(String item);
}
