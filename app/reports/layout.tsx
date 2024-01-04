import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reports",
  description: "Custom inventory reports.",
};

interface ExamplesLayoutProps {
  children: React.ReactNode;
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl my-6">
        {children}
      </div>
    </>
  );
}
