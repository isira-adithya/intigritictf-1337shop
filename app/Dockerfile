# Configuring Node
FROM ubuntu:20.04
ENV TZ=Asia/Dubai
RUN apt update;
RUN apt install -y npm wkhtmltopdf wget --no-install-recommends;
RUN npm install n -g;
RUN n 16.13.1;
WORKDIR /app
COPY . .
COPY ./flag /root/flag
RUN npm install
CMD ["node", "server.js"]

