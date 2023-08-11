FROM node:18-alpine

WORKDIR /usr/src/app
 
COPY . .

RUN apk update && apk add pingu
 
RUN npm i

RUN npm run build

RUN npx prisma generate

USER node
 
CMD ["npm", "run", "start:prod"]

