FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g ts-node typescript

EXPOSE 8028

CMD ["npm", "run", "start"]
