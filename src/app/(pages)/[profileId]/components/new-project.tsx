"use client"

import { createProject } from "@/app/actions/create-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { TextArea } from "@/components/ui/text-area";
import { compressFiles, handleImageInput, triggerImageInput } from "@/lib/utils";
import { ArrowUpFromLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export function NewProject({ profileId }: { profileId: string }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [projectUrl, setProjectUrl] = useState("")
    const [projectImage, setProjectImage] = useState<string | null>(null)
    const [isCreatingProject, setIsCreatingProject] = useState(false)

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false)
    }

    async function handleCreateProject() {
        setIsCreatingProject(true)

        const imagesInput = document.getElementById("imageInput") as HTMLInputElement

        if (!imagesInput.files) return

        const compressedFile = await compressFiles(Array.from(imagesInput.files))

        const formData = new FormData()

        formData.append("file", compressedFile[0])
        formData.append("profileId", profileId)
        formData.append("projectName", projectName)
        formData.append("projectDescription", projectDescription)
        formData.append("projectUrl", projectUrl)

        await createProject(formData)

        startTransition(() => {
            setIsOpen(false)
            setIsCreatingProject(false)
            setProjectName("")
            setProjectDescription("")
            setProjectUrl("")
            setProjectImage("")
            setProjectImage(null)
            router.refresh()
        })

        router.refresh()
    }

    return (
        <>
            <button
                className="w-[340px] flex items-center justify-center gap-5 bg-background-secondary p-3 rounded-lg border border-transparent hoover:border-border-secondary"
                onClick={handleOpenModal}
            >
                <Plus className="size-10 text-accent-green" />
                <span>Novo projeto</span>
            </button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
                    <p className="text-white font-bold text-xl">Novo projeto</p>
                    <div className="flex gap-10">
                        <div className="flex flex-col items-center gap-3 text-xs">
                            <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                                {
                                    projectImage ? (
                                        <img
                                            src={projectImage}
                                            alt="Project Image"
                                            className="object-cover object-center"
                                        />
                                    ) : (
                                        <button
                                            className="w-full h-full"
                                            onClick={() => triggerImageInput("imageInput")}
                                        >
                                            100x100
                                        </button>
                                    )
                                }
                            </div>

                            <button
                                className="text-white flex items-center gap-2"
                                onClick={() => triggerImageInput("imageInput")}
                            >
                                <ArrowUpFromLine className="size-4" />
                                <span>Adicionar imagem</span>
                            </button>

                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setProjectImage(handleImageInput(e))}
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-[293px]">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="project-name" className="text-white font-bold">
                                    Título do projeto
                                </label>
                                <Input
                                    id="project-name"
                                    placeholder="Digite o nome do projeto"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="project-description" className="text-white font-bold">
                                    Descrição
                                </label>
                                <TextArea
                                    id="project-description"
                                    placeholder="Dê uma breve descrição do seu projeto"
                                    className="h-36"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="project-description" className="text-white font-bold">
                                    URL do projeto
                                </label>
                                <Input
                                    id="project-name"
                                    placeholder="Digite a URL do projeto"
                                    value={projectUrl}
                                    onChange={(e) => setProjectUrl(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button onClick={handleCloseModal} className="font-bold text-white">
                            Voltar
                        </button>
                        <Button
                            onClick={handleCreateProject}
                            disabled={isCreatingProject}
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}