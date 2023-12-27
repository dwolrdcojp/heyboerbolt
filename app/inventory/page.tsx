import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getItems } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Inventory() {
  const items = await getItems();
  return (
    <div className="grid p-4">
      <div className="grid grid-cols-2 my-4">
        <div className="cols-1">
          <h1 className=""> Inventory </h1>
        </div>

        <div className="cols-1 justify-self-end">
          <Button asChild>
            <Link href="/inventory/new">New Item</Link>
          </Button>
        </div>
      </div>

      {items &&
        items.map((item, index) => {
          return (
            <div>
              <Card key={index} className="my-2">
                <CardHeader>
                  <CardTitle>
                    <Link href={`/inventory/${item.id}`}>{item.name}</Link>
                  </CardTitle>
                  <CardDescription>SKU: {item?.sku}</CardDescription>
                </CardHeader>
                <CardContent key={index}>
                  <p>Quantity: {item.quantity}</p>
                  <p>Min Level: {item.minLevel}</p>
                  <p>Value: {item.value}</p>
                  <p>Location: {item.location}</p>
                  <p>Type: {item.type}</p>
                </CardContent>
                <CardFooter>
                  <p>Tags: {item.tags}</p>
                </CardFooter>
              </Card>
            </div>
          );
        })}
    </div>
  );
}
