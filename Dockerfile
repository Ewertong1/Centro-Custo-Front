# Etapa 1: Build da aplicação Angular
FROM node:22 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production

# Etapa 2: Servir com Nginx
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist/cadastro-pessoas /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
