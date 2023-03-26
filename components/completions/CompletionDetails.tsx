import DetailsPage from "components/DetailsPage";
import React from "react";
import useSWRImmutable from "swr/immutable";
import type { OpenAI } from "types/openai";
import FineTuneMetadata from "../fine-tunes/FineTuneMetadata";
import FineTuneResultsCard from "../fine-tunes/FineTuneResultsCard";
import CompletionForm from "./CompletionForm";

export default function CompletionDetails({ id }: { id: string }) {
  const { data: fineTune, error } = useSWRImmutable<OpenAI.FineTune>(
    `fine-tunes/${id}`
  );

  return (
    <DetailsPage name="fine-tune" id={id} error={error}>
      {fineTune && (
        <>
          <CompletionForm fineTune={fineTune} />
          <FineTuneMetadata fineTune={fineTune} />
          <FineTuneResultsCard fineTune={fineTune} />
        </>
      )}
    </DetailsPage>
  );
}
