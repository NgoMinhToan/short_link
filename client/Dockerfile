FROM node:16-alpine AS builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . /app
# ==== BUILD =====
# Set hostname
ARG REACT_APP_SHORTENER_API_URL
ENV REACT_APP_SHORTENER_API_URL $REACT_APP_SHORTENER_API_URL
# Build the app
RUN npm ci
# ==== RUN =======
RUN npm run build
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
# EXPOSE 3000
# # Start the app
# CMD [ "npx", "serve", "build" ]


FROM nginx:stable-alpine AS react-app
COPY --from=builder /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]