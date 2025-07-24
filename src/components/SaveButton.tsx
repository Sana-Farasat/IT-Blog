"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface SaveButtonProps {
  blog: {
    title: string;
    imageUrl: string;
    content: string;
    slug: string;
  } // | null;
}

export default function SaveButton({ blog }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  console.log("SaveButton blog prop:", blog); // Debug: Log blog prop

  // if (!blog || !blog.slug) {
  //   console.warn("SaveButton: Invalid blog prop, not rendering");
  //   return null;
  // }

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
    console.log("Saved blogs from localStorage:", savedBlogs);
    const isBlogSaved = savedBlogs.some((b: any) => b.slug === blog.slug);
    setIsSaved(isBlogSaved);
  }, [blog.slug]);

  if (!blog || !blog.slug) {
    console.warn("SaveButton: Invalid blog prop, not rendering");
    return null;
  }

  const handleSave = () => {
    try {
      let savedBlogs = JSON.parse(localStorage.getItem("savedBlogs") || "[]");

      if (isSaved) {
        savedBlogs = savedBlogs.filter((b: any) => b.slug !== blog.slug);
        localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
        setIsSaved(false);
        toast.success("Blog unsaved successfully!", {
          duration: 3000,
          position: "top-right",
        });
        console.log("Blog unsaved, updated savedBlogs:", savedBlogs);
      } else {
        savedBlogs.push({
          title: blog.title,
          imageUrl: blog.imageUrl,
          content: blog.content,
          slug: blog.slug,
        });
        localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
        setIsSaved(true);
        toast.success("Blog saved successfully!", {
          duration: 3000,
          position: "top-right",
        });
        console.log("Blog saved, updated savedBlogs:", savedBlogs);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
      toast.error("Failed to save/unsave blog", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <button
      onClick={handleSave}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none transition ${
        isSaved
          ? "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
          : "bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
      }`}
    >
      {isSaved ? "Unsave" : "Save"}
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isSaved ? "M1 5h12m0 0L9 9m4-4L9 1" : "M1 5h12m0 0L9 1m4 4L9 9"}
        />
      </svg>
    </button>
  );
}
