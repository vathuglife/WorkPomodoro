#Imports node to help docker build this project.
FROM node:alpine as builder 
# Defines the work directory of the Docker container.
WORKDIR /wp_frontend

#Copies the list of dependencies (libraries, e.g. react-icons,... ) to be installed in the Container.
COPY package.json .
RUN npm install

#Copies and pastes every dependency installed into the working directory?
COPY . .
CMD ["npm", "run", "dev"] 




