FROM node:7.8.0
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

RUN npm run build

CMD node src/server/index