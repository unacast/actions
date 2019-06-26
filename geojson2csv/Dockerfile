FROM python:3.7-alpine

LABEL "name"="geojson2csv"
LABEL "maintainer"="Unacast <developers+github@unacast.com>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Geojson2csv"
LABEL "com.github.actions.description"="Convert geojson to csv"
LABEL "com.github.actions.icon"="truck"
LABEL "com.github.actions.color"="green"

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

RUN apk add --no-cache \
gcc \
libc-dev \
geos-dev

COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY geojson2csv.py /usr/bin/geojson2csv
RUN chmod +x /usr/bin/geojson2csv

CMD ["geojson2csv", "-h"]