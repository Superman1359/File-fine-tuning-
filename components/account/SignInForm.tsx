import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import requestHeaders from "./requestHeaders";
import useAuthentication from "./useAuthentication";

export default function SigninForm() {
  const { signIn } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const initialValue = { apiKey: "", organizationId: "" };
  const form = useForm({ defaultValues: initialValue });
  const [error, setError] = useState("");
  const [showOrgId, setShowOrgId] = useState(false);
  const router = useRouter();

  form.watch("apiKey");

  const onSubmit = form.handleSubmit(async function (
    formData: typeof initialValue
  ) {
    try {
      setIsLoading(true);

      const response = await fetch("https://api.openai.com/v1/engines", {
        headers: requestHeaders(formData),
      });
      if (response.ok) {
        signIn(formData.apiKey, formData.organizationId);
        router.push("/completions");
      } else {
        const { error } = await response.json();
        setError(error.message);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <section className="space-y-4">
      <h1 className="text-xl capitalize">
        Enter this way{" "}
        <FontAwesomeIcon icon={faChevronRight} className="ml-4" />
      </h1>
      <hr />
      <form className="py-8 space-y-8" onSubmit={onSubmit}>
        {error && <div className="my-4 text-red-500">{error}</div>}
        <div>
          <Input
            bordered
            labelPlaceholder="Your OpenAI API Key"
            required
            type="text"
            width="100%"
            {...form.register("apiKey")}
          />
          <p>
            Your API key is{" "}
            <a
              href="https://beta.openai.com/account/api-keys"
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
            >
              available here.
            </a>
          </p>
        </div>
        <div>
          {showOrgId ? (
            <Input
              bordered
              labelPlaceholder="Organization ID"
              type="text"
              width="100%"
              {...form.register("organizationId")}
            />
          ) : (
            <Link
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                setShowOrgId(true);
              }}
            >
              I have an organization ID
            </Link>
          )}
        </div>
        <div className="flex justify-end ">
          <Button
            auto
            disabled={form.getValues().apiKey === ""}
            loading={isLoading}
            iconRight={<FontAwesomeIcon icon={faChevronRight} />}
            type="submit"
          >
            <span className="uppercase">{"Let's go"}</span>
          </Button>
        </div>
      </form>
      <p>
        * Your API key does not leave your browser, except to access the OpenAI
        API.
      </p>
    </section>
  );
}
