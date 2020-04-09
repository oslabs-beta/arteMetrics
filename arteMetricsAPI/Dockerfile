FROM node:12.15
WORKDIR /usr/src/server
COPY . /usr/src/server
RUN npm install
EXPOSE 8081
ENTRYPOINT node server.js 