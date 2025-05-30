FROM node:20

# Set the working directory
WORKDIR /app

# Copy only package files to leverage Docker cache
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Start the app in production mode
CMD ["npm", "run", "start:prod"]
