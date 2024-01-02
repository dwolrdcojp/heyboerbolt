"use server";
import { getItem, getItems } from "../actions";
import UpdateItemForm from "./update-item-form";
import { Separator } from "@/components/ui/separator";
import QRCode from "qrcode";

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

export async function generateStaticParams() {
  const items = await getItems();

  return items.map((item) => ({
    itemId: item.id,
  }));
}

const generateQR = async (text: string) => {
  const opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 1,
    margin: 1,
    color: {
      dark: "#000",
      light: "#FFF",
    },
  };
  try {
    const url = await QRCode.toDataURL(text, opts);
    return url;
  } catch (err) {
    console.error(err);
  }
};

export default async function Page({ params }: { params: { itemId: string } }) {
  const itemData = await getItem(params.itemId);
  const qrCodeUrlData = await generateQR(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/inventory/${params.itemId}`,
  );


  const [item, qrCodeUrl] = await Promise.all([itemData, qrCodeUrlData]);

  return (
    <div className="space-y-6 m-6">
      <div>
        <h3 className="text-lg font-medium">
          Inventory Item: {item?.name}
          {" - "} {item?.sku}
        </h3>
        <p className="text-sm text-muted-foreground">
          Update the inventory status of this item.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-4 lg:flex-row lg-space-x-12 lg:space-y-0">
        <div className="flex-1 w-3/5 mx-6 py-2 lg:max-w-2xl">
          <UpdateItemForm item={item} />
        </div>
        <div className="m-1">
          <ItemImage imageUrl={"1"} />
          <QRCodeImage item={item} qrCodeUrl={qrCodeUrl} />
        </div>
      </div>
    </div>
  );
}
