FROM node:20.14.0-bookworm

WORKDIR /app
COPY ./app .
RUN npm ci
CMD npm run start
