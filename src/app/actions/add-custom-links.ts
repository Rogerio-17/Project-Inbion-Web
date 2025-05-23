"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/firebase"

export interface Link {
    title: string
    url: string
}

export default async function AddCustomLinks({
    profileId,
    link1,
    link2,
    link3
}: {
    profileId: string
    link1: Link
    link2: Link
    link3: Link
}) {
    try {
        const session = auth()

        if (!session) {
            return
        }

        await db.collection("profiles").doc(profileId).update({
            link1,
            link2,
            link3
        })

    } catch (error) {

    }
}