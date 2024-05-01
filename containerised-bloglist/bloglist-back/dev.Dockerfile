FROM node:20
  
WORKDIR /usr/src/server

COPY . .

RUN npm ci

ENV DEBUG=bloglist-back:*
ENV PORT=3003
ENV SECRET=yoyoyo

CMD npm run dev-container