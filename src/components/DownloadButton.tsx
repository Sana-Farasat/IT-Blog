"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function DownloadButton({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Downloaded!", {
      description: "Blog downloaded.",
      position: "top-center",
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="px-5 w-24 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-sm font-medium shadow"
    >
      <Download className="h-4 w-4" /> Download
    </Button>
  );
}
