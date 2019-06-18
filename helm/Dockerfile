FROM gcr.io/cloud-builders/kubectl 

LABEL "name"="Helm"
LABEL "maintainer"="Unacast <developers+github@unacast.com>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Helm"
LABEL "com.github.actions.description"="Helm"
LABEL "com.github.actions.icon"="terminal"
LABEL "com.github.actions.color"="gray-dark"

ENV HELM_VERSION="v2.14.1"

RUN curl -Lo /tmp/helm-linux-amd64.tar.gz https://storage.googleapis.com/kubernetes-helm/helm-${HELM_VERSION}-linux-amd64.tar.gz \
    && tar -xvf /tmp/helm-linux-amd64.tar.gz -C /tmp/ \
    && mv /tmp/linux-amd64/helm /usr/local/bin/ \ 
    && chmod +x /usr/local/bin/helm  && rm -rf /tmp/linux-amd64 \
    && helm init --client-only 

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

