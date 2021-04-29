# https://nodejs.org/de/docs/guides/nodejs-docker-webapp
# https://docs.docker.com/engine/reference/builder

FROM node:16-alpine3.13

WORKDIR /usr/src/app


COPY .env .
COPY package.json .
COPY package-lock.json .

RUN \
  npm ci --only=production

COPY dist .

# port
EXPOSE 3000

STOPSIGNAL SIGINT

CMD [ "node", "index.js" ]
