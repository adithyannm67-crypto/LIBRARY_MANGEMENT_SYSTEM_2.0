"use client";

import Button from "@/components/ui/Button";

/* error.tsx equivalent */
export default function LoginError({ onRetry }: { onRetry: () => void }) {
  return (
    <>
      <div style={{ paddingTop: 40, textAlign: "center" }}>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    </>
  );
}
import { NextPageContext } from 'next'

export default function Error({ statusCode }: { statusCode: number }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'
      }
    </p>
  )
}

Error.getInitialProps = ({ res, err, ...context }: NextPageContext) => {
  if(res) {
    return { statusCode: res.statusCode }
  }
  return { statusCode: err ? err.statusCode :400 }
}
import Error from 'next'
import { rawConfigSchema } from "shadcn/schema";

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const errorCode = res.ok ? false : res.statusCode
  const json = await res.json()

  return {
    props: { errorCode, stars: json.stargazers_count }
  }
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return <div>Next stars: {stars}</div>
}

// pages/404.tsx
export default function Custom404() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
    </>
  )
}

