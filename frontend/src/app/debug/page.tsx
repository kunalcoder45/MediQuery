// Create src/app/debug/page.tsx
export default function DebugPage() {
  return (
    <div className="p-8">
      <h1>Debug Info</h1>
      <pre>
        {JSON.stringify({
          NODE_ENV: process.env.NODE_ENV,
          NEXT_PUBLIC_CHAT_API_BASE_URL: process.env.NEXT_PUBLIC_CHAT_API_BASE_URL,
          window_location: typeof window !== 'undefined' ? window.location.href : 'SSR'
        }, null, 2)}
      </pre>
    </div>
  );
}