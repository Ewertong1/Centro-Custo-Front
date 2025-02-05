# 🏗️ Etapa 1: Build da aplicação Angular
FROM node:18 AS build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# 🚀 Etapa 2: Servir com Nginx
FROM nginx:alpine AS production-stage

# Copia os arquivos do Angular para o diretório padrão do Nginx
COPY --from=build-stage /app/dist/cadastro-pessoas/browser /usr/share/nginx/html

# Copia a configuração correta para a pasta de conf.d
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
