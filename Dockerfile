FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY src ./src
COPY test ./test

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
	CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "src/server.js"]