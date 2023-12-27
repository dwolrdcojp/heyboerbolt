-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "quantity" INTEGER,
    "minLevel" INTEGER,
    "value" INTEGER,
    "location" TEXT,
    "type" TEXT,
    "tags" TEXT,
    "notes" TEXT,
    "image" TEXT,
    "barcode" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_sku_key" ON "Item"("sku");
