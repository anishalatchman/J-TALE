FROM node:14
WORKDIR /usr/J-TALE/mern/server
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "server.js" ]
