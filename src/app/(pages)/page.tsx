import { FAQ } from "@/components/landing-page/faq";
import { Header } from "@/components/landing-page/header";
import { Hero } from "@/components/landing-page/hero";
import { Pricing } from "@/components/landing-page/princing";
import { VideoExplanation } from "@/components/landing-page/video-explanation";
import { trackServerEvent } from "@/lib/mixpanel";

export const metadata = {
  title: "ProjectInbion",
  description: "Crie links personalizados e gratuitos para compartilhar suas redes sociais, portfólio e muito mais. Experimente agora!",
}

export default function Home() {
  trackServerEvent("page_view", {
    page: "home"
  })

  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
