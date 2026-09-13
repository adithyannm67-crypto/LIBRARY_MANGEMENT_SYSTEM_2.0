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
  /** Default query string (e.g. "?filter=All") appended when navigating to this route. */
  defaultQuery?: string;
}
interface NavGroup {
  label?: string;
  items: NavItem[];
}

/** Build a full admin URL for a route, optionally with its default query string. */
export function adminHref(id: AdminRoute, query?: string): string {
  return `/admin/${id}${query ? (query.startsWith("?") ? query : `?${query}`) : ""}`;
}

/** Build the full admin URL for a nav item (route + its default query). */
export function adminNavHref(item: Pick<NavItem, "id" | "defaultQuery">): string {
  return adminHref(item.id, item.defaultQuery);
}

/** Build a route's full URL using its stored default query (falls back to the plain path). */
export function adminDefaultHref(id: AdminRoute): string {
  const item = NAV.flatMap((g) => g.items).find((i) => i.id === id);
  return adminNavHref(item?.defaultQuery ? item : { id });
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
      {
        id: "books",
        label: "Books",
        icon: BookOpen,
        defaultQuery: "?cat=All&filter=All&sort=borrows",
      },
      { id: "categories", label: "Categories", icon: Tag },
      {
        id: "authors",
        label: "Authors",
        icon: Feather,
        defaultQuery: "?sort=rating",
      },
      { id: "publishers", label: "Publishers", icon: Building2 },
      {
        id: "inventory",
        label: "Inventory",
        icon: Package,
        defaultQuery: "?filter=All&cond=All",
      },
    ],
  },
  {
    label: "Circulation",
    items: [
      {
        id: "members",
        label: "Members",
        icon: Users,
        defaultQuery: "?filter=All&tier=All",
      },
      {
        id: "borrows",
        label: "Borrows",
        icon: ArrowLeftRight,
        badge: 2,
        defaultQuery: "?filter=All",
      },
      {
        id: "reservations",
        label: "Reservations",
        icon: CalendarClock,
        badge: 2,
        defaultQuery: "?filter=All",
      },
      {
        id: "reviews",
        label: "Reviews",
        icon: Star,
        badge: 3,
        defaultQuery: "?filter=all",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
        defaultQuery: "?composing=false",
      },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

