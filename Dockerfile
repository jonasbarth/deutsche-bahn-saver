FROM node:16

WORKDIR /deutsche-bahn-saver/app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "node", "src/main.js"]

