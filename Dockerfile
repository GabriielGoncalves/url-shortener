FROM node:20-alpine as builder

WORKDIR /appBuilder

COPY . .

RUN npm i && npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /appBuilder/dist ./
COPY --from=builder /appBuilder/package*.json ./
RUN npm i --only=production

ENTRYPOINT ["node"]

CMD ["./app.js"]

EXPOSE 3000