"use client";

import Button from "@/components/ui/Button";

import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Book } from "@/types/database";
import { searchParamsFrom } from "@/lib/utils";

export default function RowActions({
  b,
  params,
}: {
  b: Book;
  params: Record<string, string | undefined>;
}) {
  const router = useRouter();

  const setParam = (param: string, value: string) => {
    const p = searchParamsFrom(params);
    p.set(param, value);
    router.replace(`?${p.toString()}`);
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="xs"
        leadingIcon={<Pencil size={11} />}
        onClick={(e) => {
          e.stopPropagation();
          setParam("edit", b.book_id);
        }}
      >
        Edit
      </Button>
      <Button
        variant="ghost"
        size="xs"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/admin/book-details/${b.book_id}`);
        }}
      >
        View
      </Button>
      <Button
        variant="ghost"
        size="xs"
        leadingIcon={<Trash2 size={11} />}
        className="!text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          setParam("delete", b.book_id);
        }}
      >
        Delete
      </Button>
    </div>
  );
}