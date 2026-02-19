"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    logger.error(`Unhandled error: ${error.message} (digest: ${error.digest})`);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h2 className="font-heading text-2xl font-semibold text-primary">
        {t("title")}
      </h2>
      <p className="text-muted-foreground max-w-md">
        {t("description")}
      </p>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
