"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { useParams } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCoverImage } from "@/hooks/use-cover-image"
import { SingleImageDropzone } from "../single-image-dropzone"
import { useEdgeStore } from "@/lib/edgestore"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

function parseDocumentId(value?: string): Id<"documents"> | null {
  if (!value) return null
  const id = decodeURIComponent(value).split("-")[0]
  return /^[a-z0-9]{32}$/.test(id) ? (id as Id<"documents">) : null
}

export const CoverImageModal = () => {
  const params = useParams<{ documentId?: string }>()
  const update = useMutation(api.documents.update)
  const coverImage = useCoverImage()
  const { edgestore } = useEdgeStore()

  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const documentId = parseDocumentId(params.documentId)

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    coverImage.onClose()
  }

  const onChange = async (file?: File) => {
    if (!file || !documentId) return

    try {
      setIsSubmitting(true)
      setFile(file)

      const res = await edgestore.publicFiles.upload({
        file,
        options: coverImage.url
          ? { replaceTargetUrl: coverImage.url }
          : undefined,
      })

      await update({
        id: documentId,
        coverImage: res.url,
      })

      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Cover Image
          </DialogTitle>
        </DialogHeader>

        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}
