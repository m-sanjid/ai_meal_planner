import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  mealCount: number;
}

const LoadingSkeleton = ({ mealCount }: LoadingSkeletonProps) => {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
      {Array(mealCount)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="overflow-hidden p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-3/4 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full rounded-md" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
              </div>
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <div className="space-y-2">
                {Array(4)
                  .fill(0)
                  .map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full rounded-md" />
                  ))}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default LoadingSkeleton;
