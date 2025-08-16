# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app

# Cài git để cài dependencies nếu cần
RUN apk add --no-cache git openssh-client

# Copy package.json và yarn.lock để cài dependencies
COPY package*.json ./
RUN yarn install

# Copy toàn bộ source
COPY ./ ./

# Build Next.js
RUN yarn build

# Stage 2: Production
FROM node:16-alpine
WORKDIR /app

# Copy package.json và chỉ cài dependencies production
COPY package*.json ./
RUN yarn install --production

# Copy thư mục build và public từ builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose port Next.js
EXPOSE 3000

# Start server SSR
CMD ["yarn", "start"]
