FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /ManaZeak
RUN mkdir /library

ADD . /ManaZeak
RUN pip install -r /ManaZeak/requirements.txt

WORKDIR /ManaZeak

EXPOSE 8000
