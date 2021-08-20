FROM node:14 
WORKDIR /app  
COPY ./package*.json /app/
RUN npm install  
RUN npm install -g npm
RUN npm i -g mocha   
RUN npm set registry http://registry.npmjs.org/ 
EXPOSE 4000  
CMD [ "npm", "start" ]