"use client";
import React from "react";
import ShareButton from "@/components/ShareButton";
import CopyButton from "@/components/CopyButton";
import SaveButton from "@/components/SaveButton";
import DownloadButton from "@/components/DownloadButton";

interface BlogActionsProps {
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
}

export default function BlogActions({
  title,
  slug,
  content,
  imageUrl,
}: BlogActionsProps) {
  console.log("BlogActions props:", { title, slug, content, imageUrl }); // Debug: Log props

  return (
    <>
      <ShareButton title={title} slug={slug} />
      <CopyButton text={content} />
      <SaveButton blog={{ title, slug, content, imageUrl }} />
      <DownloadButton title={title} content={content} />
    </>
  );
}
