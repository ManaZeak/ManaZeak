# Using a debian.
FROM python:3.8-slim-buster as builder

# Updating the image and getting the dependancies.
RUN apt-get update \
&& apt-get install gcc libmemcached-dev zlib1g-dev -y \
&& apt-get clean
ADD ./requirements.txt /ManaZeak/requirements.txt
RUN pip install --user -r /ManaZeak/requirements.txt


FROM python:3.8-slim-buster as app
COPY --from=builder /root/.local /root/.local
RUN mkdir /ManaZeak
RUN mkdir /library
WORKDIR /ManaZeak

EXPOSE 8000
