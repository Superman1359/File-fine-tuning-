import { Router } from "next/router";
import { useCallback, useEffect } from "react";

const propertyId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function useAnalytics() {
  useEffect(() => {
    if (!propertyId) return;
    if (window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", propertyId, { send_page_view: false });

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${propertyId}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const sendEvent = useCallback(
    (name: string, props?: { [key: string]: string }) => {
      window.gtag?.("event", name, props);
    },
    []
  );

  const pageView = useCallback(() => {
    sendEvent("page_view", {
      page_title: document.title,
      page_location: location.href,
    });
  }, [sendEvent]);

  useEffect(() => {
    Router.events.on("routeChangeComplete", pageView);
    return () => Router.events.off("routeChangeComplete", pageView);
  }, [pageView]);

  return { pageView, sendEvent };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
