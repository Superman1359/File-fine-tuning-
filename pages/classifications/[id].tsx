import LoginRequired from "components/account/LoginRequired";
import ClassificationDetail from "components/classifications/ClassificationDetail";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ClassificationsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();

  return (
    <LoginRequired>
      <NextSeo title={t("pages.classifications")} />
      {id && <ClassificationDetail id={String(id)} />}
    </LoginRequired>
  );
}
