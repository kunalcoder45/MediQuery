FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8000

# Prisma generate at runtime
CMD ["sh", "-c", "npx prisma generate && node server.js"]
