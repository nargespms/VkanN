# develop stage
FROM node:12 as develop-stage
WORKDIR /src
COPY package*.json ./
RUN npm install -g @quasar/cli
COPY . .
# build stage
FROM develop-stage as build-stage
RUN quasar build
# # production stage
# FROM nginx:1.17.5-alpine as production-stage
# COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 8083
# CMD ["nginx", "-g", "daemon off;"]
# start the app
CMD [ "quasar" ,"build" ]





