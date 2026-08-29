"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import styles from "@/styles/admin-shared.module.css";

import { getFilterBar } from "@/constants/admin-filterbar-constants";

import { Flag, Search } from "lucide-react";
interface Props {
  pendingCount: number;
  flaggedCount: number;
}

const AlertBar = ({ pendingCount, flaggedCount }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const setParam = ({ param, value }: { param: string; value: string }) => {
    const p = new URLSearchParams(params);
    p.set(param, value);
    router.replace(`?${p.toString()}`);
  };

  return (
    (pendingCount > 0 || flaggedCount > 0) && (
      <div className={styles.alertWarning}>
        <Flag size={15} color="var(--warning)" />
        <span style={{ flex: 1 }}>
          <strong>{pendingCount} pending</strong> and{" "}
          <strong>{flaggedCount} flagged</strong> reviews need moderation
        </span>
        <button
          onClick={() => setParam({ param: "filter", value: "pending" })}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "color-mix(in srgb,var(--warning) 80%,#000)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Review pending →
        </button>
      </div>
    )
  );
};

export const FilterBar = ({ pendingCount, flaggedCount }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const setParam = ({ param, value }: { param: string; value: string }) => {
    const p = new URLSearchParams(params);
    p.set(param, value);
    router.replace(`?${p.toString()}`);
  };
  return (
    <div className={styles.filterBar}>
      {(["all", "pending", "flagged", "published"] as const).map((f) => (
        <button
          key={f}
          onClick={() => setParam({ param: "filter", value: f })}
          className={`${styles.filterTab} ${params.get("filter") === f ? styles.active : ""}`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
          {f === "pending" && pendingCount > 0 && (
            <span
              style={{
                marginLeft: 5,
                background: "var(--warning)",
                color: "#fff",
                borderRadius: 10,
                fontSize: 10,
                padding: "1px 5px",
                fontWeight: 700,
              }}
            >
              {pendingCount}
            </span>
          )}
          {f === "flagged" && flaggedCount > 0 && (
            <span
              style={{
                marginLeft: 5,
                background: "var(--destructive)",
                color: "#fff",
                borderRadius: 10,
                fontSize: 10,
                padding: "1px 5px",
                fontWeight: 700,
              }}
            >
              {flaggedCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export { AlertBar };
