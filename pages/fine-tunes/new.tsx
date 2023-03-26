import LoginRequired from "components/account/LoginRequired";
import NewFineTuneForm from "components/fine-tunes/NewFineTuneForm";
import { NextSeo } from "next-seo";
import React from "react";
import { useTranslation } from "react-i18next";

export default function NewFineTunePage() {
  const { t } = useTranslation();

  return (
    <LoginRequired>
      <NextSeo title={t("pages.fine-tune")} />
      <NewFineTuneForm />
    </LoginRequired>
  );
}
