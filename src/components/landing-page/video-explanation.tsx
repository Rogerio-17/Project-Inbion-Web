import { Play } from "lucide-react";

export function VideoExplanation() {
    return (
        <div className="border rounded-2xl border-border-primary aspect-video flex items-center justify-center my-20">
            <div className="border-accent-purple border rounded-full p-2">
                <Play className="text-accent-purple size-14" />
            </div>
        </div>
    )
}