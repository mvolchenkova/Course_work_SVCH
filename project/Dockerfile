FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# build production
RUN PUBLIC_URL=/ npm run build

# Stage 2: nginx serve
FROM nginx:alpine

# Ensure nginx runtime cache/temp directories exist and have correct perms
RUN mkdir -p /var/cache/nginx/client_temp \
    && mkdir -p /var/cache/nginx/proxy_temp \
    && mkdir -p /var/run \
    && chmod 755 /var/cache/nginx \
    && chmod 755 /var/cache/nginx/client_temp \
    && chmod 755 /var/cache/nginx/proxy_temp

# Copy build output
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Run as default (root master, worker as nginx user) — не менять на непривилегированный user
CMD ["nginx", "-g", "daemon off;"]
