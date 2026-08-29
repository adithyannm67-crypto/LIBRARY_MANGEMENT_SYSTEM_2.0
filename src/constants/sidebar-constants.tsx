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
  History,
  Library,
  Heart,
  User,
  Trophy,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";

export type UserRoute =
  | "dashboard"
  | "browse"
  | "book-details"
  | "my-borrows"
  | "borrow-history"
  | "reservations"
  | "wishlist"
  | "notifications"
  | "profile"
  | "achievements"
  | "reading-history"
  | "overview"
  | "settings"
  | "help";

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
  id: AdminRoute | UserRoute;
  label: string;
  icon: LucideIcon;
  badge?: number;
}
interface NavGroup {
  label?: string;
  items: NavItem[];
}

export const NAV_ADMIN: NavGroup[] = [
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

export const NAV_USER: NavGroup[] = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "overview", label: "Overview", icon: BarChart2 },
      { id: "browse", label: "Browse Books", icon: BookOpen },
    ],
  },

  {
    label: "My Library",
    items: [
      {
        id: "my-borrows",
        label: "My Borrows",
        icon: Library,
        badge: 3,
      },
      {
        id: "borrow-history",
        label: "Borrow History",
        icon: History,
      },
      {
        id: "reservations",
        label: "Reservations",
        icon: CalendarClock,
        badge: 1,
      },
      {
        id: "wishlist",
        label: "Wishlist",
        icon: Heart,
      },
    ],
  },

  {
    label: "Me",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
        badge: 2,
      },
      {
        id: "profile",
        label: "Profile",
        icon: User,
      },
      {
        id: "achievements",
        label: "Achievements",
        icon: Trophy,
      },
      {
        id: "reading-history",
        label: "Reading History",
        icon: BookOpen,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
      },
      {
        id: "help",
        label: "Help",
        icon: CircleHelp,
      },
    ],
  },
];
