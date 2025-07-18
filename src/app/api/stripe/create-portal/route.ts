import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userRef = await db.collection("users").doc(userId).get()
    const customerId = userRef.data()?.customerId

    if (!customerId) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${request.headers.get("origin")}`,
        })

        return NextResponse.json({ url: portalSession.url })
    } catch (error) {
        console.error("Error creating Stripe portal:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}