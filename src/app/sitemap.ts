import { MetadataRoute } from "next";
import { socialMedias } from "./server/get-texts-by-slug";

export default function Sitemap(): MetadataRoute.Sitemap {
    const socialMediaEntries: MetadataRoute.Sitemap = socialMedias.map((media) => ({
        url: `https://project-inbion-web.vercel.app/recursos/link-na-bio-para-${media}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.5,
    }))

    const statticEntries: MetadataRoute.Sitemap = [
        {
            url: "https://project-inbion-web.vercel.app",
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 1.0,
        },
    ]

    return [
        ...statticEntries,
        ...socialMediaEntries,
    ];
}