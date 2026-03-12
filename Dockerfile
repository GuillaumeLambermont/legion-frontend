# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better for Docker caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build for dev
COPY . .
RUN npm run build --configuration=development

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine
# Copy the build output from the 'build' stage to Nginx's public folder
# Note: Ensure the path 'dist/your-app-name/browser' matches your angular.json output path
COPY --from=build /app/dist/legion-frontend/browser /usr/share/nginx/html

# Copy a custom nginx config if you need routing support (explained below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
