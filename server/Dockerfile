FROM node:12.22.1
WORKDIR /app
COPY package.json /app
# COPY package-lock.json ./
COPY ./ /app
RUN npm i  --production
CMD ["npm", "run", "start"]
