import { BookOpen, Clock4, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

export function BookCard({
  cover,
  genre,
  title,
  description,
  rating,
  pages,
  totalDuration,
}) {
  return (
    <div className="flex gap-4 h-[300px]">
      <div className="flex group w-[200px] overflow-hidden transition-all duration-300 hover:w-[500px] shadow-lg bg-white rounded-lg">
        <img
          src={cover}
          alt={title}
          className="w-[200px] h-[300px] object-cover flex-shrink-0 rounded-l-lg group-hover:rounded-l-lg"
        />
        <div className="flex flex-col justify-start p-6 pt-8 w-0 opacity-0 group-hover:w-[300px] group-hover:opacity-100 transition-all duration-300 rounded-r-lg text-foreground bg-white">
          <Badge className="p-2 mb-3.5">
            <p>{genre}</p>
          </Badge>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-2 text-sm line-clamp-5 pb-5">{description}</p>
          <div className="flex justify-between">
            <div className="flex gap-1">
              <Star className="fill-amber-300 stroke-amber-300 stroke-2" />
              <span>{rating}/5</span>
            </div>
            <div className="flex gap-1 opacity-70 items-center">
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 cursor-pointer">
                  <Clock4 />
                  <span className="text-sm font-medium">{totalDuration}</span>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-100 text-gray-800 rounded-md p-2 text-xs shadow-lg max-w-xs opacity-100">
                  <p>
                    <span className="underline">Estimated</span> reading time
                    based on pages and average reading speed (~200 words/min).
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex gap-1 opacity-50">
              <BookOpen />
              <span>{pages}</span>
            </div>
          </div>
          <Button className="mt-auto">Start Reading</Button>
        </div>
      </div>
    </div>
  );
}
