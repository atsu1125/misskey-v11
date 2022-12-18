FROM node:18.12.1-bullseye AS builder

ENV NODE_ENV=production
WORKDIR /misskey

RUN apt-get update
RUN apt-get install -y build-essential

RUN git init
RUN git submodule update --init
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 100000
COPY . ./
RUN yarn build

FROM node:18.12.1-bullseye-slim AS runner

ENV NODE_ENV=production
WORKDIR /misskey

RUN apt-get update
RUN apt-get install -y ffmpeg wget

COPY --from=builder /misskey/node_modules ./node_modules
COPY --from=builder /misskey/built ./built
COPY . ./

CMD ["npm", "run", "migrateandstart"]
