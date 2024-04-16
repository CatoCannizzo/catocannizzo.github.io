import { Button } from "../ui/button";
import { toast } from "sonner";

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
    <Button variant="outline" onClick={() => ExeCopy(text)}>
      <p>Copy {name}</p>
    </Button>
  );
}
