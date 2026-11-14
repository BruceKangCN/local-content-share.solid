FROM node:26-trixie-slim

WORKDIR /app

RUN mkdir files
COPY "./dist" "."

CMD [ "node", "--env-file-if-exists=.env", "server/node.js" ]
