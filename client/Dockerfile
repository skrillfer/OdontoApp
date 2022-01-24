FROM node:16.0.0
WORKDIR /app
COPY package.json /app
#  COPY package-lock.json ./
COPY ./ /app
RUN npm i
CMD ["npm", "run", "start"]