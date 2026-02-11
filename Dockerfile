FROM node:18-bullseye

# Install Python, pip, and common tools for terminal usage
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    unzip \
    zip \
    curl \
    wget \
    git \
    vim \
    nano \
    htop \
    build-essential \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy application code
COPY . .

# Create workspace directory for user projects
RUN mkdir -p /workspace && chmod 777 /workspace

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
