import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Textarea } from "@nextui-org/react";
import useAuthentication from "components/account/useAuthentication";
import Label from "components/forms/Label";
import SelectEngine from "components/forms/SelectEngine";
import InfoCard from "components/InfoCard";
import ShowRequestExample from "components/ShowRequestExample";
import useAnalytics from "components/useAnalytics";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { OpenAI } from "types/openai";

export default function ClassificationForm({ id }: { id: string }) {
  const form = useForm({
    defaultValues: {
      model: "davinci",
      query: "",
      search_model: "",
      temperature: 0.9,
    },
  });
  const { headers } = useAuthentication();
  const [results, setResults] = useState<OpenAI.Classifications.Response[]>([]);
  const { sendEvent } = useAnalytics();

  form.watch();

  const request = {
    url: "https://api.openai.com/v1/classifications",
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: {
      file: id,
      model: form.getValues().model,
      query: form.getValues().query,
      search_model: form.getValues().search_model || undefined,
      temperature: +form.getValues().temperature,
    },
  };

  async function onSubmit() {
    const { url, body, ...init } = request;
    const response = await fetch(url, { ...init, body: JSON.stringify(body) });
    if (response.ok) {
      const json = await response.json();
      setResults([json, ...results]);
    } else {
      const { error } = (await response.json()) as OpenAI.ErrorResponse;
      toast.error(error.message);
    }
    sendEvent("query", { type: "completion" });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <fieldset>
          <Label label="Text to classify" required>
            <Textarea
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              bordered
              minRows={4}
              required
              width="100%"
              {...form.register("query")}
            />
          </Label>
          <div className="flex flex-wrap gap-8">
            <Label label="Completion engine" required>
              <SelectEngine name="model" required />
            </Label>
            <Label label="Search engine">
              <SelectEngine name="search_model" />
            </Label>
            <Label label="Temperature">
              <Input
                bordered
                type="number"
                min={0}
                max={1}
                step={0.1}
                {...form.register("temperature", { min: 0, max: 1 })}
              />
            </Label>
          </div>
        </fieldset>
        <Button
          auto
          iconRight={<FontAwesomeIcon icon={faChevronRight} />}
          loading={form.formState.isSubmitting}
          type="submit"
        >
          Classify
        </Button>
      </form>
      {results.map((result, index) => (
        <ClassificationResult key={index} results={result} />
      ))}
      <ShowRequestExample
        request={request}
        reference="https://beta.openai.com/docs/api-reference/classifications/create"
      />
    </FormProvider>
  );
}

function ClassificationResult({
  results,
}: {
  results: OpenAI.Classifications.Response;
}) {
  return (
    <InfoCard>
      <h3>
        <span className="font-normal">Label:</span> {results.label}
      </h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Label</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {results.selected_examples.map((example) => (
            <tr key={example.document}>
              <td className="align-top">
                {example.label} ({example.score.toFixed(2)})
              </td>
              <td className="line-clamp-4">{example.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <b>Model:</b> {results.model}
      </p>
      <p>
        <b>Search Model:</b> {results.search_model}
      </p>
      {results.warnings?.map(({ message }, index) => (
        <p key={index} className="mt-4 text-red-500">
          <b>Warning:</b> {message}
        </p>
      ))}
    </InfoCard>
  );
}
