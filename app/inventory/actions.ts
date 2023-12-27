import prisma from "@/prisma/prisma";

export async function getItems() {
  const items = await prisma.item.findMany({});

  return items;
}
