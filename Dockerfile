FROM mcr.microsoft.com/playwright:v1.62.1-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# The project's Playwright configuration currently runs Chromium with headless: false.
# xvfb-run provides a virtual display so the suite also works in containers/CI.
CMD ["xvfb-run", "--auto-servernum", "npx", "playwright", "test"]
