package org.manazeak.manazeak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ManaZeakApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManaZeakApplication.class, args);
    }

}
