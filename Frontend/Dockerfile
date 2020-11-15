FROM node:12.7-alpine AS build
COPY package*.json ./
RUN npm install && mkdir /Frontend && mv ./node_modules package*.json ./Frontend
WORKDIR /Frontend
COPY . .
RUN npm run build:admin

FROM nginx:1.17.1-alpine
ARG project
COPY .nginx/$project/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build Frontend/dist/${project} /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
