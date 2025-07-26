# Stage 1: Build the React app
FROM node:16-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app's source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the built React app with Nginx
FROM nginx:alpine

# Copy the build directory from the build stage to Nginx's default serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the Nginx default port (80)
EXPOSE 3030

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
