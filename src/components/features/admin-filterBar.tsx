"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import styles from "@/styles/admin-shared.module.css";

import { getFilterBar } from "@/constants/admin-filterbar-constants";

import { Search } from "lucide-react";
interface Props {
  cats?: string[];
}

export default function Filterbar({ cats }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const fields = getFilterBar({ path: pathname, cats })?.fields ?? [];
  const inputFields = fields.filter((field) => field.type === "search") ?? null;
  const selectFields =
    fields.filter((field) => field.type === "select") ?? null;

  const setParam = ({ param, value }: { param: string; value: string }) => {
    const p = new URLSearchParams(params);
    p.set(param, value);
    router.replace(`?${p.toString()}`);
  };

  const tabFields = fields.find((field) => field.type === "tabs") ?? null;

  return (
    <div className={styles.filterBar}>
      {inputFields.length > 0 &&
        inputFields.map(({ param, placeholder }) => (
          <div key={param} className={styles.searchWrap}>
            <Search size={14} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              defaultValue={params.get(param) ?? ""}
              onChange={(e) => setParam({ param, value: e.target.value })}
              placeholder={placeholder}
            />
          </div>
        ))}

      {selectFields.length > 0 &&
        selectFields.map(({ param, options }) => (
          <select
          key={param}
            className={styles.selectInput}
            defaultValue={params.get(param) ?? ""}
            onChange={(e) => setParam({ param, value: e.target.value })}
          >
            {options.map((c) => (
              <option key={typeof c === "string" ? c : c.value}>
                {typeof c === "string" ? c : c.label}
              </option>
            ))}
          </select>
        ))}
      {tabFields &&
        tabFields.options.map((c) => (
          <button
            key={typeof c === "string" ? c : c.value}
            onClick={() => {
              setParam({
                param: tabFields.param,
                value: typeof c === "string" ? c : c.value,
              });
            }}
            className={`${styles.filterTab} ${status === (typeof c === "string" ? c : c.value) ? styles.active : ""}`}
          >
            {typeof c === "string" ? c : c.label}
          </button>
        ))}
    </div>
  );
}
