FROM node:14 
WORKDIR /app/
COPY ./package*.json /app/
RUN npm install  
RUN npm i -g mocha   
RUN tail package.json
EXPOSE 4000  
CMD [ "npm", "start" ]