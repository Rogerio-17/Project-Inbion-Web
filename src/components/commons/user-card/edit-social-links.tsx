"use client"

import { createSocialLinks } from "@/app/actions/create-social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal"
import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react"

export function EditSocialLinks() {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false)
    const [github, setGithub] = useState("")
    const [instagram, setInstagram] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [twitter, setTwitter] = useState("")
    const { profileId } = useParams()

    function handleOpenModal() {
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    async function handleAddSocialLinks() {
        setIsSavingSocialLinks(true)

        if (!profileId) return

        await createSocialLinks({
            profileId: profileId as string,
            github,
            instagram,
            linkedin,
            twitter,
        })


        startTransition(() => {
            setIsModalOpen(false);
            setIsSavingSocialLinks(false);
            router.refresh();
        });
    }

    return (
        <>
            <button
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
                onClick={handleOpenModal}
            >
                <Plus />
            </button>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
                    <p className="text-white font-bold text-xl">
                        Adicionar redes sociais
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 w-full">
                            <Github />
                            <Input
                                type="text"
                                placeholder="Link Github"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Linkedin />
                            <Input
                                type="text"
                                placeholder="Link LinkedIn"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Instagram />
                            <Input
                                type="text"
                                placeholder="Link Instagram"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Twitter />
                            <Input
                                type="text"
                                placeholder="Link Twitter"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button
                            onClick={handleCloseModal}
                            className="font-bold text-white"
                        >
                            Voltar
                        </button>
                        <Button
                            onClick={handleAddSocialLinks}
                            disabled={isSavingSocialLinks}
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}