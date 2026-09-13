import styles from "@/styles/admin-shared.module.css";

import { fmtDate } from "@/mock/adminData";
import { createClient } from "@/lib/server";
import Link from "next/link";

interface Props {
  params: Promise<{ bookId: string }>;
}

const STATUS_CLS: Record<string, string> = {
  active: "badgeActive",
  overdue: "badgeDanger",
  returned: "badgeNeutral",
};

export default async function AdminBookLoansPage({ params }: Props) {
  const { bookId } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("borrow_records")
    .select("*, members!borrow_records_member_id_fkey(name, email)")
    .eq("book_id", bookId)
    .order("borrowed_at", { ascending: false })
    .returns<{
      borrowrecord_id: string;
      member_id: string;
      book_id: string;
      borrowed_at: string;
      due_at: string;
      returned_at: string | null;
      borrowrecord_status: string;
      members: { name: string; email: string } | null;
    }[]>();

  if (error) console.error(error);

  const loans = (data ?? []).map((l) => ({
    id: l.borrowrecord_id,
    memberId: l.member_id,
    memberName: l.members?.name ?? l.member_id,
    memberEmail: l.members?.email ?? "",
    borrowedAt: l.borrowed_at,
    dueAt: l.due_at,
    returnedAt: l.returned_at ?? null,
    status: l.borrowrecord_status,
  }));

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionTitle}>
          Borrow History ({loans.length})
        </span>
      </div>
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              {["Member", "Borrowed", "Due", "Returned", "Status"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id}>
                <td>
                  <Link
                    href={`/admin/member-details/${l.memberId}`}
                    className="font-semibold text-inherit no-underline hover:text-accent"
                  >
                    {l.memberName}
                  </Link>
                  {l.memberEmail && (
                    <div className="text-[11px] text-muted-foreground">
                      {l.memberEmail}
                    </div>
                  )}
                </td>
                <td className="text-muted-foreground">
                  {fmtDate(l.borrowedAt)}
                </td>
                <td className="text-muted-foreground">
                  {fmtDate(l.dueAt)}
                </td>
                <td className="text-muted-foreground">
                  {l.returnedAt ? fmtDate(l.returnedAt) : "—"}
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[STATUS_CLS[l.status] ?? "badgeNeutral"]
                    }`}
                  >
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loans.length === 0 && (
          <p className="py-6 text-center text-[13px] text-muted-foreground">
            No borrow history.
          </p>
        )}
      </div>
    </div>
  );
}