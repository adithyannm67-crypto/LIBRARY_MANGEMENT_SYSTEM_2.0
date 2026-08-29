import {
  BookOpen,
  Users,
  BarChart2,
  Shield,
  Search,
  Bell,
} from "lucide-react";

 const features = [
  {
    icon: BookOpen,
    title: "Smart Catalog",
    desc: "Manage your entire book collection with full-text search, filtering by category, author, and availability.",
  },
  {
    icon: Users,
    title: "Member Management",
    desc: "Onboard members, track borrowing history, manage memberships, and send automated reminders.",
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    desc: "Real-time insights on checkouts, returns, overdue books, and acquisition trends.",
  },
  {
    icon: Search,
    title: "Instant Search",
    desc: "Find any book in milliseconds with smart search across titles, authors, ISBN, and categories.",
  },
  {
    icon: Bell,
    title: "Automated Alerts",
    desc: "Automatic overdue reminders, reservation notifications, and low-copy alerts.",
  },
  {
    icon: Shield,
    title: "Role-based Access",
    desc: "Granular permissions for administrators, librarians, and members with audit trails.",
  },
];
const testimonials = [
  {
    quote:
      "LibraryOS transformed how we manage our 12,000-title collection. The analytics alone saved us 10 hours a week.",
    name: "Dr. Sarah Okafor",
    role: "Head Librarian, State University",
    initials: "SO",
  },
  {
    quote:
      "Setup took less than a day. Our members love the self-service features, and the overdue alerts run themselves.",
    name: "Marcus Webb",
    role: "Library Director, City Public Library",
    initials: "MW",
  },
  {
    quote:
      "Finally a system that feels modern. The search is instant and the dashboard actually makes sense to our whole team.",
    name: "Priya Nair",
    role: "Technical Services Manager",
    initials: "PN",
  },
];

const stats = [
  { value: "50K+", label: "Books managed" },
  { value: "2,400+", label: "Libraries" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9★", label: "Average rating" },
];

export { testimonials, stats, features };