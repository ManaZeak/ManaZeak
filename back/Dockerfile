# Getting a maven image to build the project.
FROM maven:3-eclipse-temurin-21-alpine AS builder
RUN mkdir /ManaZeak/
ADD pom.xml /ManaZeak/pom.xml
WORKDIR /ManaZeak
RUN mkdir back/
RUN mkdir front/
ADD back/pom.xml /ManaZeak/back/pom.xml
ADD front/pom.xml /ManaZeak/front/pom.xml
# Downloading the dependancies.
# This is used to use the docker cache and avoiding to download the package every time.
RUN --mount=type=cache,target=/root/.m2 mvn clean verify --fail-never -DskipTests -Dskip.npm -Dskip.karma -Dskip.webpack -Dskip.installnodenpm

# Adding source files.
ADD ./ /ManaZeak
RUN --mount=type=cache,target=/root/.m2 mvn clean package -DskipTests -Dskip.npm -Dskip.karma -Dskip.webpack -Dskip.installnodenpm

# Generating the private and public key for the JWT tokens.
FROM alpine:latest AS key_gen

RUN apk update && \
  apk add --no-cache openssl && \
  rm -rf /var/cache/apk/*
RUN mkdir key
WORKDIR /key
# Generating the private key.
RUN openssl genrsa -out private 4096
# Generating the public key.
RUN openssl rsa -in private -outform PEM -pubout -out public


# Creating the production image
FROM eclipse-temurin:21-jdk-alpine AS app_debug
# Getting the jar from the builder container.
COPY --from=builder /ManaZeak/back/target/*.jar /manazeak.jar
# Copying the RSA keys from the key_gen container.
RUN mkdir key
COPY --from=key_gen /key/* /key/
RUN ls /key
# Unpacking the jar
RUN jar -xf manazeak.jar
RUN mkdir app
# Moving the app executable into a folder
RUN mv /BOOT-INF/lib /app
RUN mv /META-INF /app
RUN mv /BOOT-INF/classes/* /app/
# Launching the app
ENTRYPOINT ["java","-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005","-cp","app:app/lib/*","org.manazeak.manazeak.ManaZeakApplication"]

# Creating the production image
FROM eclipse-temurin:21-jdk-alpine AS app
# Getting the jar from the builder container.
COPY --from=builder /ManaZeak/back/target/*.jar /manazeak.jar
# Copying the RSA keys from the key_gen container.
RUN mkdir key
COPY --from=key_gen /key/* /key/
RUN ls /key
# Unpacking the jar
RUN jar -xf manazeak.jar
RUN mkdir app
# Moving the app executable into a  folder
RUN mv /BOOT-INF/lib /app
RUN mv /META-INF /app
RUN mv /BOOT-INF/classes/* /app/
# Launching the app
ENTRYPOINT ["java","-cp","app:app/lib/*","org.manazeak.manazeak.ManaZeakApplication"]

