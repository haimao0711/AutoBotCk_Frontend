# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git openssh-client
COPY package*.json ./
RUN yarn install
COPY ./ ./
RUN yarn build

# Stage 2: Production
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
EXPOSE 3000
CMD ["yarn", "start"]
