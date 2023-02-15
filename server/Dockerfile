FROM node:16-alpine AS server-api
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . /app
# ==== BUILD =====
# Build the app
RUN npm ci
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 5000
# Start the app
CMD [ "npm", "run", "start" ]

