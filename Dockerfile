FROM node:16.13.1-alpine3.14 as dev
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start:dev"]