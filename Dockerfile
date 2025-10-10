FROM node:20.14.0-bookworm

WORKDIR /app
COPY . .
RUN npm ci
CMD npm run start
