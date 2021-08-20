FROM node:14
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
RUN npm rebuild node-sass
RUN tail package.json
EXPOSE 3000 
CMD ["npm", "start"]