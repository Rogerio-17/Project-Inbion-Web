import { manageAuth } from "@/app/actions/manage-auth";
import { auth } from "@/lib/auth";
import { TrendingUp } from "lucide-react";
import { PortalButton } from "./portal-button";

interface TotalVisitsProps {
    totalVisits?: number
    totalVisitsFake?: number
    showBar?: boolean
}

export async function TotalVisits({ totalVisits = 0, totalVisitsFake, showBar = false }: TotalVisitsProps) {
    const session = await auth()

    return (
        <div
            className="w-min whitespace-nowrap flex items-center gap-5 bg-background-secondary border border-border-primary px-8 py-3 rounded-xl shadow-lg"
        >
            <span className="font-bold text-white">
                Total de visitas
            </span>
            <div className="flex items-center gap-2 text-accent-green">
                <span className="text-3xl font-bold">
                    {totalVisitsFake || totalVisits}
                </span>
                <TrendingUp />
            </div>

            <div className="flex item-center gap-2">
                {
                    showBar && (
                        <>
                            {
                                session?.user?.isSubscribed && (
                                    <PortalButton />
                                )
                            }
                            <form action={manageAuth}>
                                <button>Sair</button>
                            </form>
                        </>
                    )
                }
            </div>
        </div>
    )
}