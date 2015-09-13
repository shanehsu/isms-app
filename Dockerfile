FROM nginx:latest

COPY . /usr/share/nginx/html

RUN DEBIAN_FRONTEND=noninteractive apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y git
RUN rm -rf /usr/share/nginx/html/*

RUN git clone git@github.com:shanehsu/isms-api.git /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
