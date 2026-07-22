
import { ShieldCheck, Target, HeartHandshake } from "lucide-react";

function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white to-violet-50/40"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div>

            <span className="inline-block px-4 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
              About Us
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#2B0F3F] leading-tight">
              Manage your money with confidence.
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Money Manager is a simple personal finance application built to
              help you record your daily income and expenses, understand your
              spending habits, and make smarter financial decisions.
            </p>

            <p className="mt-5 text-lg text-slate-600 leading-8">
              Whether you're a student, working professional, or someone
              planning a better financial future, Money Manager provides an
              easy and secure way to stay in control of your finances.
            </p>

          </div>

          {/* Right Side */}

          <div className="grid gap-6">

            <div className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm hover:shadow-lg transition">

              <div className="flex items-start gap-5">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B174C] to-[#8B1E63] flex items-center justify-center text-white">
                  <Target size={28} />
                </div>

                <div>

                  <h3 className="text-xl font-semibold text-[#2B0F3F]">
                    Our Mission
                  </h3>

                  <p className="mt-2 text-slate-600 leading-7">
                    Make personal finance management simple, accessible and
                    useful for everyone.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm hover:shadow-lg transition">

              <div className="flex items-start gap-5">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B174C] to-[#8B1E63] flex items-center justify-center text-white">
                  <ShieldCheck size={28} />
                </div>

                <div>

                  <h3 className="text-xl font-semibold text-[#2B0F3F]">
                    Secure & Reliable
                  </h3>

                  <p className="mt-2 text-slate-600 leading-7">
                    Your account is protected with secure authentication,
                    email verification and modern security practices.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm hover:shadow-lg transition">

              <div className="flex items-start gap-5">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B174C] to-[#8B1E63] flex items-center justify-center text-white">
                  <HeartHandshake size={28} />
                </div>

                <div>

                  <h3 className="text-xl font-semibold text-[#2B0F3F]">
                    Built for Everyone
                  </h3>

                  <p className="mt-2 text-slate-600 leading-7">
                    Whether you're tracking personal expenses or building
                    better financial habits, Money Manager is designed to
                    support your everyday journey.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;