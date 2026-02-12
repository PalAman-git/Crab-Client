import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Spinner className="h-25 w-25" />
    </div>
  );
}
