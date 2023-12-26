import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <div>
      <h1> Dashboard </h1>
      <Button asChild>
        <Link href="/inventory">Inventory</Link>
      </Button>
    </div>
  );
}
