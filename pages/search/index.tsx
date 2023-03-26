import LoginRequired from "components/account/LoginRequired";
import SearchList from "components/search/SearchList";
import { NextSeo } from "next-seo";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SearchPage() {
  const { t } = useTranslation();

  return (
    <LoginRequired>
      <NextSeo title={t("pages.search")} />
      <SearchList />
    </LoginRequired>
  );
}
