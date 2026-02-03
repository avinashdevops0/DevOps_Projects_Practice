FROM nginx:alpine

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy static assets
COPY --chown=app:app . /usr/share/nginx/html/

# Copy nginx config (listen on 8080)
COPY --chown=app:app nginx.conf /etc/nginx/conf.d/default.conf

# Run as non-root
USER app

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
