"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div
          className="w-full max-w-screen-xl bg-white rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden"
          data-aos="fade-up"
        >
          {/* Image Section */}
          <div className="relative group w-full h-64 md:h-auto">
            <Image
              src="/contactform.jpg"
              alt="Contact"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* This div is hover effect on image */}
            {/* <div className="absolute inset-0 bg-blue-900 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
          </div>

          {/* Contact Form Section */}
          <div className="p-6 sm:p-10" data-aos="fade-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Have a question or want to work together? Fill out the form below
              and we&apos;ll get back to you shortly.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
