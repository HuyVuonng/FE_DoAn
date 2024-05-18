# Use the official Node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the application files
COPY . .

# Build the Angular application
# RUN npm run buildDev
RUN npm run build
# RUN npm run buildStaging


# Use Nginx as the final base image
FROM nginx:1.25.3

# Copy the compiled Angular app from the build image
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*

COPY --from=build /app/dist/NganHangNhaTro/browser /usr/share/nginx/html
# Expose port 80
# EXPOSE 80

# Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Sử dụng lệnh envsubst để thay thế các biến môi trường trong tệp env.sample.js và ghi kết quả vào env.js.
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.sample.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]