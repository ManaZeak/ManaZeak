package org.manazeak.manazeak.configuration.context;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.util.commons.AppContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;

/**
 * Automatically initialize the application context.
 */
@Component
@RequiredArgsConstructor
public class ApplicationContextProvider implements ApplicationContextAware {

    @Value("file:/cert/es.crt")
    private Path esCertificate;

    /**
     * Set the application context into the static object.
     *
     * @param ctx The Spring context
     */
    @Override
    public void setApplicationContext(@NonNull ApplicationContext ctx) {
        AppContext.setApplicationContext(ctx);
    }

    /**
     * The SSL context required for communicating with the elastic search.
     *
     * @return The SSL context.
     */
    @Bean
    public SSLContext elasticSearchSslContext() {
        try {
            CertificateFactory cf = CertificateFactory.getInstance("X.509");

            Certificate ca;
            // Opening the certificate in read-only.
            try (InputStream certificateInputStream = Files.newInputStream(esCertificate, StandardOpenOption.READ)) {
                ca = cf.generateCertificate(certificateInputStream);
            }

            // Create a KeyStore containing our trusted CAs
            String keyStoreType = KeyStore.getDefaultType();
            KeyStore keyStore = KeyStore.getInstance(keyStoreType);
            keyStore.load(null, null);
            keyStore.setCertificateEntry("ca", ca);

            // Create a TrustManager that trusts the CAs in our KeyStore
            String tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
            tmf.init(keyStore);

            // Create an SSLContext that uses our TrustManager
            SSLContext context = SSLContext.getInstance("TLS");
            context.init(null, tmf.getTrustManagers(), null);

            return context;
        } catch (Exception e) {
            throw new MzkRuntimeException("Error while building the certificate for ES.", e);
        }
    }

}