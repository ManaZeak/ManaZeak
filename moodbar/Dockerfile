FROM debian:wheezy
RUN mkdir /moodbar
RUN mkdir /moodbar/library
RUN mkdir /moodbar/static
WORKDIR /moodbar
RUN apt-get update && apt-get install -y \
 moodbar
