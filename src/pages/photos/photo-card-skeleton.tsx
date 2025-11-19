import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Photo Card Skeleton - Loading state for photo cards
 */
export function PhotoCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-28" />
      </div>
    </Card>
  );
}
