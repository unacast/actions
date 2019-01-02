FROM alpine

LABEL "name"="deploystatus"
LABEL "maintainer"="Unacast <developers+github@unacast.com>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Deploy status"
LABEL "com.github.actions.description"="Create a deploy status"
LABEL "com.github.actions.icon"="upload"
LABEL "com.github.actions.color"="green"

RUN apk --update add jq curl

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]

CMD [""]
