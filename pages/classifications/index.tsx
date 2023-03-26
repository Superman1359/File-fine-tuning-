import LoginRequired from "components/account/LoginRequired";
import ClassificationList from "components/classifications/ClassificationList";
import { NextSeo } from "next-seo";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ClassificationsPage() {
  const { t } = useTranslation();

  return (
    <LoginRequired>
      <NextSeo title={t("pages.classifications")} />
      <ClassificationList />
    </LoginRequired>
  );
}
