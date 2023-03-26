/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require("@next/mdx")();
const { withSentryConfig } = require("@sentry/nextjs");

const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  poweredByHeader: false,
};

module.exports = withSentryConfig(withMDX(config), { silent: true });
