import { db } from "@/lib/firebase"
import "server-only"
import { Link } from "../actions/add-custom-links";

export interface socialMedias {
    github: string;
    instagram: string;
    linkedin: string;
    twitter: string;
}

export type ProfileData = {
    userId: string;
    name?: string;
    description?: string;
    imagePath?: string;
    userEmail: string;
    totalVisits: number;
    socialMedias?: socialMedias
    link1?: Link,
    link2?: Link,
    link3?: Link,
    updatedAt?: number
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
    totalClicks?: number
}

export async function GetProfileData(profileId: string) {
    const snapshot = await db.collection("profiles").doc(profileId).get()

    return snapshot.data() as ProfileData
}

export async function getProfileProjects(profileId: string) {
    const snapshot = await db.collection("profiles").doc(profileId).collection("projects").get()

    return snapshot.docs.map((docs) => docs.data()) as ProjectData[]
}

export async function getProfileId(userId: string) {
    if (!userId) return null

    const snapshot = await db.collection("profiles").where("userId", "==", userId).get()

    return snapshot.docs.map((doc) => doc.id)[0]
}