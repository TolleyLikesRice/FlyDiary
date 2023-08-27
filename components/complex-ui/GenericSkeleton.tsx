// TODO: Improve, hopefully it should never be used, but worth having it

import { Skeleton } from "@/components/ui/skeleton";

export default function GenericSkeleton() {
    return (
        <div className="flex items-center justify-center w-full h-full"> 
            <Skeleton className="w-3/4 h-[300px]" />
        </div>
    )
}