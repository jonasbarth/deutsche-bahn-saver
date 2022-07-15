FROM node:16

WORKDIR /deutsche-bahn-saver/app

ADD https://github.com/jonasbarth/deutsche-bahn-data/blob/main/deutsche-bahn-data-acquisition/src/main/proto/timetable.proto ./assets/timetable.proto

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "src/main.js", "8002549"]