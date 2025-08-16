# ==========================
# Stage 1: Build the Next.js app
# ==========================
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Cài git để clone các package private nếu cần
RUN apk add --no-cache git openssh-client

# Copy package.json và yarn.lock để cài dependencies
COPY package.json yarn.lock ./

# Cài dependencies với frozen-lockfile, giảm concurrency để tránh timeout
RUN yarn install --frozen-lockfile --network-concurrency 1

# Copy toàn bộ source code
COPY . .

# Build Next.js SSR
RUN yarn build

# ==========================
# Stage 2: Production image
# ==========================
FROM node:16-alpine

WORKDIR /app

# Copy từ builder
COPY --from=builder /app ./

# Chỉ expose port 3000
EXPOSE 3000

# Chạy SSR Next.js
CMD ["yarn", "start"]
