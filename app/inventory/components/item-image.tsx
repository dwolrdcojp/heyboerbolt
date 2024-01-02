"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ItemImage({ imageUrl }) {
  return (
    <Card className="pt-6 m-2">
      <CardContent>
        <div className="h-300 w-300">
          <Image
            className="border-0 rounded"
            src={`/item-${2}.jpg`}
            width={300}
            height={300}
            alt="item"
          />
        </div>
      </CardContent>
    </Card>
  );
}
