FROM nginx
RUN apt-get update && apt-get install apt-file -y && apt-file update && apt-get install vim -y
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html