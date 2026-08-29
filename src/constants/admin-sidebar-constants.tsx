import {
  LayoutDashboard,
  BookOpen,
  Users,
  ArrowLeftRight,
  CalendarClock,
  Package,
  Tag,
  Feather,
  Building2,
  Star,
  BarChart2,
  PieChart,
  Bell,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type AdminRoute =
  | "dashboard"
  | "books"
  | "book-details"
  | "members"
  | "member-details"
  | "borrows"
  | "reservations"
  | "inventory"
  | "categories"
  | "authors"
  | "publishers"
  | "reviews"
  | "reports"
  | "analytics"
  | "notifications"
  | "settings";

export interface NavItem {
  id: AdminRoute;
  label: string;
  icon: LucideIcon;
  badge?: number;
}
interface NavGroup {
  label?: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "analytics", label: "Analytics", icon: PieChart },
      { id: "reports", label: "Reports", icon: BarChart2 },
    ],
  },
  {
    label: "Catalog",
    items: [
      { id: "books", label: "Books", icon: BookOpen },
      { id: "categories", label: "Categories", icon: Tag },
      { id: "authors", label: "Authors", icon: Feather },
      { id: "publishers", label: "Publishers", icon: Building2 },
      { id: "inventory", label: "Inventory", icon: Package },
    ],
  },
  {
    label: "Circulation",
    items: [
      { id: "members", label: "Members", icon: Users },
      { id: "borrows", label: "Borrows", icon: ArrowLeftRight, badge: 2 },
      {
        id: "reservations",
        label: "Reservations",
        icon: CalendarClock,
        badge: 2,
      },
      { id: "reviews", label: "Reviews", icon: Star, badge: 3 },
    ],
  },
  {
    label: "System",
    items: [
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

