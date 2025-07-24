"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HomeText() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen  py-10 px-4 text-center">
      <div
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 text-lg text-gray-800 leading-relaxed border-l-4 border-blue-500 hover:shadow-2xl transition-shadow duration-500"
        data-aos="fade-up"
      >
        Information Technology (IT) is one of the fastest-growing and most
        exciting industries in the world today. It includes many interesting
        fields where you can build creative projects, solve real problems, and
        shape the future. For example,{" "}
        <span className="font-bold text-blue-700">Web Development</span> is all
        about creating websites and online platforms that are fast, secure, and
        easy to use.
        <span className="font-bold text-pink-600"> Graphic Designing</span> adds
        color and beauty through visuals, logos, and layouts that make content
        more attractive. With the growth of{" "}
        <span className="text-purple-700">Agentic AI</span> and{" "}
        <span className="text-purple-500">Generative AI</span>, machines can now
        learn, create content, and even assist in decision-making like never
        before.
        <span className="text-green-600 font-semibold">
          {" "}
          Digital Marketing
        </span>{" "}
        helps companies promote their services online using SEO, social media,
        and advertising tools. Meanwhile,{" "}
        <span className="text-yellow-600">App Development</span> focuses on
        building mobile and desktop applications that improve how we live, work,
        and communicate. Behind the scenes,{" "}
        <span className="text-cyan-700">Cloud Computing</span> makes sure that
        data is stored and shared safely over the internet, while{" "}
        <span className="text-red-500">Cybersecurity</span> protects systems
        from digital threats and hackers. Whether you&apos;re creative, analytical,
        or tech-savvy, there&apos;s a space for you in IT!
      </div>
      <Link href={"/blog"}>
        <Button className="border border-blue-700 text-white bg-blue-700 my-5 py-5 px-7 hover:bg-blue-900 hover:scale-105 ease-in-out duration-75">
          View Blogs
        </Button>
      </Link>
    </div>
  );
}
