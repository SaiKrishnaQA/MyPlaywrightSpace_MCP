// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  reporter: 'html',

  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout:30*1000,
    screenshot: 'on',
    trace: 'on',//retain-on-failure or on if you need for traces for all tests

    browserName: 'chromium',
    headless: false,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },
});

