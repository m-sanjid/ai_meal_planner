import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto h-full flex flex-col gap-4 rounded-lg border m-20">
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default LoadingSkeleton;
