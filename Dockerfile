# Use Node.js 20 alpine as the base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install libc6-compat if needed for some packages
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during the build (optional)
# ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
RUN yarn build

# Production image, copy all the files and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable telemetry at runtime (optional)
# ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for better security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone directory and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Use the non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run the application
CMD ["node", "server.js"]
