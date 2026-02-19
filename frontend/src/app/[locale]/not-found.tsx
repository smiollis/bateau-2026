import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-2 text-2xl font-heading font-semibold text-foreground">
          {t("title")}
        </p>
        <p className="mb-6 text-muted-foreground max-w-md">
          {t("description")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium btn-gold text-white h-10 px-6 py-2"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
