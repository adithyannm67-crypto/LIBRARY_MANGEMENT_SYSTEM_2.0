"use client";
import { useSearchParams, useRouter } from "next/navigation";

import React, { useRef } from "react";
import clsx from "clsx";
import { Search, X } from "lucide-react";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  
  
  placeholder?: string;
  size?: "md" | "lg";
  shortcut?: string;
  onEnter?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
    
  placeholder = "Search…",
  size = "md",
  shortcut,
  onEnter,
  className,
  autoFocus,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const inputRef = useRef<HTMLInputElement>(null);

  const setParam = ({ value }: { value: string }) => {
    const p = new URLSearchParams(searchParams);
    p.set("q", value);
    router.replace(`?${p.toString()}`);
  };

  return (
    <div className={clsx(styles.root, size === "lg" && styles.lg, className)}>
      <span className={styles.searchIcon}>
        <Search size={14} />
      </span>
      <input
        ref={inputRef}
        type="search"
        defaultValue={qParam}
        onChange={(e) => setParam({ value: e.target.value })}
        placeholder={placeholder}
        className={styles.input}
        autoFocus={autoFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter?.();
        }}
        aria-label={placeholder}
      />
      {qParam ? (
        <button
          className={styles.clearBtn}
          onClick={() => {
            setParam({ value: "" });
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
        >
          <X size={10} />
        </button>
      ) : (
        shortcut && (
          <div className={styles.shortcut}>
            <span className={styles.kbd}>{shortcut}</span>
          </div>
        )
      )}
    </div>
  );
}
