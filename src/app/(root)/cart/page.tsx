"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useGetUserCartItemsQuery } from "@/graphql/generated/graphql"
import { useToast } from "@/hooks/use-toast"
import { MinusCircle, PlusCircle, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function CartPage() {
  const { data, loading, refetch } = useGetUserCartItemsQuery()
  const { toast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const cartItems = data?.userCartItems || []

  // Function to calculate price for a single cart item
  const calculateItemPrice = (item: any) => {
    const blankPrice = item.design.blankVariant.blankPrice
    const positionPrices = item.design.designPositions.reduce(
      (total: number, position: any) => total + position.positionType.basePrice,
      0,
    )

    // Calculate base price without discounts
    const basePrice = blankPrice + positionPrices

    // Check for applicable discounts
    const discounts = item.design.blankVariant.product.discounts || []
    let discountPercent = 0

    for (const discount of discounts) {
      if (item.quantity >= discount.minQuantity && discount.discountPercent > discountPercent) {
        discountPercent = discount.discountPercent
      }
    }

    // Apply discount if applicable
    const discountedPrice = basePrice * (1 - discountPercent)

    return {
      unitPrice: discountedPrice,
      totalPrice: discountedPrice * item.quantity,
      discountApplied: discountPercent > 0,
      discountPercent: discountPercent * 100,
    }
  }

  // Calculate cart totals
  const cartTotal = cartItems.reduce((total, item) => {
    return total + calculateItemPrice(item).totalPrice
  }, 0)

  // Handle quantity changes
  const handleQuantityChange = (id: string, newQuantity: number) => {
    // In a real app, this would call a mutation to update the quantity
    console.log(`Updating item ${id} to quantity ${newQuantity}`)
    toast({
      title: "Quantity updated",
      description: `Item quantity has been updated to ${newQuantity}`,
    })
    // Refetch cart data after update
    // refetch();
  }

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    // In a real app, this would call a mutation to remove the item
    console.log(`Removing item ${id} from cart`)
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      variant: "destructive",
    })
    // Refetch cart data after removal
    // refetch();
  }

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Checkout successful",
        description: "Your order has been placed successfully!",
      })
      setIsCheckingOut(false)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <Card className="p-8 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button>Continue Shopping</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => {
            const { unitPrice, totalPrice, discountApplied, discountPercent } = calculateItemPrice(item)
            const product = item?.design?.blankVariant?.product
            const variant = item?.design?.blankVariant?.systemVariant
            const positions = item?.design?.designPositions?.map((pos: any) => pos.positionType.positionName).join(", ")

            return (
              <Card key={item.id} className="mb-4 overflow-hidden">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative h-32 w-32 bg-muted rounded-md flex-shrink-0 mx-auto sm:mx-0">
                    <Image
                      src={product?.imageUrl || "/placeholder.svg?height=128&width=128"}
                      alt={product?.name || "name"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Size: {variant.size} • Color:{" "}
                          <span
                            className="inline-block h-3 w-3 rounded-full border"
                            style={{ backgroundColor: variant.color }}
                          ></span>
                        </p>
                        <p className="text-muted-foreground text-sm">Positions: {positions}</p>
                        {item.design.isTemplate && (
                          <Badge variant="outline" className="mt-1">
                            Template Design
                          </Badge>
                        )}
                      </div>

                      <div className="mt-2 sm:mt-0 text-right">
                        <div className="font-semibold">${totalPrice.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">${unitPrice.toFixed(2)} each</div>
                        {discountApplied && (
                          <Badge variant="secondary" className="mt-1">
                            {discountPercent}% discount applied
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Shipping, taxes, and discounts calculated at checkout
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

