import { MetadataCard } from "components/MetadataCard";
import filesize from "filesize";
import React from "react";
import { OpenAI } from "types/openai";

export default function FileMetadata({ file }: { file: OpenAI.File }) {
  return (
    <MetadataCard
      fields={[
        { label: "ID", value: file.id, clickToCopy: true },
        { label: "Filename", value: file.filename },
        { label: "Size", value: filesize(file.bytes) },
        { label: "Uploaded", value: new Date(file.created_at * 1000) },
      ]}
    />
  );
}
