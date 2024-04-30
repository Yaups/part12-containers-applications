FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV VITE_BACKEND_URL=http://192.168.0.3:3000/
CMD ["npm", "run", "dev", "--", "--host"]