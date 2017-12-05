FROM alpine:3.7

RUN apk add --update \
    gcc \
    g++ \
    make \
    libc-dev \
    fftw \
    fftw-dev \
    gstreamer0.10-dev \
    gst-plugins-ugly0.10 \
    gst-plugins-base0.10 \
    gst-plugins-good0.10 \
    python3

# Create folders for moodbars
RUN mkdir -p /moodbar/library
RUN mkdir -p /moodbar/static
COPY moodbar_generator.py /moodbar

# moodbar compilation
WORKDIR /tmp
COPY moodbar-0.1.2.tar.gz /tmp
RUN tar xf moodbar-0.1.2.tar.gz
WORKDIR /tmp/moodbar-0.1.2
RUN ./configure && make && make install
RUN rm -rf /tmp/moodbar-0.1.2 /tmp/moodbar-0.1.2.tar.gz

WORKDIR /moodbar

# Cleaning
RUN apk del --purge \
    gcc \
    g++ \
    make \
    libc-dev \
    fftw-dev \
    gstreamer0.10-dev
RUN rm -rf /var/cache/apk/*

ENTRYPOINT ["ash", "-c"]
ENTRYPOINT ["python3", "moodbar_generator.py"]
