# Pull latest official node image
FROM node:latest

# Expose ports
EXPOSE 3000
EXPOSE 35729

# Set working directory
WORKDIR /app

# Add /app/node_modules/.bin to environment variables
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files and install app dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn
RUN yarn add react-scripts -g

# Add React app to working directory
ADD . /app

# Start the React app
CMD ["yarn", "start"]

# docker build . -t israelias/ch-frontend
# docker push israelias/ch-frontend:latest