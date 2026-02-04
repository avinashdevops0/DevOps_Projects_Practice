# Use lightweight Nginx image to serve static files
FROM nginx:alpine

# Set working directory (optional)
WORKDIR /usr/share/nginx/html

# Copy all your static files (HTML, CSS, JS, images)
COPY . .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
