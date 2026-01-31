'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For getting started",
    features: [
      "Up to 3 clients",
      "10 attentions per month",
      "Basic dashboard",
      "Email support",
    ],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹499",
    description: "For serious freelancers",
    features: [
      "Unlimited clients",
      "Unlimited attentions",
      "Priority & due tracking",
      "Advanced search",
      "Email reminders",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Studio",
    price: "₹999",
    description: "For teams & studios",
    features: [
      "Everything in Pro",
      "Multiple team members",
      "Client analytics",
      "Export reports",
      "Priority support",
    ],
    cta: "Upgrade to Studio",
    highlighted: false,
  },
]

export default function UpgradePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Upgrade your plan</h1>
        <p className="text-muted-foreground">
          Simple pricing. No hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.highlighted
                ? "border-primary shadow-md"
                : "border-muted"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </span>
            )}

            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </div>

              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                disabled={plan.cta === "Current Plan"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
