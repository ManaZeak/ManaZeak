# This image builds the moodbar package.
FROM python:3.8-alpine as builder

RUN mkdir package
ADD ./package /package

RUN apk add --update \
    gcc \
    g++ \
    make \
    libc-dev \
    fftw \
    fftw-dev \
    alsa-lib \
    cairo \
    glib \
    libintl \
    libogg \
    libtheora \
    libvorbis \
    libx11 \
    libxext \
    libxml2 \
    libxv \
    musl \
    pango \
    zlib \
    a52dec \
    lame \
    libmad \
    libmpeg2 \
    x264-libs \
    flac \
    libavc1394 \
    libbz2 \
    libdv \
    libgcc \
    libiec61883 \
    libjpeg-turbo \
    libraw1394 \
    libshout \
    libsoup \
    libstdc++ \
    libxext \
    speex \
    taglib \
    wavpack \
    x264-dev \
    python3

RUN apk add --force-broken-world ./package/*

# moodbar compilation
WORKDIR /tmp
COPY moodbar-0.1.2.tar.gz /tmp
RUN tar xf moodbar-0.1.2.tar.gz
WORKDIR /tmp/moodbar-0.1.2
RUN ./configure && make && make install
RUN rm -rf /tmp/moodbar-0.1.2 /tmp/moodbar-0.1.2.tar.gz
RUN rm -rf /var/cache/apk/*


FROM python:3.8-alpine as mood
# Copying the moodbar executable
COPY --from=builder /usr/local/bin/moodbar /usr/local/bin/moodbar
# Copying libs

COPY --from=builder /lib/libmount.so.1 /lib/libmount.so.1
COPY --from=builder /lib/libblkid.so.1 /lib/libblkid.so.1
COPY --from=builder /usr/lib/ /usr/lib/

# Copying the plugin
COPY --from=builder /usr/lib/gstreamer-0.10 /usr/lib/gstreamer-0.10

# Create folders for moodbars
RUN mkdir -p /moodbar/library
RUN mkdir -p /moodbar/static
COPY moodbar_generator.py /moodbar

WORKDIR /moodbar
CMD ["python3", "-u", "/moodbar/moodbar_generator.py"]
