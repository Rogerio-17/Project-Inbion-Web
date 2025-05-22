"use client"

import { increaseProjectClick } from "@/app/actions/increase-profile-visits"
import { ProjectData } from "@/app/server/get-profile-data"
import { formatUrl } from "@/lib/utils"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ProjectCardProps {
    project?: ProjectData
    isOwner?: boolean
    imgUrl: string
    name?: string
    description?: string
}

export default async function ProjectCard({ project, isOwner, imgUrl, name, description }: ProjectCardProps) {
    const { profileId } = useParams()
    const projectUrl = project ? project.projectUrl : ""
    const formattedUrl = formatUrl(projectUrl)

    async function handleClick() {
        if (!profileId || !project?.id || isOwner) return

        await increaseProjectClick(profileId as string, project?.id)
    }

    return (
        <Link href={formattedUrl} onClick={handleClick} target="_blank">
            <div className="w-[340px] flex gap-5 bg-background-secondary p-3 rounded-lg border border-transparent hoover:border-border-secondary">
                <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
                    <img
                        src={imgUrl}
                        alt="Projeto"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {
                        isOwner && (
                            <span className="uppercase text-sx font-bold text-accent-green">
                                {project?.totalClicks || 0} Cliques
                            </span>
                        )
                    }
                    <div className="flex flex-col">
                        <span className="text-white font-bold">{name || project?.projectName}</span>
                        <span className="text-content-body text-sm">{description || project?.projectDescription}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}