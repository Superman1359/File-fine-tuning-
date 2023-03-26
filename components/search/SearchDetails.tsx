import DetailsPage from "components/DetailsPage";
import FileMetadata from "components/files/FileMetadata";
import Loading from "components/Loading";
import React from "react";
import useSWRImmutable from "swr/immutable";
import type { OpenAI } from "types/openai";
import SearchForm from "./SearchForm";

export default function SearchDetails({ id }: { id: string }) {
  const { data: file, error } = useSWRImmutable<OpenAI.File>(`files/${id}`);

  return (
    <DetailsPage name="search" id={id} error={error}>
      <SearchForm id={id} />
      {file ? <FileMetadata file={file} /> : <Loading />}
    </DetailsPage>
  );
}
