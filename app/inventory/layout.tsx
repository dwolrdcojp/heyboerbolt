import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Announcement } from "@/components/announcement";
import { ExamplesNav } from "@/components/examples-nav";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { buttonVariants } from "@/registry/new-york/ui/button";

export const metadata: Metadata = {
  title: "Examples",
  description: "Check out some examples app built using the components.",
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
