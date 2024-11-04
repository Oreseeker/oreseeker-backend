FROM node:20.14.0-bookworm

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run pull:front
CMD npm run start
