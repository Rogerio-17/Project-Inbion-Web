export default function ProjectCard() {
    return (
        <div className="w-[430px] flex gap-5 bg-background-secondary p-3 rounded-lg border border-transparent hoover:border-border-secondary">
            <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
                <img
                    src="/project1.jpg"
                    alt="Projeto"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className="uppercase text-sx font-bold text-accent-green">
                    10 Cliques
                </span>
                <div className="flex flex-col">
                    <span className="text-white font-bold">Projeto 1</span>
                    <span className="text-content-body text-sm">Descrição super detalahda sobre o prjeto.</span>
                </div>
            </div>
        </div>
    )
}