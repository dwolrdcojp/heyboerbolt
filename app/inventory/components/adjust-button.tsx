"use client";
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
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Item } from "@prisma/client";
import { useState } from "react";
import { adjustItem } from "../actions";

export function AdjustButton({ itemJSON }: { itemJSON: string }) {
  const item = JSON.parse(itemJSON);
  const [quantity, setQuantity] = useState(item.quantity as number);
  const adjustItemWithId = adjustItem.bind(
    null,
    item.id as string,
    quantity as number,
  );

  function onClick(adjustment: number) {
    setQuantity(quantity + adjustment);
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="absolute right-4 bottom-4">
            <Button>Adjust +/-</Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Adjust the inventory quantity.</DrawerTitle>
              <DrawerDescription>
                Current quantity: {item?.quantity}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(-1)}
                  disabled={quantity <= 0}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {quantity}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    {"Inventory Quantity"}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <form action={adjustItemWithId}>
                <Button className="w-full">Adjust</Button>
              </form>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
