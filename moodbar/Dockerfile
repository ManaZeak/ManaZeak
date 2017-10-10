FROM debian:wheezy
RUN mkdir /debfiles
WORKDIR /debfiles
COPY . /debfiles/files
#RUN apt-get update
RUN apt-get update && apt-get install -y \
 moodbar
