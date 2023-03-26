import LoginRequired from "components/account/LoginRequired";
import SearchDetails from "components/search/SearchDetails";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SearchPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();

  return (
    <LoginRequired>
      <NextSeo title={t("pages.search")} />
      {id && <SearchDetails id={String(id)} />}
    </LoginRequired>
  );
}
