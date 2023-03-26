import HomePage from "components/HomePage";
import { GetStaticPropsContext } from "next";
import { loadTranslations } from "ni18n";
import { ni18nConfig } from "ni18n.config";
import React from "react";

export default function Main() {
  return <HomePage />;
}

export async function getStaticProps(props: GetStaticPropsContext) {
  return {
    props: {
      fullPage: true,
      ...(await loadTranslations(ni18nConfig, props.locale, ["translations"])),
    },
  };
}
