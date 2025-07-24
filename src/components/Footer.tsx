import { Button } from "@/components/ui/button"; // From ShadCN

export default function Footer() {
  return (
    <footer className="max-w-screen-2xl mx-auto">
      <div className="bg-black text-white py-10 px-6 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-start">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold">Sana&apos;s IT Blog</h2>
            <p className="mt-2 text-gray-400">
              Sharing the latest in tech, programming, and development insights.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Articles", "Projects", "Contact"].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials or Action */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
            <p className="text-gray-400 mb-4">
              Follow for updates & tutorials.
            </p>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black transition"
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Made with ❤️ by Sana. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
