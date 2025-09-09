# Base image
FROM node:18-alpine

# update&upgrade alpine dependencies
RUN apk update && apk upgrade
RUN npm -g update

# add git
RUN apk add git

# Specific timezone for current container
ENV TZ=Asia/Bangkok

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# extract software version information from git
# RUN git log -1 > APPLICATION_VERSION.txt
RUN git config --global --add safe.directory '*' \
    && git log -1 > APPLICATION_VERSION.txt

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]

