 FROM python:3
 ENV PYTHONUNBUFFERED 1
 RUN mkdir /ManaZeak
 ADD . /ManaZeak
 RUN pip install -r /ManaZeak/requirements.txt
 RUN mkdir /library
 WORKDIR /ManaZeak
EXPOSE 8000
