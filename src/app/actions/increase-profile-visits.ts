"use server"

import { db } from "@/lib/firebase"
import { FieldValue } from "firebase-admin/firestore"

export async function increaseProjectClick(profileId: string, projectId: string) {
    const projectRef = db
        .collection("profiles")
        .doc(profileId)
        .collection("projects")
        .doc(projectId)

    await db.runTransaction(async (transaction) => {
        const project = await transaction.get(projectRef)

        if (!project.exists) return

        transaction.update(projectRef, {
            totalClicks: FieldValue.increment(1)
        })
    })
}