FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "src/main.js", "8002549"]