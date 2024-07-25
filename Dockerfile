FROM node:20-alpine3.20 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ng build -c=production

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine3.19-perl
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/fl-cards-angular /usr/share/nginx/html