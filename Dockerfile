FROM node:10
COPY ./ /mpages-web
WORKDIR /mpages-web
RUN npm install && npm run build

FROM nginx
RUN mkdir /mpages-web
COPY --from=0 /mpages-web/dist /mpages-web
COPY nginx.conf /etc/nginx/nginx.conf
