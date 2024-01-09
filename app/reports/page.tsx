import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <div>
      <div>
        <h2 className="text-3xl px-1 font-bold tracking-tight">Reports</h2>
        <p className="px-1 text-muted-foreground">Custom generated reports.</p>
      </div>
    </div>
  );
}
