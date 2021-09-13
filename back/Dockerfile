# Getting a maven image to build the project.
FROM maven:3.6.3-openjdk-11 as builder
RUN mkdir /ManaZeak/
ADD pom.xml /ManaZeak/pom.xml
WORKDIR /ManaZeak
RUN mkdir back/
RUN mkdir front/
ADD back/pom.xml /ManaZeak/back/pom.xml
ADD front/pom.xml /ManaZeak/front/pom.xml
ADD back/src/dev/lib/jaudiotagger-2.2.6-SNAPSHOT.jar /jaudiotagger.jar
# Adding the JAudiotagger dependancy manualy, the repo is outdated...
RUN mvn install:install-file -Dfile=/jaudiotagger.jar -DgroupId=org.bitbucket.ijabz -DartifactId=jaudiotagger -Dversion=1 -Dpackaging=jar -DgeneratePom=true
# Downloading the dependancies.
# This is used to use the docker cache and avoiding to download the package every time.
RUN mvn clean verify --fail-never

# Adding source files.
ADD ./ /ManaZeak
RUN mvn clean package -DskipTests -Dskip.npm -Dskip.karma -Dskip.webpack


# Creating the production image
FROM adoptopenjdk/openjdk11:alpine-slim as app_debug
# Getting the jar from the builder container.
COPY --from=builder /ManaZeak/back/target/*.jar /manazeak.jar
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
FROM adoptopenjdk/openjdk11:alpine-slim as app
# Getting the jar from the builder container.
COPY --from=builder /ManaZeak/back/target/*.jar /manazeak.jar
# Unpacking the jar
RUN jar -xf manazeak.jar
RUN mkdir app
# Moving the app executable into a folder
RUN mv /BOOT-INF/lib /app
RUN mv /META-INF /app
RUN mv /BOOT-INF/classes/* /app/
# Launching the app
ENTRYPOINT ["java","-cp","app:app/lib/*","org.manazeak.manazeak.ManaZeakApplication"]

