# Use the official Node.js 14 base image
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application source code to the container
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for the production build
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app/build ./build

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Expose the port on which your application runs
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
