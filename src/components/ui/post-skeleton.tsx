import { Card, CardContent, CardHeader } from "./card"
import { Skeleton } from "./skeleton"

export function PostSkeleton() {
  return (
    <Card className="bg-black border-[var(--matrix-green)]/30">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-7 w-48" />
        </div>
        <Skeleton className="h-4 w-32 mt-4" />
      </CardHeader>
      <CardContent className="pt-8">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-48" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function PostContentSkeleton() {
  return (
    <Card className="bg-black border-[var(--matrix-green)]">
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-[400px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="flex flex-wrap gap-2 pt-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 