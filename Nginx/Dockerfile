FROM nginx:stable-alpine

RUN apk add --no-cache openssl

# create ssl dir and generate a self-signed cert including SAN (portable method)
RUN mkdir -p /etc/nginx/certs

RUN openssl req -x509 -nodes \
    -out /etc/nginx/certs/app.crt \
    -keyout /etc/nginx/certs/app.key \
    -subj "/C=FR/ST=IDF/L=PARIS/O=42/OU=75/CN=localhost"

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443