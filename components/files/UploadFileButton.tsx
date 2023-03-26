import { faFileUpload } from "@fortawesome/free-solid-svg-icons/faFileUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { OpenAI } from "types/openai";
import useUploadFile, { Enforce, MimeTypes } from "./useUploadFile";

export default function UploadFileButton({
  enforce,
  purpose,
}: {
  enforce: Enforce;
  purpose: OpenAI.Purpose;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, uploadFile } = useUploadFile(purpose, enforce);

  useOnDrop(uploadFile);

  async function onChange() {
    if (!inputRef.current) return;
    const file = inputRef.current.files?.[0];
    if (file) await uploadFile(file);
    inputRef.current.value = "";
  }

  return (
    <span>
      <input
        accept={MimeTypes.join()}
        onChange={onChange}
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
      />
      <Button
        auto
        flat
        icon={<FontAwesomeIcon icon={faFileUpload} />}
        loading={isLoading}
        onClick={() => inputRef.current?.click()}
        size="small"
      >
        Upload File
      </Button>
    </span>
  );
}

function useOnDrop(uploadFile: (file: File) => void) {
  useEffect(function () {
    function onDragOver(event: DragEvent) {
      event.preventDefault();
    }
    document.addEventListener("dragover", onDragOver);
    return () => document.removeEventListener("dragover", onDragOver);
  }, []);

  useEffect(
    function () {
      function onDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files) for (const file of files) uploadFile(file);
      }

      document.addEventListener("drop", onDrop);
      return () => document.removeEventListener("drop", onDrop);
    },
    [uploadFile]
  );
}
