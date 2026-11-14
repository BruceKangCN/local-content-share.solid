FROM node:26-trixie-slim as builder

ARG DEBIAN_FRONTEND=noninteractive

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y --no-install-recommends wget ca-certificates \
  && apt-get clean \
  && wget -qO- https://get.pnpm.io \
    | env ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

WORKDIR /workspace

COPY . .
RUN pnpm install --frozen-lockfile \
  && pnpm build \
  && pnpm install --prod --frozen-lockfile

FROM node:26-trixie-slim as app

EXPOSE 3000

WORKDIR /app

COPY --from=builder /workspace/node_modules node_modules
COPY --from=builder /workspace/dist .
RUN mkdir -p files

CMD [ "node", "--env-file-if-exists=.env", "server/node.js" ]
