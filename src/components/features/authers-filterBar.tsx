"use client";

import styles from "@/styles/admin-shared.module.css";


import { Search } from "lucide-react";

export default function FilterBar() {
          <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or nationality…"
          />
        </div>
        <select
          className={styles.selectInput}
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="borrows">Most Borrowed</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
}