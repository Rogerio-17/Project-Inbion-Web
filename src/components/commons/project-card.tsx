"use client"

import { ProjectData } from "@/app/server/get-profile-data"
import { formatUrl } from "@/lib/utils"
import Link from "next/link"

interface ProjectCardProps {
    project: ProjectData
    isOwner: boolean
    imgUrl: string
}

export default function ProjectCard({ project, isOwner, imgUrl }: ProjectCardProps) {
    const projectUrl = project ? project.projectUrl : ""
    const formattedUrl = formatUrl(projectUrl)

    function handleClick() {
        console.log('clicou')
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
                                {project.totalVisits || 0} Cliques
                            </span>
                        )
                    }
                    <div className="flex flex-col">
                        <span className="text-white font-bold">{project.projectName}</span>
                        <span className="text-content-body text-sm">{project.projectDescription}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}