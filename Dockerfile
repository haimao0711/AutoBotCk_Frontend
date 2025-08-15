# Stage 1, based on Node.js, to build and compile the react app
FROM node:16-alpine as build

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN apk add --update \
  git \
  openssh-client
  
COPY ./ /app/

RUN yarn \
    && yarn build

CMD [ "yarn", "start"]
