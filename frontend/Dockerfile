FROM node:5.2.0-slim
MAINTAINER kaiyadavenport@gmail.com
WORKDIR /app
COPY ./webserver /app
COPY ./dist /app/www
RUN npm install
ENTRYPOINT ["node", "index.js"]