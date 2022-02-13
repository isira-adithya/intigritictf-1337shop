# Configuring Node
FROM node:16-alpine
WORKDIR /app
COPY . .
COPY ./flag /root/flag
RUN npm install
CMD ["node", "server.js"]

