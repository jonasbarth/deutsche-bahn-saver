FROM node:16

WORKDIR /deutsche-bahn-saver/app

COPY package*.json ./

RUN npm install

COPY . .

#CMD [ "node", "src/main.js", "8002549"]
CMD [ "node", "src/database/init.js"]