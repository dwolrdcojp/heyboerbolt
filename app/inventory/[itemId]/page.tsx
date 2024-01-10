"use server";
import { getItem, getItems } from "../actions";
import UpdateItemForm from "./update-item-form";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemImage } from "../components/item-image";
import { QRCodeImage } from "../components/qrcode";
import { deleteItem } from "./actions";

export async function generateStaticParams() {
  const items = await getItems();

  return items.map((item) => ({
    itemId: item.id,
  }));
}

export default async function Page({ params }: { params: { itemId: string } }) {
  const item = await getItem(params.itemId);
  const deleteItemWithId = deleteItem.bind(null, params.itemId as string);

  return (
    <div className="space-y-6 m-6">
      <div className="flex">
        <div className="flex-auto w-48">
          <h3 className="text-lg font-medium capitalize">
            Inventory Item: {`${item?.name}`}
          </h3>
          <p className="text-sm text-muted-foreground">
            Update the inventory status of this item.
          </p>
        </div>
        <div>
          <form action={deleteItemWithId}>
            <Button variant="destructive"> Delete </Button>
          </form>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-4 lg:flex-row lg-space-x-12 lg:space-y-0">
        <div className="flex-1 w-3/5 mx-6 py-2 lg:max-w-2xl">
          <UpdateItemForm item={JSON.stringify(item)} />
        </div>
        <div className="m-1">
          <ItemImage imageUrl={"1"} />
          {item?.barcode && (
            <QRCodeImage item={JSON.stringify(item)} qrCodeUrl={item.barcode} />
          )}
        </div>
      </div>
    </div>
  );
}
