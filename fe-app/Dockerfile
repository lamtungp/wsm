FROM node:14
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
RUN npm install -g npm
RUN npm rebuild node-sass
RUN npm set registry http://registry.npmjs.org/ 
EXPOSE 3000 
CMD ["npm", "start"]