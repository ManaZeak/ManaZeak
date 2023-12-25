package org.manazeak.manazeak.mapper.management;

import org.manazeak.manazeak.constant.management.ConfigurationEnum;
import org.manazeak.manazeak.entity.management.Configuration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ConfigurationMapper {

    @Mapping(target = "value", source = "defaultValue")
    @Mapping(target = "configurationId", source = "configId")
    Configuration fromConfigurationEnum(ConfigurationEnum config);

}
