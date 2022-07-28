FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
# COPY .env ./ 
COPY nest-cli.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD npm run start:prod
