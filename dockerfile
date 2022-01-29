FROM node:16
EXPOSE 4000

COPY index.ts package.json package-lock.json tsconfig.json app/
COPY src app/src
WORKDIR /app

RUN npm install -g ts-node \
&& npm ci

CMD ["ts-node", "index.ts"]