FROM node:12.15
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build
EXPOSE 8080
# CMD npm run dev for testing
CMD node ./sorver/sorver.js