FROM alpine:3.8

LABEL "name"="curl"
LABEL "maintainer"="Unacast <developers+github@unacast.com>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="curl"
LABEL "com.github.actions.description"="run curl"
LABEL "com.github.actions.icon"="terminal"
LABEL "com.github.actions.color"="black"

RUN apk add --no-cache --update curl
ENTRYPOINT ["/usr/bin/curl"]
