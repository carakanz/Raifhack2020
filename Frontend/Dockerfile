FROM node:12.7-alpine AS build
WORKDIR .
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:admin

FROM nginx:1.17.1-alpine
ARG project
COPY .nginx/$project/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build dist/${project} /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
