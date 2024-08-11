# Baseado em https://markus.oberlehner.net/blog/running-nuxt-3-in-a-docker-container/
# ---
# É muito comum encontrar dockerfiles onde o projeto inteiro é copiado para dentro do contêiner
# e então é realizado o build com npm e configurado o start como dev ou prod.
# Nesses casos, o .dockerignore desconsidera as pastas .output, .nuxt e node_modules.
# Aqui optei apenas por copiar a pasta .output gerada pelo comando yarn build.
# --

ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim

# Specifying the PORT as an ARG PORT allows us to override the port when starting the container
ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /app-scpods-frontend

ENV PORT=$PORT

COPY .output/ /app-scpods-frontend/.output

CMD [ "node", ".output/server/index.mjs" ]
