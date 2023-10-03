# build stage
FROM node:16.13.1-alpine as build-stage

RUN apk update && apk upgrade && apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG APP_STAGE
# Set environment variables
ENV APP_STAGE=${APP_STAGE}
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 80
ENV NODE_ENV=production

RUN npm run production

CMD [ "npm", "start" ]

EXPOSE 80
