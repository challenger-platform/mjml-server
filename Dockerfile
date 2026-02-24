# --- Base Stage ---
FROM node:20-slim AS base
WORKDIR /app
COPY package*.json ./
# Adding node_modules/.bin to path means you can just call 'nodemon' instead of 'npx nodemon'
ENV PATH /app/node_modules/.bin:$PATH

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# This will be inherited by both development and production stages
ENTRYPOINT ["entrypoint.sh"]

# --- Development Stage ---
FROM base AS development
RUN npm install
COPY . .
# No CMD needed! entrypoint.sh handles it.

# --- Production Stage ---
FROM base AS production
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY . .
EXPOSE 3001
# No CMD needed! entrypoint.sh handles it.