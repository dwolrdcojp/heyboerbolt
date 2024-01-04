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
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { formatCurrency } from "../utils/functions";

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
              <Card key={index} className="my-2 hover:bg-secondary">
                <div className="grid grid-cols-4  p-0">
                  <div className="relative col-span-3 p-0">
                    <CardHeader>
                      <CardTitle className="hover:text-destructive">
                        <Link href={`/inventory/${item.id}`}>{item.name}</Link>
                      </CardTitle>
                      <CardDescription>SKU: {item?.sku}</CardDescription>
                    </CardHeader>
                    <CardContent key={index}>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <div className="py-4">
                          <p className="py-2">Quantity: {item.quantity}</p>
                          <p className="py-2">Min Level: {item.minLevel}</p>
                        </div>
                        <div>
                          <p className="py-2">Location: {item.location}</p>
                          <p className="py-2">Type: {item.type}</p>
                        </div>
                        <div>
                          <p className="py-2">
                            Item Value:{" "}
                            {item?.value
                              ? `${formatCurrency(item?.value)}`
                              : "N/A"}
                          </p>
                          <p className="py-2">
                            Total Value:{" "}
                            {item?.value && item?.quantity
                              ? `${formatCurrency(
                                  item?.value * item?.quantity,
                                )}`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      Tags:{" "}
                      {item.tags?.split(",").map((tag) => {
                        return (
                          <span className="p-1 bg-secondary mx-1 border rounded">
                            {tag}
                          </span>
                        );
                      })}
                      <Drawer>
                        <DrawerTrigger asChild>
                          <div className="absolute right-4 bottom-4">
                            <Button>Adjust +/-</Button>
                          </div>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>
                              Are you sure absolutely sure?
                            </DrawerTitle>
                            <DrawerDescription>
                              This action cannot be undone.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </CardFooter>
                  </div>
                  <div className="cols-1 p-0 h-300 w-300">
                    <Image
                      className="border-0 rounded"
                      src={`/item-${index + 1}.jpg`}
                      width={300}
                      height={300}
                      alt="item"
                    />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
}
