import { getItem, getItems } from "../actions";
import UpdateItemForm from "./update-item-form";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function generateStaticParams() {
  const items = await getItems();

  return items.map((item) => ({
    itemId: item.id,
  }));
}

export default async function Page({ params }: { params: { itemId: string } }) {
  const item = await getItem(params.itemId);

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
        <div className="flex-1 mx-6 py-2 lg:max-w-2xl">
          <UpdateItemForm item={item} />
        </div>
      </div>
    </div>
  );
}
