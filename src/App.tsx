import { QueryProvider } from "@/providers/query-provider";
import { Router } from "@/routes/router";

export function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
