# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci
RUN npm run build

# Dependency Stage
FROM node:18-alpine as dependencies
WORKDIR /app

COPY package*.json ./
RUN npm ci --prod

# Bootstrapping stage
FROM node:18-alpine
ENV TZ=Europe/Berlin
USER node
WORKDIR /app

# Copy Transpiled code
COPY --from=build /app/dist ./
# Copy dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Config
COPY config ./config
COPY package*.json ./

EXPOSE 8080
CMD ["node", "index.js"]
