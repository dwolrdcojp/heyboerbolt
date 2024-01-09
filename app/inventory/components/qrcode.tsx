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
import { Button } from "@/components/ui/button";

export function QRCodeImage({ item, qrCodeUrl }) {
  const parsedItem = JSON.parse(item);
  const printElement = () => {
    const content = document?.getElementById("printableCard")?.innerHTML;
    const printWindow = window.open("", "", "");

    printWindow?.document.write("<html><head><title>Print</title>");

    // Add any additional stylesheet links or styles here
    printWindow?.document.write(`
    <style>
        body {
          margin: 25px;
          padding: 25px;
          font-family: 'Helvetica', 'Arial', sans-serif;
        }
        body .card {
          border: 10px dashed #000;
          padding: 25px;
          margin-bottom: 20px;
          page-break-inside: avoid;
          width: 325px;
        }
        body .card-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        body .card-content {
          font-size: 14px;
          margin-bottom: 15px;
        }
        body .card-content div {
          margin-bottom: 5px;
        }
        body .qr-code {
          max-width: 100%;
          display: block;
          margin: auto;
        }
    </style>
  `);

    printWindow?.document.write("</head><body>");
    printWindow?.document.write(content ? content : "");
    printWindow?.document.write("</body></html>");

    printWindow?.document.close();
    if (printWindow !== null) {
      printWindow.onload = function () {
        printWindow?.focus();
        //printWindow?.print();
        //printWindow?.close();
      };
    }
  };

  return (
    <>
      <div id="printableCard">
        <Card id="card" className="card m-2">
          <CardHeader>
            <CardTitle id="card-title" className="capitalize">
              Item: {parsedItem.name}
            </CardTitle>
            <CardDescription>Type: {parsedItem.type}</CardDescription>
          </CardHeader>
          <CardContent id="card-content">
            <Image
              id="qr-code"
              src={qrCodeUrl}
              width={300}
              height={300}
              alt="qr code"
            />
          </CardContent>
          <CardFooter>
            <div key="sku" className="uppercase">
              SKU: {parsedItem.sku ? parsedItem.sku : parsedItem.id}
            </div>
          </CardFooter>
        </Card>
      </div>
      <Button className="m-2" onClick={() => printElement()}>
        Print
      </Button>
    </>
  );
}
