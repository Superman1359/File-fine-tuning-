import { Loading } from "@nextui-org/react";
import DetailsPage from "components/DetailsPage";
import FileMetadata from "components/files/FileMetadata";
import React from "react";
import useSWRImmutable from "swr/immutable";
import type { OpenAI } from "types/openai";
import ClassificationForm from "./ClassificationForm";

export default function ClassificationDetail({ id }: { id: string }) {
  const { data: file, error } = useSWRImmutable<OpenAI.File>(`files/${id}`);

  return (
    <DetailsPage name="classifications" id={id} error={error}>
      <ClassificationForm id={id} />
      {file ? <FileMetadata file={file} /> : <Loading />}
    </DetailsPage>
  );
}
