import {
  FileText,
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Package,
} from "lucide-react";
const REPORTS = [
  {
    icon: TrendingUp,
    color: "var(--accent)",
    title: "Monthly Borrow Report",
    desc: "Full breakdown of borrows, returns, and renewals for the current month",
    format: "PDF · CSV",
    updated: "Jul 10, 2026",
  },
  {
    icon: Users,
    color: "var(--success)",
    title: "Member Activity Report",
    desc: "Active members, new registrations, suspensions, and tier changes",
    format: "PDF · CSV · XLSX",
    updated: "Jul 10, 2026",
  },
  {
    icon: BookOpen,
    color: "#9B59B6",
    title: "Catalog Inventory Report",
    desc: "Complete catalog with copy counts, condition ratings, and availability",
    format: "PDF · CSV",
    updated: "Jul 8, 2026",
  },
  {
    icon: DollarSign,
    color: "var(--warning)",
    title: "Fines & Overdue Report",
    desc: "Outstanding fines, overdue loans, and fine collection history",
    format: "PDF · XLSX",
    updated: "Jul 10, 2026",
  },
  {
    icon: Package,
    color: "#FF6B35",
    title: "Physical Inventory Report",
    desc: "Per-copy condition audit with damage flags and maintenance notes",
    format: "PDF · CSV",
    updated: "Jul 1, 2026",
  },
  {
    icon: FileText,
    color: "var(--muted-foreground)",
    title: "Annual Summary Report",
    desc: "Year-to-date statistics across all library operations",
    format: "PDF",
    updated: "Jun 30, 2026",
  },
];
const SCHEDULED_REPORTS = [
  {
    name: "Monthly Borrow Report",
    freq: "1st of each month",
    next: "Aug 1, 2026",
    to: "admin@library.dev",
  },
  {
    name: "Weekly Overdue Summary",
    freq: "Every Monday",
    next: "Jul 14, 2026",
    to: "admin@library.dev",
  },
];

export { REPORTS, SCHEDULED_REPORTS };
