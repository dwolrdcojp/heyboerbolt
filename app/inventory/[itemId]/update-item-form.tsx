"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { TagsInput } from "../new/tags-input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateItem } from "./actions";
import Link from "next/link";
import { StyledCurrencyInput } from "../components/styled-currency-input";

const itemFormSchema = z.object({
  name: z.string().min(2).max(50),
  sku: z.string().optional(),
  quantity: z.coerce.number().min(1),
  minLevel: z.coerce.number().optional(),
  value: z.coerce.number(),
  location: z.string().min(2).max(50),
  type: z.string().min(2).max(50),
  tags: z.array(z.object({ label: z.string() })).optional(),
  notes: z.string().min(0).max(500).optional(),
});

const initialState = { message: "" };

export type ItemFormValues = z.infer<typeof itemFormSchema>;

export default function UpdateItemForm({ item }) {
  const [state, updateAction] = useFormState(updateItem, initialState);
  const parsedItem = JSON.parse(item);

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: parsedItem?.name || "",
      sku: parsedItem?.sku || "",
      quantity: parsedItem?.quantity || "",
      minLevel: parsedItem?.minLevel || "",
      value: parsedItem?.value || "",
      location: parsedItem?.location || "",
      type: parsedItem?.type || "",
      tags:
        parsedItem?.tags?.split(",").map((tag: string) => {
          return { label: tag };
        }) || "",
      notes: parsedItem?.notes || "",
    },
  });

  const myUpdateAction = async (formData: FormData) => {
    // Hack to make form work with react-hook-form
    const valid = await form.trigger();
    if (!valid) return;

    const formValues = form.getValues() as ItemFormValues;
    const tempFormData = new FormData();
    tempFormData.set("itemId", parsedItem.id as string);

    for (const [key, value] of Object.entries(formValues)) {
      if (typeof value !== "undefined") {
        // Handle tags array
        if (key === "tags" && Array.isArray(value)) {
          // Assuming each object in the array has a "label" property
          const tagsString = value.map((tag) => tag.label).join(",");
          tempFormData.set(key, tagsString);
        } else {
          tempFormData.set(key, value.toString());
        }
      }
    }
    return await updateAction(tempFormData);
  };

  function onSubmit() {
    toast(`${state.message}`, {
      description: new Date(Date.now()).toString(),
      action: {
        label: "Ok",
        onClick: () => console.log("Ok"),
      },
    });
  }

  useEffect(() => {
    if (state?.message) {
      onSubmit();
    }
  }, [state]);

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form action={myUpdateAction} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Bolt A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="HBB1T2S1C3"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is an optional code for barcodes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the quantity in stock.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="minLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Level</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the minimum acceptable level.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <StyledCurrencyInput
                    placeholder="$100.00"
                    defaultValue={field.value}
                    onValueChange={(value, name) => field.onChange(value)}
                    decimalsLimit={2}
                    fixedDecimalLength={2}
                    onBlur={field.onBlur}
                    prefix="$"
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>
                  This is the value of one unit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Container #1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is where the item can be found.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Raw Material"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is the type of item.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagsInput name="tags" control={form.control} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Notes..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2">
            <div className="cols-1">
              <Button variant="ghost" asChild>
                <Link href="/inventory">Cancel</Link>
              </Button>
            </div>
            <div className="cols-1 justify-self-end">
              <Button type="submit">Update</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
