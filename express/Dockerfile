FROM node:18-alpine AS builder

RUN apk add --no-cache curl

WORKDIR /server
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine

WORKDIR /server

COPY --from=builder /server/node_modules ./node_modules

COPY package*.json ./
COPY server.js ./

RUN mkdir -p /data/uploads && chmod -R 755 /data

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=30s \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"


EXPOSE 5000

CMD ["node", "server.js"]# Stage 1: build React