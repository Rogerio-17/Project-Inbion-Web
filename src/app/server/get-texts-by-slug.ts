import "server-only";

export const socialMedias = ["instagram", "tiktok", "youtube", "twitter", "linkedin", "facebook"];

export async function getTextBySlug(slug: string) {
    for (const socialMedia of socialMedias) {
        const medialSlug = `link-na-bio-para-${socialMedia}`;
        if (slug === medialSlug) {
            const capitalizedSocialMedia = socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1);

            return {
                title: `Link na bio para ${capitalizedSocialMedia}`,
                description: `Compartilhe todos os seus links no perfil do seu ${socialMedia}.`,
            };
        }
    }

    return undefined
}