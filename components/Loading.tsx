import { Loading as Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-row justify-around my-20">
      <Spinner size="xlarge" />
    </div>
  );
}
