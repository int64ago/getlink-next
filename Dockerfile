FROM node:12-alpine

WORKDIR /appops
COPY . /appops

RUN npm i

RUN npm run build

CMD [ "node", "server.js" ]