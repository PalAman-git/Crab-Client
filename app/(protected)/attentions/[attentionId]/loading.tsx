import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Spinner className="h-24 w-24"/>
    </div>
  );
}
