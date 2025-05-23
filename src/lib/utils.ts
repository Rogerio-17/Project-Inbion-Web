import imageCompression from 'browser-image-compression';
import { ClassValue, clsx } from 'clsx'
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function sanitizeLink(link?: string) {
    if (!link) return "";

    return link
        .replace(/\s/g, "")
        .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, "")
        .toLocaleLowerCase();
}

export async function compressFiles(files: File[]) {
    const compressPromises = files.map(async (file) => {
        try {
            return await compressImage(file)
        } catch (error) {
            console.log(error)
            return null
        }
    })

    return (await Promise.all(compressPromises)).filter((file) => file !== null)
}

export const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const options = {
            maxSizeMB: 0.2, // 200KB
            maxwidthOrHeight: 900,
            useWebWorker: true,
            fileType: "image/png"
        }

        imageCompression(file, options).then((compressedFile) => {
            resolve(compressedFile)
        })
    })
}

export function formatUrl(url: string) {
    const formatterUrl = url.startsWith("http") ? url : `https://${url}`
    return formatterUrl
}

export function triggerImageInput(id: string) {
    document.getElementById(id)?.click()
}

export function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null

    if (file) {
        const imageUrl = URL.createObjectURL(file)
        return imageUrl
    }

    return null
}