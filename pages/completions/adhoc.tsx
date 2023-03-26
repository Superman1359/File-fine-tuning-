import LoginRequired from "components/account/LoginRequired";
import CompletionAdHoc from "components/completions/CompletionAdHoc";
import { NextSeo } from "next-seo";
import React from "react";
import { useTranslation } from "react-i18next";

export default function CompletionsPage() {
  const { t } = useTranslation();

  return (
    <LoginRequired>
      <NextSeo title={t("pages.completions")} />
      <CompletionAdHoc />
    </LoginRequired>
  );
}
