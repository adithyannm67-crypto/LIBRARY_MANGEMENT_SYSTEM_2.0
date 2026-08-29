"use client";

import Button from "@/components/ui/Button";

/* error.tsx equivalent */
export default function SignupError({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <div style={{ paddingTop: 40, textAlign: "center" }}>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    </>
  );
}
