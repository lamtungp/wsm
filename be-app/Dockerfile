# FROM node:14 as builder

# WORKDIR /app

# COPY . .

# RUN npm run build

# FROM node:14 

# WORKDIR /app

# COPY package*.json ./


# RUN npm install
# RUN npm install bcrypt
# RUN npm i -g mocha

# COPY --from=builder /app/dist ./dist

# EXPOSE 4000  

# CMD [ "npm", "start" ]

FROM node:14 

WORKDIR /app/

COPY ./package*.json /app/
COPY . /app/

RUN npm install
RUN npm install bcrypt
RUN npm i -g mocha

EXPOSE 4000

CMD [ "npm", "start" ]