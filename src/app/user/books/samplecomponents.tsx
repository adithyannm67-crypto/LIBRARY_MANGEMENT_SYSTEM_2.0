"use client";

import BookCard, { BookListCard } from "@/components/features/BookCard";

import Button from "@/components/ui/Button";
import type { MockBook } from "@/mock/mock/types";
import { useRouter } from "next/navigation";

export const BookListCardWrapper = ({ b }: { b: MockBook }) => {
  const router = useRouter();
  return (
    <BookListCard
      key={b.id}
      book={b}
      onClick={() => router.push(`/user/books/${b.id}`)}
      actions={
        <Button
          variant={b.availableCopies > 0 ? "primary" : "outline"}
          size="sm"
          onClick={() => alert("Borrow")}
        >
          {b.availableCopies > 0 ? "Borrow" : "Reserve"}
        </Button>
      }
    />
  );
};

export const BookCardWrapper = ({ b }: { b: MockBook }) => {
  const router = useRouter();
  return (
    <BookCard
      key={b.id}
      book={b}
      actions={
        <Button
          variant={b.availableCopies > 0 ? "primary" : "outline"}
          size="xs"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            alert("Borrow");
          }}
        >
          {b.availableCopies > 0 ? "Borrow" : "Reserve"}
        </Button>
      }
    />
  );
};
