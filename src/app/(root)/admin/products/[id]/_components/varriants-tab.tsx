"use client"

import { Package, Pencil, Plus } from "lucide-react"
import { useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  type GetProductByIdQuery,
  useCreateSystemConfigVariantMutation,
  useUpdateSystemConfigVariantMutation,
} from "@/graphql/generated/graphql"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const variantFormSchema = z.object({
  price: z.number().min(10000, "Price must be at least 10,000").max(500000, "Price cannot exceed 500,000"),
  color: z.string().optional(),
  size: z.string().optional(),
  isActive: z.boolean().default(true),
})

type VariantFormValues = z.infer<typeof variantFormSchema>

export default function VarriantsTab({
  product,
}: {
  product: GetProductByIdQuery["product"]
}) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [updateSystemConfigVariant, { loading }] = useUpdateSystemConfigVariantMutation()
  const [createSystemConfigVariant, { loading: createLoading }] = useCreateSystemConfigVariantMutation()

  const form = useForm<VariantFormValues>({
    resolver: zodResolver(variantFormSchema),
    defaultValues: {
      price: 0,
      color: "",
      size: "",
      isActive: true,
    },
  })

  const handleUpdateSystemConfigVariant = async (data: VariantFormValues) => {
    if (!selectedVariant && !isCreate) return

    try {
      if (isCreate) {
        await createSystemConfigVariant({
          variables: {
            createSystemConfigVariantInput: {
              productId: product.id,
              color: data.color,
              size: data.size,
              price: data.price,
              model: null,
            },
          },
          onCompleted: () => {
            toast.success("Variant created successfully")
            setOpen(false)
            setIsCreate(false)
          },
          onError: () => {
            toast.error("Failed to create variant")
          },
          refetchQueries: ["GetProductById"],
        })
      } else {
        await updateSystemConfigVariant({
          variables: {
            updateSystemConfigVariantInput: {
              id: selectedVariant.id,
              productId: product.id,
              color: data.color,
              size: data.size,
              price: data.price,
              model: null,
            },
          },
          onCompleted: () => {
            toast.success("Variant updated successfully")
            setOpen(false)
          },
          onError: () => {
            toast.error("Failed to update variant")
          },
          refetchQueries: ["GetProductById"],
        })
      }
    } catch (error) {
      console.error("Error handling variant:", error)
    }
  }

  const handleEditVariant = (variant: any) => {
    setSelectedVariant(variant)
    setIsCreate(false)
    form.reset({
      price: variant.price || 0,
      color: variant.color || "",
      size: variant.size || "",
      isActive: variant.isActive ?? true,
    })
    setOpen(true)
  }

  const handleCreateVariant = () => {
    setSelectedVariant(null)
    setIsCreate(true)
    form.reset({
      price: 0,
      color: "",
      size: "",
      isActive: true,
    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setIsCreate(false)
    setSelectedVariant(null)
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Variants</h2>
            <p className="text-muted-foreground">Define variants for this product</p>
          </div>
          <Button onClick={handleCreateVariant}>
            <Plus className="mr-2 h-4 w-4" />
            Add Variant
          </Button>
        </div>
      </div>
      {product.variants && product.variants.length > 0 ? (
        <div className="space-y-4">
          <div className="">
            <div className="relative h-[300px]">
              <ScrollArea className="h-full">
                <table className="w-full caption-bottom text-sm">
                  <thead className="bg-muted sticky top-0 border-b">
                    <tr className="border-b transition-colors">
                      <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Price</th>
                      <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Color</th>
                      <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Size</th>
                      <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {product.variants.map((variant, index) => {
                      const color = "color" in variant ? String(variant.color) : null
                      const size = "size" in variant ? String(variant.size) : null
                      return (
                        <tr key={index} className="hover:bg-muted/50 border-b transition-colors">
                          <td className="p-2 align-middle whitespace-nowrap">{formatPrice(variant?.price || 0)}</td>
                          <td className="p-2 align-middle whitespace-nowrap">
                            {color ? (
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-4 w-4 rounded-full border"
                                  style={{
                                    backgroundColor: color,
                                  }}
                                />
                                {color}
                              </div>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="p-2 align-middle whitespace-nowrap">{size || "N/A"}</td>
                          <td className="p-2 align-middle whitespace-nowrap">
                            <Button variant="ghost" size="icon" onClick={() => handleEditVariant(variant)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </ScrollArea>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center text-center">
            <Package className="text-muted-foreground mb-2 h-10 w-10" />
            <h3 className="font-medium">No variants available</h3>
            <p className="text-muted-foreground text-sm">This product doesn't have any variants yet.</p>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isCreate ? "Create Variant" : "Edit Variant"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateSystemConfigVariant)} className="space-y-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <div className="relative">
                          <Input
                            type="color"
                            className="w-12 h-10 p-1 cursor-pointer"
                            {...field}
                            value={field.value || "#000000"}
                          />
                        </div>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="e.g. Red, Blue, Green"
                          className="flex-1"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || createLoading}>
                  {loading || createLoading
                    ? isCreate
                      ? "Creating..."
                      : "Saving..."
                    : isCreate
                      ? "Create Variant"
                      : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
