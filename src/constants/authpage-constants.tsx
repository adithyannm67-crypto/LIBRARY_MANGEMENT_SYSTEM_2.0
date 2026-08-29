import {
  BookOpen,
  Users,
  BarChart2,
  Shield,
  type LucideIcon,
} from "lucide-react";

export interface BrandFeature {
  icon: LucideIcon;
  text: string;
}

export const brandFeatures: BrandFeature[] = [
  {
    icon: BookOpen,
    text: "Manage 1,000s of titles with smart search",
  },
  {
    icon: Users,
    text: "Member tracking and loan management",
  },
  {
    icon: BarChart2,
    text: "Real-time analytics and overdue alerts",
  },
  {
    icon: Shield,
    text: "Role-based access for your whole team",
  },
];