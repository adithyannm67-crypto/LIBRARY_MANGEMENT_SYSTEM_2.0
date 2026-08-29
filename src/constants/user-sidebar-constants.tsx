import {
  LayoutDashboard,
  BookOpen,
  CalendarClock,
  BarChart2,
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
  | "books"
  | "book-details"
  | "my-borrows"
  | "borrow-history"
  | "reservations"
  | "wish-list"
  | "notifications"
  | "profile"
  | "achievements"
  | "reading-history"
  | "overview"
  | "settings"
  | "help";

export interface NavItem {
  id: UserRoute;
  label: string;
  icon: LucideIcon;
  badge?: number;
}
interface NavGroup {
  label?: string;
  items: NavItem[];
}



export const USER_SIDEBAR_INITIAL_LINK:Record<UserRoute,`/user/${UserRoute}?${string}`>={
  books:"/user/books?q=&availableonly=false&category=All&sort=rating&viewMode=grid"
}

export const NAV: NavGroup[] = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "overview", label: "Overview", icon: BarChart2 },
      { id: "books", label: "Browse Books", icon: BookOpen },
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
        id: "wish-list",
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
