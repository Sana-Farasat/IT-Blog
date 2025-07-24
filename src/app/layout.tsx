import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Blog Website",
  description: "A dynamic and responsive blog website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-indigo-100 via-white to-blue-300`}>
        <Header />

        <main className="container mx-auto ">{children}</main>
        <Toaster richColors closeButton theme="light" />
        <Footer />
      </body>
    </html>
  );
}
