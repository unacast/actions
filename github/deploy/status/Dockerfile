FROM alpine

LABEL "name"="curl"
LABEL "com.github.actions.name"="Curl for GitHub Actions"
LABEL "com.github.actions.description"="Have curl and jq together"
LABEL "com.github.actions.icon"="code"
LABEL "com.github.actions.color"="gray-dark"

RUN apk --update add jq curl

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
