FROM node:14 
WORKDIR /app  
COPY ./package*.json /app/
RUN npm install  
RUN npm i -g mocha   
RUN pwd
RUN ls -la
RUN ls -la node-modules
EXPOSE 4000  
CMD [ "npm", "start" ]