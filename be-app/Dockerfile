FROM node:14 
WORKDIR /app/
COPY ./package*.json /app/
COPY . /app/
COPY ./be-app/docker/services/db/data /var/lib/mysql
COPY ./be-app/docker/services/db/init /docker-entrypoint-initdb.d
COPY ./be-app/docker/services/nginx/conf /etc/nginx/conf.d
COPY ./be-app/docker/services/redis/data /data
RUN npm install  
RUN npm i -g mocha   
RUN cat package.json
EXPOSE 4000  
CMD [ "npm", "start" ]