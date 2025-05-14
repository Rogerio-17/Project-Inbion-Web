import { db } from "@/lib/firebase"
import "server-only"

export type ProfileData = {
    userId: string;
    userEmail: string;
    totalVisits: number;
    createdAt: number;
}

export async function GetProfileData(profileId: string) {
    const snapshot = await db.collection("profiles").doc(profileId).get()

    return snapshot.data() as ProfileData
}