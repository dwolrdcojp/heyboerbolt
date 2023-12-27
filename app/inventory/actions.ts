"use server";
import prisma from "@/prisma/prisma";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "../utils/auth";

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

export type ItemFormValues = z.infer<typeof itemFormSchema>;

export async function getItems() {
  const items = await prisma.item.findMany({});

  return items;
}

type PrevState = { message: null | string };

export async function createItem(prevState: PrevState, formData: FormData) {
  try {
    const session = await auth();
    const userId = session?.user?.name;

    const parsed = itemFormSchema.parse({
      createdBy: userId as string,
      createdAt: new Date(Date.now()) as Date,
      updatedBy: undefined,
      updatedAt: undefined,
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

    const resp = await prisma.item.create({
      data: parsed,
    });

    revalidatePath("/inventory");
    return {
      message: `Successfully added ${resp.name}`,
    };
  } catch (e) {
    console.log(e);
    return { message: "Server Error: Failed to create" };
  }
}
