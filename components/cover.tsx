    "use client"

    import Image from "next/image"
    import { ImageIcon, X } from "lucide-react"
    import { useMutation } from "convex/react"
    import { useParams } from "next/navigation"

    import { cn } from "@/lib/utils"
    import { Button } from "@/components/ui/button"
    import { useCoverImage } from "@/hooks/use-cover-image"
    import { api } from "@/convex/_generated/api"
    import { Id } from "@/convex/_generated/dataModel"

    interface CoverImageProps {
    url?: string
    preview?: boolean
    }

    function parseDocumentId(value?: string): Id<"documents"> | null {
    if (!value) return null
    try {
        return decodeURIComponent(value).split("-")[0] as Id<"documents">
    } catch {
        return null
    }
    }

    export const Cover = ({ url, preview }: CoverImageProps) => {
    const params = useParams<{ documentId?: string }>()
    const coverImage = useCoverImage()
    const removeCoverImage = useMutation(api.documents.removeCoverImage)

    const documentId = parseDocumentId(params.documentId)

    const onRemove = async () => {
        if (!documentId) return
        await removeCoverImage({ id: documentId })
    }

    return (
        <div
        className={cn(
            "relative w-full group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}
        >
        {!!url && (
            <div className="relative w-full aspect-[16/9]">
            <Image
                src={url}
                fill
                alt="Cover"
                className="object-contain"
                priority
            />
            </div>
        )}

        {url && !preview && (
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
            <Button
                onClick={coverImage.onOpen}
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
            >
                <ImageIcon className="h-4 w-4 mr-2" />
                Change cover
            </Button>

            <Button
                onClick={onRemove}
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
            >
                <X className="h-4 w-4 mr-2" />
                Remove
            </Button>
            </div>
        )}
        </div>
    )
    }
