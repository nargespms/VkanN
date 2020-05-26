# develop stage
FROM node:12 as build-stage
# WORKDIR /app
ADD app /app
RUN cd /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# build stage
# FROM develop-stage as build-stage
# RUN quasar build
# # production stage
# FROM nginx:1.17.5-alpine as production-stage
# COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 8083
WORKDIR /app
# CMD ["nginx", "-g", "daemon off;"]
# start the app
# WORKDIR /
# CMD [ "quasar ","build" ]





