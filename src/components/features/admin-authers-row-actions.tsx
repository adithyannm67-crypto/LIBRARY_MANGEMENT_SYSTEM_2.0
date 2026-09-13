"use client";


import Button from "../ui/Button";
import { useRouter, } from "next/navigation";

import { Pencil, Trash2 } from "lucide-react";
import { searchParamsFrom } from "@/lib/utils";

interface RowActionsProps {
  author_id: string;
  params: URLSearchParams;
}


export default function RowActions({author_id,params}: RowActionsProps) {

      const router = useRouter();
      const setParam = (param: string, value: string) => {
        const p = new URLSearchParams(params);
        p.set(param, value);
        router.replace(`?${p.toString()}`);
      };
    
    return(          <div style={{ display: "flex", gap: 4 }}>
            <Button
              variant="ghost"
              size="xs"
              leadingIcon={<Pencil size={11} />}
              onClick={(e) => {
                e.stopPropagation();
                setParam("edit", author_id);
              }}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="xs"
              leadingIcon={<Trash2 size={11} />}
              style={{ color: "var(--destructive)" }}
              onClick={(e) => {
                e.stopPropagation();
                setParam("delete", author_id);
              }}
            >
              Delete
            </Button>
          </div>)
}