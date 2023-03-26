import LoginRequired from "components/account/LoginRequired";
import CompletionDetails from "components/completions/CompletionDetails";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function CompletionsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();

  return (
    <LoginRequired>
      <NextSeo title={t("pages.fine-tune")} />
      {id && <CompletionDetails id={String(id)} />}
    </LoginRequired>
  );
}
