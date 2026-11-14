FROM node:26-trixie-slim

WORKDIR /app

COPY "./dist" "."
RUN mkdir -p files

CMD [ "node", "--env-file-if-exists=.env", "server/node.js" ]
