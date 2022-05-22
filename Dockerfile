# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
COPY package.json package-lock.json ./ 
#RUN apk add --no-cache \
#  chromium \
#  nss \
#  freetype \
#  harfbuzz \
#  ca-certificates \
#  ttf-freefont \
#  nodejs \
#  yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#   PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# RUN npm add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
#RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#  && mkdir -p /home/pptruser/Downloads /app \
#  && chown -R pptruser:pptruser /home/pptruser \
#  && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
# USER pptruser

RUN npm install

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/facade/facade/content ./facade/content

# If using npm with a `package-lock.json` comment out above and use below instead
COPY package.json package-lock.json ./ 
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  nodejs \
  yarn

# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker
# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
#RUN addgroup -S pptruser
#RUN adduser -S -G pptruser pptruser 
RUN mkdir -p /home/pptruser/Downloads  
RUN chown -R nextjs:nodejs /home/pptruser 
#RUN chown -R nextjs:nodejs /app
RUN chown -R nextjs:nodejs /app/.next/cache

# Run everything after as non-privileged user.

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
