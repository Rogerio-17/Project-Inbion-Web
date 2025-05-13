"use client"
import { createLink } from "@/app/actions/create-link";
import { verifyLink } from "@/app/actions/verify-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sanitizeLink } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export function CreateLinkForm() {
    const router = useRouter()
    const [link, setLink] = useState("")
    const [error, setError] = useState("")

    function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
        setLink(sanitizeLink(e.target.value))
        setError('')
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (link.length === 0) {
            setError("Campo de link é obrigatório")
            return
        }

        const isLinkTaken = await verifyLink(link)

        if (isLinkTaken) {
            setError("Link escolhido já foi cadastrado :(")
            return
        }

        const isLinkCreated = await createLink(link)

        if (!isLinkCreated) {
            setError("Erro ao criar link! Tente novamente.")
            return
        }

        router.push(`/${link}`)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
            >
                <span className="text-white">projectinbio.com/</span>
                <Input
                    value={link}
                    onChange={handleLinkChange}
                />
                <Button className="w-[126px]">Criar</Button>
            </form>

            {
                error && (
                    <div>
                        <span className="text-accent-pink">{error}</span>
                    </div>
                )
            }
        </>
    )
}