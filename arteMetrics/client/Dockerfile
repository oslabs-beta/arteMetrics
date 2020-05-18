FROM node:10.15
ENV CI true
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install pg --save
RUN npm install react-scripts -g --silent
RUN npm install
EXPOSE 8080 
EXPOSE 3000
CMD ["npm", "run", "dev"]