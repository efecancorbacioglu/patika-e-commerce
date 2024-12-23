# Base image
FROM node:20.9.0

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Expose development port
EXPOSE 8080

# Start development server with hot-reload
CMD ["npm", "run", "dev"]
