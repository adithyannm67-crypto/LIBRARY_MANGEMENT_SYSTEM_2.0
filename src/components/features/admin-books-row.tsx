import type { Book } from "@/types/database";
import RowActions from "./admin-book-row-actions";

interface Props {
  b: Book;
  params: Record<string, string | undefined>;
}

export default function BookRow({ b, params }: Props) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-2.5">
          <div
            className="h-10 w-[30px] shrink-0 rounded shadow-[inset_-2px_0_4px_rgba(0,0,0,0.15)]"
            style={{ background: b.coverColor }}
          />
          <div>
            <div className="max-w-[150px] truncate font-semibold">
              {b.title}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {" "}
              {b.author}{" "}
            </div>
          </div>
        </div>
      </td>
      <td className="font-mono text-[11px] text-muted-foreground">
        {b.isbn}
      </td>
      <td className="text-muted-foreground"> {b.category}</td>
      <td>
        <span className="font-semibold">{b.available_copies}</span>
        <span className="text-muted-foreground">/{b.total_copies}</span>
      </td>
      <td>★ {b.rating.toFixed(1)}</td>
      <td>
        <RowActions b={b} params={params} />
      </td>
    </tr>
  );
}