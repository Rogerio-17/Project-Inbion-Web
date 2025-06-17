import { Header } from "@/components/landing-page/header";
import { Rocket } from "lucide-react";
import { CreateLinkForm } from "./components/create-link-form";
import { trackServerEvent } from "@/lib/mixpanel";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
    appName: "ProjectInbion",
    appDescription: "Crie links personalizados e gerencie seu perfil online.",
    keywords: ["links personalizados", "perfil online", "ProjectInbion"],
    appDomain: "https://project-inbion-web.vercel.app",
    canonicalUrlRelative: "/",
})

export default function CriarPage() {
    trackServerEvent("page_view", {
        page: "create_link"
    });

    return (
        <div>
            <Header />
            <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
                    <Rocket className="size-10" />
                </div>

                <CreateLinkForm />
            </div>
        </div>
    )
}