FROM node:14-alpine as builder

WORKDIR /home/

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn install --non-interactive
COPY . .
RUN yarn build

FROM node:14-alpine as production

ENV NODE_ENV production
WORKDIR /home/
COPY --from=builder /home/dist ./dist
COPY package* ./
RUN yarn install --non-interactive

ENTRYPOINT ["yarn", "start:prod"]
