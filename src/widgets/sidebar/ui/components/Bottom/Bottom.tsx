import clsx from "clsx";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/features/language-switcher/ui/LanguageSwitcher";
import styles from "../../Sidebar.module.scss";
import { BottomProps } from "@/widgets/sidebar/ui/components/Bottom/BottomProps.types";

export default function Bottom({ collapsed }: BottomProps) {
  const t = useTranslations("Profile");

  return (
    <div className={styles.bottom}>
      <LanguageSwitcher collapsed={collapsed} />

      <div className={styles.profile}>
        <div className={styles.avatar}>П</div>

        <span
          className={clsx(styles.profileLabel, {
            [styles.profileLabelHidden]: collapsed,
          })}
        >
          {t("title")}
        </span>
      </div>
    </div>
  );
}
