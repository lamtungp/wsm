FROM node:14
WORKDIR /app
COPY ./package*.json /app/
RUN npm init
RUN npm install
RUN npm rebuild node-sass
RUN cat package.json
EXPOSE 3000 
CMD ["npm", "start"]