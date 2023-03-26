import React from "react";
import { useTranslation } from "react-i18next";
import CompletionForm from "./CompletionForm";

export default function CompletionAdHoc() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto mb-8 space-y-8 max-w-2xl">
      <h1 className="text-3xl">
        <span className="font-normal">{t("pages.completions")}</span> Built-in
        Engines
      </h1>
      <CompletionForm />
    </main>
  );
}
