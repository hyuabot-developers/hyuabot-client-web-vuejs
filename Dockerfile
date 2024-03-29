# build stage
FROM node:lts-alpine as develop-step
WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
COPY . .

FROM develop-step as build-step
RUN yarn
RUN quasar build --mode pwa

FROM nginx:stable-alpine as production-step
COPY --from=build-step /app/dist/pwa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
