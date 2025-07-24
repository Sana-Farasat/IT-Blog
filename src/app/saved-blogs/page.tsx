"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "sonner";

interface SavedBlog {
  title: string;
  imageUrl: string | null; // Allow imageUrl to be null
  content: string;
  slug: string;
}

export default function SavedBlogs() {
  const [savedBlogs, setSavedBlogs] = useState<SavedBlog[]>([]);

  useEffect(() => {
    try {
      const blogs = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
      console.log("SavedBlogs loaded from localStorage:", blogs); // Debug: Log raw data
      // Validate and filter out invalid entries
      const validBlogs = blogs.filter(
        (blog: any) =>
          blog &&
          typeof blog.title === "string" &&
          typeof blog.slug === "string" &&
          typeof blog.content === "string" &&
          (blog.imageUrl === null || typeof blog.imageUrl === "string")
      );
      console.log("Validated savedBlogs:", validBlogs); // Debug: Log validated data
      setSavedBlogs(validBlogs);
      if (blogs.length !== validBlogs.length) {
        toast.error("Some saved blogs were invalid and removed", {
          duration: 3000,
          position: "top-right",
        });
        localStorage.setItem("savedBlogs", JSON.stringify(validBlogs)); // Update localStorage
      }
    } catch (error) {
      console.error("Error loading savedBlogs:", error);
      toast.error("Failed to load saved blogs", {
        duration: 3000,
        position: "top-right",
      });
    }
  }, []);

  const handleUnsave = (slug: string) => {
    try {
      const updatedBlogs = savedBlogs.filter((blog) => blog.slug !== slug);
      localStorage.setItem("savedBlogs", JSON.stringify(updatedBlogs));
      setSavedBlogs(updatedBlogs);
      toast.success("Blog unsaved successfully!", {
        duration: 3000,
        position: "top-right",
      });
      console.log("Unsaved blog, updated savedBlogs:", updatedBlogs);
    } catch (error) {
      console.error("Error in handleUnsave:", error);
      toast.error("Failed to unsave blog", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
        Saved Blogs
      </h1>
      {savedBlogs.length === 0 ? (
        <div className="text-center text-gray-500">
          No saved blogs yet. Save some blogs to see them here!
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center mx-4 md:mx-16">
          {savedBlogs.map((blog) => (
            <div
              key={blog.slug}
              className="transform transition duration-500 hover:scale-105 h-full w-full"
            >
              <div className="max-w-sm h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {blog.imageUrl ? (
                  <Image
                    className="rounded-t-lg"
                    src={urlFor(blog.imageUrl).url()}
                    alt={blog.title}
                    height={100}
                    width={400}
                  />
                ) : (
                  <div className="rounded-t-lg bg-gray-200 flex items-center justify-center h-[100px]">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-grow">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="mt-auto flex justify-between">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
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
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleUnsave(blog.slug)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                    >
                      Unsave
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
