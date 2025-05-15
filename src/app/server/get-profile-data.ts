import { db } from "@/lib/firebase"
import "server-only"

export type ProfileData = {
    userId: string;
    userEmail: string;
    totalVisits: number;
    createdAt: number;
}

export type ProjectData = {
    id: string
    userId: string
    projectName: string
    projectDescription: string
    projectUrl: string
    imagePath: string
    createdAt: number
    totalVisits?: number
}

export async function GetProfileData(profileId: string) {
    const snapshot = await db.collection("profiles").doc(profileId).get()

    return snapshot.data() as ProfileData
}

export async function getProfileProjects(profileId: string) {
    const snapshot = await db.collection("profiles").doc(profileId).collection("projects").get()

    return snapshot.docs.map((docs) => docs.data()) as ProjectData[]
}