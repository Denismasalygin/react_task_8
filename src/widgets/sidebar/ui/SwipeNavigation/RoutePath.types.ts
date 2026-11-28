import { navigationLinks } from "@/widgets/sidebar/config/navigation";

export type RoutePath = (typeof navigationLinks)[keyof typeof navigationLinks]["path"];
