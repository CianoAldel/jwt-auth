FROM node:alpine

# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm i nodemon -g  
RUN npm i sequelize -g  
RUN npm install

# Bundle app source
COPY . .

ENTRYPOINT ["npm", "run", "start"]