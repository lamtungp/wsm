FROM node:14
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
RUN npm rebuild node-sass
RUN pwd
RUN ls -la
RUN ls -la node_modules
EXPOSE 3000 
CMD ["npm", "start"]