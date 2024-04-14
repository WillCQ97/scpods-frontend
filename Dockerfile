# Adaptado de https://markus.oberlehner.net/blog/running-nuxt-3-in-a-docker-container/

ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-slim as base

# Specifying the PORT as an ARG PORT allows us to override the port when starting the container
ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

# Build stage
FROM base as build

# we copy over our package.json and package-lock.json files and install our dependencies.
COPY --link package.json package-lock.json .
RUN npm install --production=false

# We then copy the rest of our application code and run the build command.
# The two copy commands are separeted to use the docker cache saving time
COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base
ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
