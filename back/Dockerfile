# Getting a maven image to build the project.
FROM maven:3.6.3-openjdk-11 as builder
ADD pom.xml pom.xml
# Downloading the dependancies.
# This is used to use the docker cache and avoiding to download the package every time.
RUN mvn verify clean --fail-never

# Adding source files.
ADD ./ /ManaZeak
WORKDIR /ManaZeak
RUN mvn package -DskipTests

# Creating the production image
FROM adoptopenjdk/openjdk11:alpine-slim as app
# Getting the jar from the builder container.
COPY --from=builder /ManaZeak/target/*.jar /manazeak.jar
# Unpacking the jar
RUN jar -xf manazeak.jar
RUN mkdir app
# Moving the app executable into a folder
RUN mv /BOOT-INF/lib /app
RUN mv /META-INF /app
RUN mv /BOOT-INF/classes/* /app/
RUN echo $(ls /app/)
# Launching the app
ENTRYPOINT ["java","-cp","app:app/lib/*","org.manazeak.manazeak.ManaZeakApplication"]
