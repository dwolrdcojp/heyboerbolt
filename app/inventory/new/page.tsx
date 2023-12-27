"use server";
import ItemForm from "./item-form";
import { Separator } from "@/components/ui/separator";

export default async function NewItem() {
  return (
    <div className="space-y-6 m-6">
      <div>
        <h3 className="text-lg font-medium">Add a new item</h3>
        <p className="text-sm text-muted-foreground">
          Add a new item to the inventory.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-4 lg:flex-row lg-space-x-12 lg:space-y-0">
        <div className="flex-1 mx-6 py-2 lg:max-w-2xl">
          <ItemForm />
        </div>
      </div>
    </div>
  );
}
