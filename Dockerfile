FROM node:20.20-alpine

WORKDIR /srv/mjml-server

COPY ./index.js ./
COPY ./package*.json ./

# Install dependencies
RUN npm install

# 
EXPOSE 3000

CMD ["node", "index.js"]