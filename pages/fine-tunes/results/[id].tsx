import LoginRequired from "components/account/LoginRequired";
import FineTuneResultsFile from "components/fine-tunes/FineTuneResultsFile";
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
      {id && <FineTuneResultsFile id={String(id)} />}
    </LoginRequired>
  );
}

export function getServerSideProps() {
  return {
    props: { fullPage: true },
  };
}
