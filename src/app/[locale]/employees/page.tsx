import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocalePageProps } from "@/app/[locale]/types/next.types";

export default async function EmployeesPage({ params }: LocalePageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("Navigation");

  return (
    <main>
      <h1>{t("employees")}</h1>
    </main>
  );
}
