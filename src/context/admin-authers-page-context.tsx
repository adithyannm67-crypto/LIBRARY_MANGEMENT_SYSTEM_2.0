"use client";

import { Author } from "@/mock/mock/types";
import { useSearchParams } from "next/navigation";

import React, { createContext, useContext, useMemo, useState } from "react";

interface PageContextType {
  DATA: Author[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const PageContext = createContext<PageContextType | null>(null);

interface Props {
  children: React.ReactNode;
  DATA: Author[];
}

export default function PageProvider({ children, DATA }: Props) {
  const searchParams = useSearchParams();

  const getSearchTermFromUrl = () => {
    const searchTerm = searchParams.get("q");
    return searchTerm || "";
  };

  const [query, setQuery] = useState(getSearchTermFromUrl());
  const [sort, setSort] = useState<"name" | "borrows" | "rating">("borrows");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = DATA.filter(
    (a) =>
      !query ||
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.nationality.toLowerCase().includes(query.toLowerCase()),
  ).sort((a, b) =>
    sort === "borrows"
      ? b.borrowCount - a.borrowCount
      : sort === "rating"
        ? b.rating - a.rating
        : a.name.localeCompare(b.name),
  );
  const value = useMemo(
    () => ({
      DATA: filtered,
      query,
      setQuery,
      sort,
      setSort,
    }),
    [filtered, query, sort],
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePageContext() {
  return useContext(PageContext);
}
