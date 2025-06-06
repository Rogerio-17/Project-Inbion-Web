"use client"

import { saveProfile } from "@/app/actions/save-profile"
import { ProfileData } from "@/app/server/get-profile-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { TextArea } from "@/components/ui/text-area"
import { compressFiles, handleImageInput } from "@/lib/utils"
import { ArrowUpFromLine, UserPen } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { startTransition, useState } from "react"

interface EditUserCardProps {
    profileData?: ProfileData
}

export function EditUserCard({ profileData }: EditUserCardProps) {
    const router = useRouter()
    const { profileId } = useParams()
    const [isSavingProfile, setIsSavingProfile] = useState(false)
    const [isModalOpen, setIsOpenModal] = useState(false)

    const [profilePic, setProfilePic] = useState<string | null>(null)
    const [yourName, setYouName] = useState(profileData?.name || "")
    const [yourDescription, setYourDescription] = useState(profileData?.description || "")

    function handleOpenModal() {
        setIsOpenModal(true)
    }

    function handleCloseModal() {
        setIsOpenModal(false)
    }

    function triggerImageInput(id: string) {
        document.getElementById(id)?.click()
    }

    async function handleSaveProfile() {
        setIsSavingProfile(true)

        if (!profileId) {
            return
        }

        const imagesInput = document.getElementById("profile-pic-input") as HTMLInputElement

        if (!imagesInput.files) return

        const compressedFile = await compressFiles(Array.from(imagesInput.files))
        const formData = new FormData()

        formData.append("profileId", profileId as string)
        formData.append("profilePic", compressedFile[0])
        formData.append("yourName", yourName)
        formData.append("yourDescription", yourDescription)

        await saveProfile(formData)

        startTransition(() => {
            setIsOpenModal(false)
            setIsSavingProfile(false)
            router.refresh()
        })

    }

    return (
        <>
            <button onClick={handleOpenModal}>
                <UserPen />
            </button>

            <Modal isOpen={isModalOpen} setIsOpen={setIsOpenModal}>
                <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
                    <p className="text-white font-bold text-xl">
                        Editar perfil
                    </p>
                    <div className="flex gap-10">
                        <div className="flex flex-col items-center gap-3 text-xs">
                            <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                                {
                                    profilePic ? (
                                        <img
                                            src={profilePic}
                                            alt="Profile picture"
                                            className="object-cover object-center"
                                        />
                                    ) : (
                                        <button
                                            onClick={() => triggerImageInput("profile-pic-input")}
                                            className="w-full h-full"
                                        >
                                            100x100
                                        </button>
                                    )
                                }
                            </div>
                            <button
                                className="text-white flex items-center gap-2"
                                onClick={() => triggerImageInput("profile-pic-input")}
                            >
                                <ArrowUpFromLine className="size-4" />
                                <span>Adicionar imagem</span>
                            </button>

                            <input
                                id="profile-pic-input"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => setProfilePic(handleImageInput(e))}
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-[293px]">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="your-name"
                                    className="text-white font-bold"
                                >
                                    Seu nome
                                </label>
                                <Input
                                    id="your-name"
                                    placeholder="Digite seu nome"
                                    value={yourName}
                                    onChange={(e) => setYouName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="your-description"
                                    className="text-white font-bold"
                                >
                                    Descrição
                                </label>
                                <TextArea
                                    id="your-description"
                                    placeholder="Fale um pouco sobre você"
                                    className="h-36"
                                    value={yourDescription}
                                    onChange={(e) => setYourDescription(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={handleCloseModal}
                                    className="font-bold text-white"
                                >
                                    Voltar
                                </button>
                                <Button
                                    onClick={handleSaveProfile}
                                    disabled={isSavingProfile}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}