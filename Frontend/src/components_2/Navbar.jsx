import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Wallet } from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMobileMenu(false);
  };

  return (
    <>
      <header
        className={`fixed z-50 left-0 w-full transition-all duration-300 ease-out ${
          scrolled ? "top-4" : "top-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div
            className={`h-20 flex items-center justify-between transition-all duration-300 ease-out
            ${
              scrolled
                ? "rounded-3xl bg-white/75 backdrop-blur-2xl ring-1 ring-slate-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)] px-8"
                : "bg-white/15 backdrop-blur-md ring-1 ring-transparent px-4"
            }`}
          >

          {/* ================= Logo ================= */}

          <div
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 cursor-pointer select-none">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 backdrop-blur-sm shadow-sm border border-violet-100">
              <img
                src={assets.logo2}
                alt="MoneyManager Logo"
                className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-105 rounded-xl"
              />
            </div>

            <div className="leading-tight">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                MoneyManager
              </h2>

              <p className="text-xs text-slate-500">
                Smart Finance
              </p>
            </div>
          </div>

            {/* ================= Desktop Links ================= */}

            <nav className="hidden lg:flex items-center gap-10">

              <button
                onClick={() => scrollToSection("home")}
                className="font-medium text-slate-700 hover:text-violet-600 transition cursor-pointer"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className="font-medium text-slate-700 hover:text-violet-600 transition cursor-pointer"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="font-medium text-slate-700 hover:text-violet-600 transition cursor-pointer"
              >
                About
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="font-medium text-slate-700 hover:text-violet-600 transition cursor-pointer"
              >
                Contact
              </button>

            </nav>

            {/* ================= Right Buttons ================= */}

            <div className="hidden lg:flex items-center gap-4">

              <Link
                to="/login"
                className="font-medium text-slate-700 hover:text-violet-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-violet-600 hover:bg-violet-700 hover:scale-105 transition-all duration-300 text-white px-7 py-3 rounded-full shadow-lg shadow-violet-500/30"
              >
                Get Started
              </Link>

            </div>

            {/* ================= Mobile ================= */}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden"
            >
              {mobileMenu ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>

          </div>

                    {/* ================= Mobile Menu ================= */}

          {mobileMenu && (
            <div
              className={`lg:hidden mt-3 overflow-hidden rounded-3xl transition-all duration-300
              ${
                scrolled
                    ? "rounded-3xl bg-white/75 backdrop-blur-2xl ring-1 ring-slate-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)] px-8"
                    : "bg-white/15 backdrop-blur-md ring-1 ring-transparent px-4"
              }`}
            >
              <div className="flex flex-col py-2">

                <button
                  onClick={() => scrollToSection("home")}
                  className="py-4 hover:bg-violet-50 transition text-slate-700"
                >
                  Home
                </button>

                <button
                  onClick={() => scrollToSection("features")}
                  className="py-4 hover:bg-violet-50 transition text-slate-700"
                >
                  Features
                </button>

                <button
                  onClick={() => scrollToSection("about")}
                  className="py-4 hover:bg-violet-50 transition text-slate-700"
                >
                  About
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="py-4 hover:bg-violet-50 transition text-slate-700"
                >
                  Contact
                </button>

                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="py-4 text-center hover:bg-violet-50 transition text-slate-700"
                >
                  Login
                </Link>

                <div className="px-5 py-4">
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenu(false)}
                    className="block text-center bg-violet-600 hover:bg-violet-700 hover:scale-[1.02] transition-all duration-300 text-white py-3 rounded-full shadow-lg shadow-violet-500/30"
                  >
                    Get Started
                  </Link>
                </div>

              </div>
            </div>
          )}

        </div>
      </header>
    </>
  );
};

export default Navbar;