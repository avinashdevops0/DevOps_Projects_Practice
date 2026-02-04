# -------- Build Stage --------
# Use lightweight Node.js Alpine image for installing dependencies
FROM node:alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache npm install layer
COPY package*.json .

# Install ALL dependencies (dependencies + devDependencies)
# Useful for backend apps that may need tools at runtime
RUN npm install 

# Copy the rest of the application source code
COPY . .

# -------- Runtime Stage --------
# Use a fresh Node.js Alpine image for a smaller final image
FROM node:alpine

# Create a non-root user for security best practices
RUN addgroup -S app && adduser -S app -G app

# Set working directory
WORKDIR /app

# Copy application files from build stage
# --chown ensures files belong to the non-root user
COPY --from=build --chown=app:app /app .

# Switch to non-root user
USER app

# Expose the port your Node.js backend listens on
EXPOSE 3000

# Start the application using the start script from package.json
CMD ["npm", "start"]
