FROM node:alpine AS build
WORKDIR /app

COPY package.json .
RUN npm install --production

COPY . .

FROM node:alpine
WORKDIR /app

# Create movie user and group
RUN addgroup -S movie && adduser -S movie -G movie

# Copy app and set ownership
COPY --from=build --chown=movie:movie /app .

USER movie

CMD ["npm", "start"]
