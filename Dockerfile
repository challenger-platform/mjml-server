FROM node:20.20-alpine

WORKDIR /srv/mjml-server

# 1. Copy only package files first
COPY package*.json ./

# 2. Install dependencies (this layer stays cached unless package.json changes)
RUN npm install

# Copy index file
COPY ./index.js ./

# Expose the port
EXPOSE 3000

CMD ["node", "index.js"]