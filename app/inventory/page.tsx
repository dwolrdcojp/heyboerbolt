import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Inventory() {
  return (
    <div>
      <h1> Inventory </h1>
      <Button asChild>
        <Link href="/inventory/new">New Item</Link>
      </Button>
    </div>
  );
}
