package org.manazeak.manazeak.mapper.gobal;

import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface GlobalMapper {
    @Named("stringToList")
    default List<String> stringToList(String value) {
        List<String> list = new ArrayList<>();
        list.add(value);

        return list;
    }
}
