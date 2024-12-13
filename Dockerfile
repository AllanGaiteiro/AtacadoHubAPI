# Usar a imagem base do Node.js
FROM node:18-alpine

RUN apk update && apk add --no-cache curl

# Baixar o wait-for-it com curl
RUN curl -sSL https://github.com/vishnubob/wait-for-it/releases/download/v2.3.0/wait-for-it-linux-amd64 -o /usr/local/bin/wait-for-it && \
    chmod +x /usr/local/bin/wait-for-it
    
# Configurar diretório de trabalho
WORKDIR /app

# Instalar dependências globais mínimas (opcional, pode instalar no exec)
RUN npm install -g @nestjs/cli
RUN npm install --save-dev ts-node

# Expor a porta onde o app será executado
EXPOSE 3000

# Definir comando padrão
CMD ["wait-for-it", "db:5432", "--", "npm", "run", "start"]
