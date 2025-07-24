"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!", {
      description: "Blog content copied to clipboard.",
      position: "top-right"
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={copyToClipboard}
      className="px-5 w-24 h-10 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium shadow"
    >
      <Copy className="h-4 w-4 mr-2" />
      Copy
    </Button>
  );
}
