import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="m-20 mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-lg border p-4">
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default LoadingSkeleton;
