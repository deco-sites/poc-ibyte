import Spinner from "$store/components/ui/Spinner.tsx";

export default function Loading({ full = true }: { full?: boolean }) {
  return (
    <div
      class={`${
        full ? "h-screen" : ""
      } w-full flex items-center justify-center`}
    >
      <Spinner />
    </div>
  );
}
