import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  name: string;
  text: string;
}

function ExeCopy(text: string) {
  toast.success(`${text} copied!`);
  console.log("hello");
  navigator.clipboard.writeText(text);
}

export default function CopyBtn({ name, text }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="mx-2 h-7 px-[8px]"
            onClick={() => ExeCopy(text)}>
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <g transform="matrix(1 0 0 1 12 12)">
                <path
                  transform=" translate(-12, -12)"
                  d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"
                />
              </g>
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy {name} to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
