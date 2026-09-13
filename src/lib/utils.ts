import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Build a URLSearchParams from a server-rendered searchParams object. */
export function searchParamsFrom(params: Record<string, string | string[] | undefined>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === "string") p.set(k, v);
    else if (Array.isArray(v)) v.forEach((x) => p.append(k, x));
  }
  return p;
}
