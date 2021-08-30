FROM node:14 
WORKDIR /app/
COPY ./package*.json /app/
COPY . /app/
RUN npm install
RUN npm install -g bcrypt
RUN npm i -g mocha   
EXPOSE 4000  
CMD [ "npm", "start" ]