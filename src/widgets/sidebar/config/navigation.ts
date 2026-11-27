import { NavigationLink } from "@/widgets/sidebar/config/navigationLink.types";

export const navigationLinks = {
  employees: {
    label: "Сотрудники",
    path: "/employees",
    icon: "/icons/employees.svg",
  },
  skills: {
    label: "Навыки",
    path: "/skills",
    icon: "/icons/skills.svg",
  },
  languages: {
    label: "Языки",
    path: "/languages",
    icon: "/icons/languages.svg",
  },
  resume: {
    label: "Резюме",
    path: "/resume",
    icon: "/icons/cvs.svg",
  },
} satisfies Record<string, NavigationLink>;
