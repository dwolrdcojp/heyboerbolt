"use server";
import prisma from "@/prisma/prisma";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "../..//utils/auth";
import { cache } from "react";
import { redirect } from "next/navigation";

const itemFormSchema = z.object({
  updatedBy: z.string().optional(),
  updatedAt: z.date().optional(),
  name: z.string().min(2).max(50),
  sku: z.string().min(2).max(50).optional(),
  quantity: z.coerce.number().min(1),
  minLevel: z.coerce.number().optional(),
  value: z.coerce.number(),
  location: z.string().min(2).max(50),
  type: z.string().min(2).max(50),
  tags: z.string().optional(),
  notes: z.string().min(0).max(500).optional(),
});

type PrevState = { message: null | string };

export async function updateItem(prevState: PrevState, formData: FormData) {
  try {
    const session = await auth();
    const userId = session?.user?.name;
    const itemId = formData.get("itemId") as string;

    const parsed = itemFormSchema.parse({
      updatedBy: userId as string,
      updatedAt: new Date(Date.now()) as Date,
      name: formData.get("name"),
      sku: formData.get("sku") || "",
      quantity: formData.get("quantity"),
      minLevel: formData.get("minLevel") || "",
      value: formData.get("value"),
      location: formData.get("location"),
      type: formData.get("type"),
      tags: formData.get("tags") || "",
      notes: formData.get("notes") || "",
    });

    const resp = await prisma.item.update({
      where: { id: itemId as string },
      data: parsed,
    });

    return {
      message: `Successfully updated ${resp.name}`,
    };
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e);
      return { message: `Server Error: Failed to update: ${e.message}` };
    } else {
      console.log(e);
      return { message: "Unknown Server Error: Failed to update." };
    }
  } finally {
    const itemId = formData.get("itemId") as string;
    revalidatePath(`/inventory/${itemId}`);
    revalidatePath("/inventory");
  }
}

export async function deleteItem(itemId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.name;

    const resp = await prisma.item.delete({
      where: { id: itemId },
    });

    return {
      message: `Successfully updated ${resp.name}`,
    };
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      return { message: `Server Error: Failed to delete ${e.message}` };
    } else {
      console.error(e);
      return { message: "Unkown Server Error: Failed to delete" };
    }
  } finally {
    redirect("/inventory");
    revalidatePath(`/inventory/${itemId}`);
    revalidatePath("/inventory");
  }
}
