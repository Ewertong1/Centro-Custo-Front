# Etapa única: Executar a aplicação Angular no modo de desenvolvimento
FROM node:18 AS development

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia todo o código-fonte para o container
COPY . .

# Expõe a porta usada pelo Angular CLI (4200 por padrão)
EXPOSE 4200

# Comando para rodar a aplicação no modo de desenvolvimento
CMD ["ng", "serve", "--proxy-config", "proxy.conf.json", "--host", "0.0.0.0"]

