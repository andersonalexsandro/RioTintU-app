FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY ./src/RioTintU-VM/ts ./
RUN npm install
RUN npm run build

COPY ./src ./
# Install static server
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve the build output (adjust 'dist' if your build folder is different)
CMD ["serve", "-l", "3000"]
