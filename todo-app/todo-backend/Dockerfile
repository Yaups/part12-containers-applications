FROM node:20
  
WORKDIR /usr/src/server

COPY . .

RUN npm ci 

ENV DEBUG=todo-backend:*
  
CMD npm start