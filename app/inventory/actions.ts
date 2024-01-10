"use server";
import prisma from "@/prisma/prisma";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "../utils/auth";
import { cache } from "react";
import QRCode from "qrcode";
import { getProtocol } from "../utils/functions";

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

export const getItems = cache(async () => {
  const items = await prisma.item.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return items;
});

export const getItem = cache(async (id: string) => {
  const item = await prisma.item.findUnique({
    where: {
      id: id,
    },
  });
  return item;
});

type PrevState = { message: null | string };

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

    const qrCodeUrlData = await generateQR(
      `${getProtocol()}${process.env.NEXT_PUBLIC_VERCEL_URL}/inventory/${
        resp.id
      }`,
    );

    const updateResp = await prisma.item.update({
      where: { id: resp.id as string },
      data: { barcode: qrCodeUrlData as string },
    });

    revalidatePath("/inventory");
    return {
      message: `Successfully added ${resp.name}`,
    };
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e);
      return { message: `Server Error: Failed to create: ${e.message}` };
    } else {
      console.log(e);
      return { message: "Unknown Server Error: Failed to create." };
    }
  }
}
