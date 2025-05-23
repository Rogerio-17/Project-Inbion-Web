import ProjectCard from "../commons/project-card";
import { TotalVisits } from "../commons/total-visits";
import { UserCard } from "../commons/user-card/user-card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Hero() {
    return (
        <div className="flex h-screen">
            <div className="w-full flex flex-col gap-2 mt-[35vh]">
                <h1 className="text-5xl font-bold text-white leading-[64px]">
                    Seus projetos e redes sociais em um unico link
                </h1>

                <h2 className="text-xl leading-6">
                    Crie sua própria página de projetos e compartilhe eles com o mundo.
                    <br />
                    Acompanhe o engajamento com Analytics de cliques
                </h2>

                <div className="flex items-center gap-2 w-full mt-[10vh]">
                    <span className="text-white text-xl">Projectinbion.com</span>
                    <Input type="text" placeholder="Seu link" />
                    <Button>Criar agora</Button>
                </div>
            </div>

            <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
                <div className="relative">
                    <UserCard

                        imageUrlDefault="/user_default.png"
                    />
                    <div className="absolute -bottom-[7%] -right-[15%]">
                        <TotalVisits totalVisitsFake={1125} />
                    </div>
                    <div className="absolute top-[20%] -left-[45%] -z-10">
                        <ProjectCard
                            name="Coda AI"
                            description="Pojeto para desenvolvedores que buscam trabalhos!"
                            imgUrl="/project1.jpg"
                        />
                    </div>

                    <div className="absolute -top-[5%] -left-[55%] -z-10">
                        <ProjectCard
                            name="Projeto contruindo sonhos"
                            description="Projeto focado em arrecadar fundos para contrução de moradias!"
                            imgUrl="/project2.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}