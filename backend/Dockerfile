FROM node:18.17.1-alpine AS build

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18.17.1-alpine

WORKDIR /api
RUN chmod -R 777 /api
USER node
COPY package.json yarn.lock .env .sequelizerc ./
RUN yarn install --production --frozen-lockfile
COPY --from=build /build/build ./
EXPOSE 5000

CMD ["node", "main.js"]