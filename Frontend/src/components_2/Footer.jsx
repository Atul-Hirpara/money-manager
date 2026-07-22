import { Mail, ArrowUp } from "lucide-react";

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#2B0F3F] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold">
               Money Manager
            </h2>

            <p className="mt-5 text-violet-100 leading-7">
              Take control of your finances with a simple, secure and
              beautiful expense tracking experience.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-violet-100">

              <li>
                <a href="/home" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-white transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Resources
            </h3>

            <ul className="space-y-3 text-violet-100">

              <li>
                <a href="/login" className="hover:text-white transition">
                  Login
                </a>
              </li>

              <li>
                <a href="/signup" className="hover:text-white transition">
                  Create Account
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Connect
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-violet-100">

                <Mail size={18} />

                <span>support@moneymanager.com</span>

              </div>

              <div className="flex gap-4 mt-6">

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M12 0.297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.119 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.624-5.476 5.921.43.372.814 1.102.814 2.222 0 1.606-.015 2.904-.015 3.297 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.941v5.665H9.353V9h3.414v1.561h.048c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.269 2.37 4.269 5.455v6.288zM5.337 7.433a2.065 2.065 0 11.001-4.13 2.065 2.065 0 01-.001 4.13zM6.813 20.452H3.86V9h2.953v11.452z" />
                  </svg>
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-violet-300/20 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-violet-200 text-sm">
            © {new Date().getFullYear()} Money Manager. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-5 py-2 rounded-full"
          >
            <ArrowUp size={18} />
            Back to Top
          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;