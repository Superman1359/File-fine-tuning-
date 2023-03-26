import React from "react";
import HomePage from "../HomePage";
import useAuthentication from "./useAuthentication";

export default function LoginRequired({
  children,
}: {
  children: React.ReactNode;
}) {
  const { headers } = useAuthentication();
  if (!process.browser) return null;

  return headers ? <>{children}</> : <HomePage />;
}
