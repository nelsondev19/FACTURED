# syntax=docker/dockerfile:1
# check=error=true

FROM oven/bun:1.1.43-alpine

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . /app

ENV NODE_ENV=production

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]