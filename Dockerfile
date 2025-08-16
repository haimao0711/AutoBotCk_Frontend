# Stage 1: Build
FROM node:16-alpine AS build

WORKDIR /app

RUN apk add --no-cache git openssh-client

# Copy package.json & yarn.lock
COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy source code & env.production
COPY . .
COPY .env.production .env

# Build using .env.production
RUN yarn build

# Stage 2: Production
FROM node:16-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY .env.production .env

EXPOSE 3000
CMD ["yarn", "start"]
