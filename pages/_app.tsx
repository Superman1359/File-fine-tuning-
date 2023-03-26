import { CssBaseline } from "@nextui-org/react";
import Account from "components/account/Account";
import ErrorMessage from "components/ErrorMessage";
import HomePage from "components/HomePage";
import PageLayout from "components/PageLayout";
import useAnalytics from "components/useAnalytics";
import { NextSeo } from "next-seo";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "ni18n.config";
import finetuner from "public/images/fine-tuner.png";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "styles/index.css";

export default appWithI18Next(App, ni18nConfig);

function App({ Component, pageProps }: AppProps) {
  const { t, ready } = useTranslation();
  const emoji = ready ? t("app.emoji") : "🥱";

  const { pageView } = useAnalytics();
  // Wait until first render had a change to load translations and set the page title
  useEffect(() => {
    if (ready) pageView();
  }, [pageView, ready]);

  return (
    <ErrorBoundary>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>${emoji}</text></svg>`}
        />
      </Head>
      <NextSeo
        title={
          ready
            ? t("$t(app.emoji) $t(app.name) — $t(app.subtitle)")
            : "waking up …"
        }
        titleTemplate={ready ? t("%s | $t(app.name)") : undefined}
        description={ready ? t("app.description") : undefined}
        openGraph={{
          images: [
            {
              url: finetuner.src,
              width: finetuner.width,
              height: finetuner.height,
            },
          ],
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: "@assaf",
        }}
      />
      <CssBaseline />
      <ToastContainer hideProgressBar />
      {ready ? (
        <Account>
          {({ isSignedIn }) => (
            <PageLayout fullPage={pageProps.fullPage || !isSignedIn}>
              {isSignedIn ? <Component {...pageProps} /> : <HomePage />}
            </PageLayout>
          )}
        </Account>
      ) : null}
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error?: Error }
> {
  state: { error?: Error };

  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    toast.error(String(error));
  }

  render() {
    const { error } = this.state;
    return error ? <ErrorMessage error={error} /> : this.props.children;
  }
}
