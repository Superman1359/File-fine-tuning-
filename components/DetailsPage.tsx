import React from "react";
import { useTranslation } from "react-i18next";
import ErrorMessage from "./ErrorMessage";

export default function DetailsPage({
  id,
  name,
  error,
  children,
}: {
  id: string;
  name: string;
  error?: Error;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <main className="mx-auto mb-8 space-y-8 max-w-2xl">
      <h1 className="text-3xl">
        <span className="font-normal">{t(`pages.${name}`)}</span> {id}
      </h1>
      {error && <ErrorMessage error={error} />}
      {children}
    </main>
  );
}
