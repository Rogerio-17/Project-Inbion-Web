import { GetProfileData, getProfileProjects } from "@/app/server/get-profile-data"
import ProjectCard from "@/components/commons/project-card"
import { TotalVisits } from "@/components/commons/total-visits"
import { UserCard } from "@/components/commons/user-card/user-card"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { notFound } from "next/navigation"
import { NewProject } from "./components/new-project"
import { getDownloadURLFromPath } from "@/lib/firebase"
import { increaseProfileVisits } from "@/app/actions/increase-project-clicks"

interface ProfilePageProps {
    params: Promise<{
        profileId: string
    }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
    const { profileId } = await params
    const session = await auth()

    const profileData = await GetProfileData(profileId)

    if (!profileData) {
        return notFound()
    }

    const projects = await getProfileProjects(profileId)

    const isOwner = profileData.userId === session?.user?.id

    if (!isOwner && environment !== "development") {
        await increaseProfileVisits(profileId)
    }

    return (
        <div className="relative h-screen flex p-20 overflow-hidden">
            <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
                <span>Você está usando a versão trial.</span>
                <Link href={`/${profileId}/upgrade`} className="cursor-pointer">
                    <button className="text-accent-green font-bold">Faça o upgrade agora!</button>
                </Link>
            </div>
            <div className="w-1/2 justify-center h-min">
                <UserCard profileData={profileData} isOwner={isOwner} imageUrlDefault="/avatar_default.png" />
            </div>

            <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
                {
                    projects.map(async (project) => {
                        const imgUrl = await getDownloadURLFromPath(project.imagePath)

                        return (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isOwner={isOwner}
                                imgUrl={imgUrl ?? ""}
                            />
                        )

                    })
                }
                {
                    isOwner && (
                        <NewProject profileId={profileId} />
                    )
                }
            </div>

            {
                isOwner && (
                    <div className="absolute bottom-2 right-0 left-0 w-min mx-auto">
                        <TotalVisits totalVisits={profileData.totalVisits} />
                    </div>
                )
            }
        </div>
    )
}