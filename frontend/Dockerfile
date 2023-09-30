FROM node:16.16.0-alpine AS build

WORKDIR /build
COPY . .
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn build

FROM nginx:1.25-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /tmp/nginx/client_body /tmp/nginx/proxy /tmp/nginx/fastcgi /tmp/nginx/uwsgi /tmp/nginx/scgi
COPY --from=build /build/build /usr/share/nginx/frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]