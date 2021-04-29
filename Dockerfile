# https://nodejs.org/de/docs/guides/nodejs-docker-webapp
# https://docs.docker.com/engine/reference/builder

FROM node:16-alpine3.13

WORKDIR /usr/src/app

COPY .env .
COPY package.json .
COPY package-lock.json .

RUN \
  npm ci

COPY . .

EXPOSE 4200

STOPSIGNAL SIGINT

CMD ["npm", "run", "start:dev"]

#docker build -t gcr.io/fraudgaurd/backend:1.0 .
#docker push gcr.io/fraudgaurd/backend:1.0
#docker run -p outsidePort:insidePort gcr.io/fraudgaurd/backend:1.0

# Get container ID
#docker ps

#docker pull gcr.io/google-samples/hello-app:1.0
