# Use lightweight Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package files (better cache layer)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]