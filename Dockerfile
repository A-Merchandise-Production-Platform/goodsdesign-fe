# Stage 1: Install dependencies and build the Next.js app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the Next.js app
FROM node:18-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app ./

# Expose the port on which the app will run
EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV=production

# Start the Next.js app
CMD ["npm", "start"]
