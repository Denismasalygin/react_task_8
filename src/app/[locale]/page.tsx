import { redirect } from "next/navigation";
import { LocalePageProps } from "@/app/[locale]/types/next.types";

export default async function HomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  redirect(`/${locale}/employees`);
}
