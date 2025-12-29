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
import { useEdgeStore } from "@/lib/edgestore"

interface CoverImageProps {
  url?: string
  preview?: boolean
}

function parseDocumentId(value?: string): Id<"documents"> | null {
  if (!value) return null
  const id = decodeURIComponent(value).split("-")[0]
  return /^[a-z0-9]{32}$/.test(id) ? (id as Id<"documents">) : null
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore()
  const params = useParams<{ documentId?: string }>()
  const coverImage = useCoverImage()
  const removeCoverImage = useMutation(api.documents.removeCoverImage)

  const documentId = parseDocumentId(params.documentId)

  const onRemove = async () => {
    if (url) {
      try {
        await edgestore.publicFiles.delete({ url })
      } catch {}
    }

    if (!documentId) return
    await removeCoverImage({ id: documentId })
  }

  return (
    <div className="relative w-full">
      {url && (
        <div className="relative w-full h-[40vh] max-h-[320px] bg-muted group">
          <Image
            src={url}
            fill
            alt="Cover"
            priority
            className="object-cover object-top"
          />

          {!preview && (
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex gap-x-2">
              <Button
                onClick={() => coverImage.onReplace(url)}
                variant="outline"
                size="sm"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Change cover
              </Button>

              <Button
                onClick={onRemove}
                variant="outline"
                size="sm"
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          )}
        </div>
      )}

      {!preview && !url && (
        <div className="flex gap-x-2 mt-4">
          <Button onClick={coverImage.onOpen} variant="outline" size="sm">
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        </div>
      )}
    </div>
  )
}
