FROM node:16

COPY ./api /usr/src/application

WORKDIR /usr/src/application
RUN npm install
RUN npm run build

EXPOSE 3033

CMD NODE_ENV=prod node dist/app/index.js
