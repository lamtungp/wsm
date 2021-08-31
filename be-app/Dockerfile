FROM node:14 
WORKDIR /app/
COPY ./package*.json /app/
COPY . /app/
RUN npm install
RUN npm install bcrypt
RUN npm i -g mocha   
EXPOSE 4000  
CMD [ "npm", "start" ]