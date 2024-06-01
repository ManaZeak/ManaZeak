package org.manazeak.manazeak.configuration.es;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.context.ApplicationContextProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

/**
 * Configures the elastic search client used by the application.
 */
@Configuration
@RequiredArgsConstructor
@EnableElasticsearchRepositories("org.manazeak.manazeak.daos.es")
public class ElasticSearchConfiguration extends ElasticsearchConfiguration {

    private final ApplicationContextProvider applicationContextProvider;
    @Value("${app.elastic.user}")
    private String user;
    @Value("${app.elastic.password}")
    private String password;

    @Override
    @NonNull
    public ClientConfiguration clientConfiguration() {

        return ClientConfiguration.builder()
                .connectedTo("mzk_es01:9200")
                .usingSsl(applicationContextProvider.elasticSearchSslContext())
                .withBasicAuth(user, password)
                .build();
    }
}
