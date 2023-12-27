"use server";
import prisma from "@/prisma/prisma";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "../..//utils/auth";
import { cache } from "react";

const itemFormSchema = z.object({
  createdBy: z.string(),
  createdAt: z.date(),
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
  console.log("HITTT 2?");
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

    revalidatePath(`/inventory/${itemId}`);
    revalidatePath("/inventory");
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
  }
}
