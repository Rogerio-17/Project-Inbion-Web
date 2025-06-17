import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { trackServerEvent } from "@/lib/mixpanel";
import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { metadata, isSubscription } = await request.json();

    const price = isSubscription ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID : process.env.STRIPE_PRICE_ID;

    const userSession = await auth()

    if (!userSession || !userSession.user?.id || !userSession.user?.email) {
        return NextResponse.json(
            {
                error: "User not authenticated",
            },
            { status: 401 }
        )
    }

    const userId = userSession.user?.id;
    const userEmail = userSession.user?.email;
    const userName = userSession.user?.name;

    const userRef = await db.collection("users").doc(userId)
    const userDoc = await userRef.get();

    let customerId

    if (userDoc.exists) {
        customerId = userDoc.data()?.customerId
    }

    if (!customerId) {
        const newCustomer = await stripe.customers.create({
            email: userEmail,
            name: userName || "Sem Nome",
            metadata: {
                userId: userId,
            },
        })

        const customerId = newCustomer.id

        await userRef.set({
            customerId,
        })
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
            {
                price: price,
                quantity: 1,
            },
        ],
        mode: isSubscription ? "subscription" : "payment",
        payment_method_types: isSubscription ? ["card"] : ["card", "boleto"],
        success_url: `${request.headers.get("origin")}/${metadata.profileId}`,
        cancel_url: `${request.headers.get("origin")}/${metadata.profileId}/upgrade`,
        client_reference_id: userId,
        metadata,
    })

    trackServerEvent("page_view", {
        page: "create_checkout",
        price,
        isSubscription,
    })

    return NextResponse.json({
        sessionId: session.id,
    })
}