"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function CreateNow() {
    const [link, setLink] = useState("")

    function handleSignInAndRedirect() {
        // Remover caracteres especiais
        const formatLink = link.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, "").toLowerCase()

        signIn("google", {
            redirectTo: `/criar?link=${formatLink}`,
        })
    }

    return (
        <div className="flex items-center gap-2 w-full mt-[10vh]">
            <span className="text-white text-xl">Projectinbion.com/</span>
            <Input
                type="text"
                placeholder="Seu link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <Button onClick={handleSignInAndRedirect}>Criar agora</Button>
        </div>
    )
}