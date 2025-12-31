"use client";

import type { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: PartialBlock[];
  editable?: boolean;
}

const Editor = ({
  onChange,
  initialContent,
  editable = true,
}: EditorProps) => {
  const { edgestore } = useEdgeStore();
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent,
    uploadFile: async (file: File) => {
      const response = await edgestore.publicFiles.upload({ file });
      return response.url;
    },
  });

  return (
    <div className="mt-6">
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        className="notion-editor"
        onChange={() => {
          onChange(JSON.stringify(editor.document));
        }}
      />
    </div>
  );
};

export default Editor;