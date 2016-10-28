FROM node:5.2.0-slim
MAINTAINER kaiyadavenport@gmail.com
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./src /app/src
RUN npm install
ENTRYPOINT ["node", "src/index.js"]