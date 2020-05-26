# develop stage
# FROM node:12 as build-stage
# WORKDIR /app

# COPY package*.json ./
# RUN npm install
# COPY ./src .
# # RUN quasar build
# # build stage
# # FROM develop-stage as build-stage
# # RUN quasar build
# # # production stage
# # FROM nginx:1.17.5-alpine as production-stage
# # COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# EXPOSE 8083
# WORKDIR /app
# # CMD ["nginx", "-g", "daemon off;"]
# # start the app
# # WORKDIR /
# CMD [ "quasar ","build" ]



FROM node:12 as build-stage

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app    

# Install app dependencies
COPY /app/package.json /usr/src/app/
RUN npm install -g quasar-cli \ 
    && npm install \
    && npm update -g

# Bundle app source
COPY ./app /usr/src/app

EXPOSE 8083
CMD [ "npm", "run" ,"build" ]


