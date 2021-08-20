FROM node:14 
WORKDIR /app/
COPY ./package*.json /app/
RUN npm init
RUN npm install  
RUN npm i -g mocha   
RUN cat package.json
EXPOSE 4000  
CMD [ "npm", "start" ]