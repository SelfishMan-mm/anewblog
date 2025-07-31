import {
  IconCode,
  IconHome,
  IconInfoCircle,
  IconMail,
  IconTrophy,
} from "@tabler/icons-react";
import { type ReactElement } from "react";

export interface NavItem {
  title: string;
  href: string;
  icon: (props: { className?: string }) => ReactElement;
}

export const navigationConfig: NavItem[] = [
  {
    title: "首页",
    href: "#home",
    icon: (props) => <IconHome {...props} className="h-full w-full" />,
  },
  {
    title: "技能",
    href: "#skills",
    icon: (props) => <IconCode {...props} className="h-full w-full" />,
  },
  {
    title: "作品",
    href: "#projects",
    icon: (props) => <IconTrophy {...props} className="h-full w-full" />,
  },
  {
    title: "关于",
    href: "#about",
    icon: (props) => <IconInfoCircle {...props} className="h-full w-full" />,
  },
  {
    title: "联系",
    href: "#contact",
    icon: (props) => <IconMail {...props} className="h-full w-full" />,
  },
];
