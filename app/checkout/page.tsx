"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { ArrowLeft, MapPin, CreditCard, Wallet, Banknote, Clock, Truck, Tag } from "lucide-react"
import { Header } from "@/components/customer-panel-components/header"
import { Footer } from "@/components/customer-panel-components/footer"

interface DeliveryAddress {
  id: string
  label: string
  address: string
  details?: string
  isDefault?: boolean
}

interface PaymentMethod {
  id: string
  type: "card" | "cash" | "digital"
  label: string
  details: string
  icon: React.ReactNode
}

const mockAddresses: DeliveryAddress[] = [
  {
    id: "home",
    label: "Home",
    address: "123 Main Street, Apt 4B, Downtown",
    details: "Ring doorbell twice",
    isDefault: true,
  },
  {
    id: "work",
    label: "Work",
    address: "456 Business Ave, Suite 200, Business District",
    details: "Leave with reception",
  },
]

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    type: "card",
    label: "Credit/Debit Card",
    details: "Visa, Mastercard, American Express",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: "cash",
    type: "cash",
    label: "Cash on Delivery",
    details: "Pay when your order arrives",
    icon: <Banknote className="w-5 h-5" />,
  },
  {
    id: "digital",
    type: "digital",
    label: "Digital Wallet",
    details: "Apple Pay, Google Pay, PayPal",
    icon: <Wallet className="w-5 h-5" />,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getCartTotal, appliedPromo, getDiscountAmount, getFinalTotal, clearCart } = useCart()

  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0]?.id || "")
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // New address form
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    details: "",
  })

  // Card details (for simulation)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const restaurant = items[0] // All items from same restaurant

  // Prevent rendering if no restaurant (for prerendering safety)
  if (!restaurant) {
    return null
  }
  const subtotal = getCartTotal()
  const discountAmount = getDiscountAmount()
  const deliveryFee = restaurant?.restaurantId === 1 ? 0 : 2.99 // Mock delivery fee
  const serviceFee = 2.99
  const finalTotal = getFinalTotal() + deliveryFee + serviceFee

  const handleAddNewAddress = () => {
    if (!newAddress.label || !newAddress.address) return

    const newAddr: DeliveryAddress = {
      id: `addr-${Date.now()}`,
      ...newAddress,
    }

    mockAddresses.push(newAddr)
    setSelectedAddress(newAddr.id)
    setShowNewAddressForm(false)
    setNewAddress({ label: "", address: "", details: "" })
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      setIsProcessing(false);
      return;
    }

    try {
      // Create order via API
      const orderData = {
        restaurantId: restaurant?.restaurantId || 1,
        items: items.map(item => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
          unitPrice: item.menuItem.price,
          totalPrice: item.totalPrice,
          name: item.menuItem.name,
          customizations: item.customizations
        })),
        addressId: selectedAddress,
        paymentMethod: selectedPayment,
        deliveryInstructions,
        promoCode: appliedPromo?.code
      };

      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();

        // Clear cart
        clearCart();

        // Redirect to confirmation
        router.push(`/order-confirmation/${order.id}`);
      } else {
        const error = await response.json();
        alert(`Failed to place order: ${error.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
            <div>
              <h1 className="font-heading font-bold text-3xl text-secondary">Checkout</h1>
              <p className="text-muted-foreground">Complete your order from {restaurant?.restaurantName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <Card className="border border-secondary/50 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-foreground" />
                    <span className="text-foreground">Delivery Address</span>
                    
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    {mockAddresses.map((address) => (
                      <div key={address.id} className="flex items-start space-x-2">
                        <RadioGroupItem value={address.id} id={address.id} className="mt-1 bg-secondary text-white" />
                        <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{address.label}</span>
                            {address.isDefault && <Badge variant="outline" className=" bg-secondary border-none text-white">Default</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{address.address}</p>
                          {address.details && <p className="text-xs text-muted-foreground mt-1">{address.details}</p>}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {!showNewAddressForm ? (
                    <Button
                      variant="outline"
                      onClick={() => setShowNewAddressForm(true)}
                      className="w-full border-none text-white bg-secondary cursor-pointer"
                    >
                      Add New Address
                    </Button>
                  ) : (
                    <div className="space-y-3 p-4 border border-secondary/50 rounded-lg">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="label" className="mb-2">Address Label</Label>
                          <Input
                            id="label"
                            placeholder="e.g., Home, Work"
                            value={newAddress.label}
                            onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                            className="border border-secondary/50"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address" className="mb-2">Full Address</Label>
                        <Input
                          id="address"
                          placeholder="Street address, apartment, city"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                          className="border border-secondary/50 "
                        />
                      </div>
                      <div>
                        <Label htmlFor="details" className="mb-2">Delivery Instructions (Optional)</Label>
                        <Input
                          id="details"
                          placeholder="e.g., Ring doorbell, Leave at door"
                          value={newAddress.details}
                          onChange={(e) => setNewAddress({ ...newAddress, details: e.target.value })}
                          className="border border-secondary/50 "
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddNewAddress} variant="secondary" size="sm" className="bg-secondary hover:bg-none cursor-pointer">
                          Add Address
                        </Button>
                        <Button variant="outline" onClick={() => setShowNewAddressForm(false)} size="sm" className="bg-secondary/80 border-none cursor-pointer text-white">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border border-secondary/50 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-foreground" />

                    <span className="text-foreground">Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-start space-x-2">
                        <RadioGroupItem value={method.id} id={method.id} className="mt-1 bg-secondary" />
                        <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            {method.icon}
                            <span className="font-medium">{method.label}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{method.details}</p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Card Details Form (shown when card is selected) */}
                  {selectedPayment === "card" && (
                    <div className="space-y-3 p-4 border border-secondary/50 rounded-lg">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="cardName" className="mb-2">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            className="border border-secondary/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber" className="mb-2">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            className="border border-secondary/50"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 ">
                        <div>
                          <Label htmlFor="expiry" className="mb-2">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="border border-secondary/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="mb-2">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="border border-secondary/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Delivery Instructions */}
              <Card className="border border-secondary/50 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-center text-foreground"  />
                    <span className="text-foreground">Delivery Instructions</span>
                    
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special instructions for the delivery driver..."
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    rows={3}
                    className="border border-secondary/50"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border border-secondary/50 bg-white">
                <CardHeader>
                  <CardTitle className="text-foreground">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.quantity}x {item.menuItem.name}
                          </p>
                          {Object.entries(item.customizations).map(([key, value]: [string, any]) => (
                            <p key={key} className="text-xs text-muted-foreground">
                              {Array.isArray(value)
                                ? value.length > 0 && value.map((v: any) => v.name).join(", ")
                                : value && value.name}
                            </p>
                          ))}
                        </div>
                        <span className="font-medium">${item.totalPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {appliedPromo && discountAmount > 0 && (
                      <div className="flex justify-between text-primary">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>Discount ({appliedPromo.code})</span>
                        </div>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Delivery fee</span>
                      <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${serviceFee.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Estimated delivery: 25-35 minutes</span>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || !selectedAddress || !selectedPayment}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? "Processing..." : `Place Order • $${finalTotal.toFixed(2)}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
