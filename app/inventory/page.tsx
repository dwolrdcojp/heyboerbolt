import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getItems } from "./actions";

export default async function Inventory() {
  const items = await getItems();
  return (
    <div>
      <div className="flex flex-col space-y-8 lg:flex-row lg-space-x-12 lg:space-y-0">
        <div className="flex-1 m-6 lg:max-w-2xl">
          <h1> Inventory </h1>

          <Button asChild>
            <Link href="/inventory/new">New Item</Link>
          </Button>

          {items &&
            items.map((item) => {
              return (
                <div>
                  <p>{item.id}</p>
                  <p>{item.sku}</p>
                  <p>{item.name}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
