"use client"
import { useStripe } from "@/app/hooks/useStripe"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

export function PlanButtons() {
    const { createStripeCheckout } = useStripe()
    const { profileId } = useParams()

    return (
        <div className="flex gap-4">
            <Button
                onClick={() => createStripeCheckout({
                    metadata: {
                        profileId,
                    },
                    isSubscription: true,
                })}
            >
                R$ 9,99 / mês
            </Button>
            <Button
                onClick={() => createStripeCheckout({
                    metadata: {
                        profileId,
                    },
                    isSubscription: false,
                })}
            >
                R$ 99,90 Vitalício
            </Button>
        </div>
    )
}