package org.manazeak.manazeak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.logging.Level;
import java.util.logging.Logger;

@SpringBootApplication
@EnableAsync
public class ManaZeakApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManaZeakApplication.class, args);
    }

}
