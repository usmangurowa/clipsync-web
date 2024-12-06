"use client";

import { cn } from "@/lib/utils";
import { Tables } from "@/supabase/db-types";
import React from "react";

const ClipsBoard = ({ clips }: { clips: Tables<"clipboard">[] }) => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4">
      {clips?.map((clip, index) => (
        <div
          key={clip.id}
          className={cn(
            "mb-5 cursor-pointer rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-900",
            {
              "border-green-500 bg-green-50 dark:border-green-500": index === 0,
            },
          )}
        >
          <p className="line-clamp-6">{clip.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ClipsBoard;
