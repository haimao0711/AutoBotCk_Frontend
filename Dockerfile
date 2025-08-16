# Stage 1: Build the Next.js app
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files first to install deps
COPY package*.json ./
RUN apk add --no-cache git openssh-client \
    && yarn install

# Copy all source files
COPY ./ ./

# Build Next.js
RUN yarn build

# Stage 2: Production image
FROM node:16-alpine

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/ ./

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]
