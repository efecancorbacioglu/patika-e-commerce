FROM node:20.9.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "src/index.js"]
