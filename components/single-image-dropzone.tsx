"use client"

import * as React from "react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"
import { UploadCloudIcon, X } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"
import { Spinner } from "./spinner"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type SingleImageDropzoneProps = {
  className?: string
  disabled?: boolean
  value?: File
  onChange?: (file?: File) => void
  dropzoneOptions?: DropzoneOptions
}

export function SingleImageDropzone({
  className,
  disabled = false,
  value,
  onChange,
  dropzoneOptions,
}: SingleImageDropzoneProps) {
  const preview = React.useMemo(
    () => (value ? URL.createObjectURL(value) : null),
    [value]
  )

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file || disabled) return
      onChange?.(file)
    },
    [onChange, disabled]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    disabled,
    onDrop,
    ...dropzoneOptions,
  })

  const clear = () => {
    onChange?.(undefined)
  }

  return (
    <div className="relative">
      {disabled && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
          <Spinner size="lg" />
        </div>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-lg border border-dashed text-sm transition",
          isDragActive && "border-primary bg-primary/5",
          disabled && "pointer-events-none opacity-50",
          className
        )}
      >
        <input {...getInputProps()} />

        {!preview ? (
          <div className="flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
            <UploadCloudIcon className="h-6 w-6" />
            <span>Click or drag file to this area to upload</span>
          </div>
        ) : (
          <div className="relative h-40 w-full">
            <img
              src={preview}
              alt="Selected image"
              className="h-full w-full rounded-lg object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={clear}
                className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
