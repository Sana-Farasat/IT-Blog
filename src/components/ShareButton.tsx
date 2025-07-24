// 'use client';

// import { Button } from '@/components/ui/button';
// import { Share2 } from 'lucide-react';
// import { toast } from 'sonner';

// interface ShareButtonProps {
//   url: string;
//   title: string;
// }

// export default function ShareButton({ url, title }: ShareButtonProps) {
//   const shareBlog = async () => {
//     try {
//       await navigator.share({
//         title,
//         text: `Check out this blog: ${title}`,
//         url,
//       });
//       toast.success("Shared!", {
//         description: "Blog post shared successfully.",
//       });
//     } catch (err) {
//       toast.error("Error", {
//         description: "Failed to share the blog post.",
//       });
//     }
//   };

//   return (
//     <Button variant="outline" size="sm" onClick={shareBlog}>
//       <Share2 className="h-4 w-4 mr-2" />
//       Share
//     </Button>
//   );
// }

// 'use client';

// import { Button } from '@/components/ui/button';
// import { Share2 } from 'lucide-react';
// import { toast } from 'sonner';

// interface ShareButtonProps {
//   id: number;
//   title: string;
//  // slug: string;
// }

// export default function ShareButton({ id, title}: ShareButtonProps) {
//   // Use a fallback base URL for development or if window is undefined
//   const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
//   const shareUrl = `${baseUrl}/blogs/${id}`;

//   const shareBlog = async () => {
//     try {
//       // Log the URL for debugging
//       console.log('Attempting to share URL:', shareUrl);

//       // Skip fetch validation in development to avoid false negatives
//       if (process.env.NODE_ENV === 'development') {
//         console.log('Skipping URL validation in development mode');
//       } else {
//         // Validate URL accessibility
//         const response = await fetch(shareUrl, { method: 'HEAD', mode: 'no-cors' });
//         console.log('URL validation response status:', response.status);
//         // Note: no-cors mode doesn't provide status, but ensures request is attempted
//       }

//       if (navigator.share) {
//         await navigator.share({
//           title,
//           text: `Check out this blog: ${title}`,
//           url: shareUrl,
//         });
//         toast.success('Shared!', {
//           description: 'Blog post shared successfully.',
//         });
//       } else {
//         // Fallback: Copy URL to clipboard
//         await navigator.clipboard.writeText(shareUrl);
//         toast.success('Link Copied!', {
//           description: 'Blog URL copied to clipboard.',
//         });
//       }
//     } catch (err: any) {
//       console.error('Share error:', err.message);
//       if (err.name === 'NotAllowedError') {
//         toast.error('Error', {
//           description: 'Sharing is not allowed in this context. Try copying the link.',
//         });
//       } else if (err.name === 'AbortError') {
//         toast.error('Error', {
//           description: 'Share action was aborted. Please try again.',
//         });
//       } else {
//         toast.error('Error', {
//           description: `Failed to share the blog post: ${err.message}`,
//         });
//       }
//     }
//   };

//   return (
//     <Button variant="outline" size="sm" onClick={shareBlog}>
//       <Share2 className="h-4 w-4 mr-2" />
//       Share
//     </Button>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  slug: string;
  title: string;
}

export default function ShareButton({ slug, title }: ShareButtonProps) {
  const shareBlog = async () => {
    try {
      const baseUrl = window?.location?.origin || "http://localhost:3000";
      const shareUrl = `${baseUrl}/blog/${slug}`;

      console.log("Sharing URL:", shareUrl);

      // Web Share API
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: `Check out this blog: ${title}`,
          url: shareUrl,
        });
        toast.success("Shared!", {
          description: "Blog post shared successfully.",
          position: "top-right",
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link Copied!", {
          description: "Blog URL copied to clipboard.",
          position: "top-right",
        });
      }
    } catch (err: any) {
      console.error("Error sharing:", err);

      if (err.name === "NotAllowedError") {
        toast.error("Permission Denied", {
          description: "Sharing not allowed. Try copying the link.",
        });
      } else if (err.name === "AbortError") {
        toast.error("Sharing Aborted", {
          description: "User canceled the share action.",
        });
      } else {
        toast.error("Share Failed", {
          description: `Could not share: ${err.message}`,
        });
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={shareBlog}
      //className="bg-blue-600 text-white "
      className="px-5 w-24 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-sm font-medium shadow"
    >
      <Share2 className="h-4 w-4 mr-2 " />
      Share
    </Button>
  );
}
