"use client";


import { useSearchParams, useRouter } from "next/navigation";


import { LayoutGrid, List } from "lucide-react";
import { CATEGORIES } from "@/mock/portalData";

import SearchBar from "@/components/ui/SearchBar2.0";

export default function FilterBar() {
    const router = useRouter();
    const params = useSearchParams();

    const sort = params.get("sort") || "rating";
    const availableOnly = params.get("availableonly") === "true";
    const viewMode = params.get("viewMode") || "grid";
    const category = params.getAll("category") || "All";

    const setParam = ({ param, value }: { param: string; value: string }) => {
        const p = new URLSearchParams(params);
        p.set(param, value);
        router.replace(`?${p.toString()}`);
    };
    


    const handleClickForCategory = (cat: string) => {
        const p = new URLSearchParams(params);
        
        if(category.includes("All")){
            p.delete("category");
            p.append("category", cat);
        }
        else if(category.includes(cat)){
            p.delete("category");
            category?.filter(c => c !== cat)?.forEach(c => p.append("category", c));
        }else{
            p.append("category", cat);
        }
        if(p.getAll("category").length===0){
            p.append("category", "All");
        }
        router.replace(`?${p.toString()}`);
         
    }
  return (<>
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 14,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ flex: "1 1 240px",  }}>
        <SearchBar
          placeholder="Search title, author, tag…"
        />
      </div>
      <select
        value={sort}
        onChange={(e) => setParam({ param: "sort", value: e.target.value })}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "var(--card)",
          fontFamily: "inherit",
          fontSize: 13,
          color: "var(--foreground)",
          cursor: "pointer",
        }}
      >
        <option value="rating">Sort: Best rated</option>
        <option value="title">Sort: Title A–Z</option>
        <option value="new">Sort: Newest</option>
      </select>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(e) => setParam({ param: "availableonly", value: e.target.checked.toString() })}
        />
        Available only
      </label>
      <div
        style={{
          display: "flex",
          gap: 2,
          background: "var(--muted)",
          borderRadius: 8,
          padding: 2,
        }}
      >
        <button
          onClick={() => setParam({ param: "viewMode", value: "grid" })}
          style={{
            padding: "5px 8px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            background: viewMode === "grid" ? "var(--card)" : "transparent",
            color:
              viewMode === "grid"
                ? "var(--foreground)"
                : "var(--muted-foreground)",
          }}
        >
          <LayoutGrid size={16} />
        </button>
        <button
            onClick={() => setParam({ param: "viewMode", value: "list" })}
          style={{
            padding: "5px 8px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            background: viewMode === "list" ? "var(--card)" : "transparent",
            color:
              viewMode === "list"
                ? "var(--foreground)"
                : "var(--muted-foreground)",
          }}
        >
          <List size={16} />
        </button>
        <button onClick={()=>router.replace("/user/books?q=&availableonly=false&category=All&sort=rating&viewMode=grid")}>CLEAR</button>
      </div>
    </div>
     <div style={{ display:'flex', gap:6, marginBottom:20, flexWrap:'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleClickForCategory(cat.name)}
                style={{
                  padding:'5px 14px', borderRadius:20, border:'1px solid', fontSize:12, fontWeight:500,
                  cursor:'pointer', fontFamily:'inherit', transition:'all 120ms',
                  background: category.includes(cat.name) ? 'var(--accent)' : 'transparent',
                  color: category.includes(cat.name) ? '#fff' : 'var(--muted-foreground)',
                  borderColor: category.includes(cat.name) ? 'var(--accent)' : 'var(--border)',
                }}
              >{cat.name}</button>
            ))}
          </div>
    </>
  );
}
