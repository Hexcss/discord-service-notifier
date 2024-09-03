# Use a specific version tag for base image
FROM node:21-alpine3.18 AS builder

WORKDIR /usr/src/app

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Second stage: Production stage
FROM node:21-alpine3.18

WORKDIR /usr/src/app

# Copy the non-root user and group from the builder stage
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

# Copy the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./

RUN npm install --only=production

# Set the user to the non-root user
USER appuser

# Add a HEALTHCHECK instruction
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "dist/index.js"]
