FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# 👇 nhận biến từ docker-compose
ARG REACT_APP_URL_API_PUBLIC
ENV REACT_APP_URL_API_PUBLIC=${REACT_APP_URL_API_PUBLIC}

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# SPA fallback
RUN sed -i 's|try_files $uri $uri/ =404;|try_files $uri /index.html;|g' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
