import { ArrowRight, TrendingUp, Wallet, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50"></div>

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl"></div>

      <div className="absolute top-32 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-300/20 blur-3xl"></div>

      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 mb-6">
              <TrendingUp size={16} />
              Smart Personal Finance
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">

              Manage Your

              <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">

                Money Smarter

              </span>

            </h1>

            <p className="mt-8 text-lg leading-8 text-slate-600 max-w-xl">

              Track your income, organize expenses,
              analyze your spending habits and achieve your
              financial goals with one beautiful dashboard.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/signup"
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 transition shadow-xl shadow-violet-500/30"
              >
                Get Started

                <ArrowRight size={18} />
              </Link>

            </div>

            

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Main Card */}

            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500">
                    Total Balance
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    ₹84,250
                  </h2>

                </div>

                <div className="bg-violet-100 p-4 rounded-2xl">

                  <Wallet className="text-violet-600" />

                </div>

              </div>

              <div className="mt-10 space-y-5">

                <div>

                  <div className="flex justify-between mb-2">

                    <span>Income</span>

                    <span className="font-semibold text-green-600">
                      +₹32,000
                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-100">

                    <div className="w-[82%] h-full bg-green-500 rounded-full"></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span>Expenses</span>

                    <span className="font-semibold text-red-500">
                      -₹12,800
                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-100">

                    <div className="w-[45%] h-full bg-red-500 rounded-full"></div>

                  </div>

                </div>

              </div>

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-10 -left-10 bg-white rounded-2xl shadow-xl border border-slate-200 p-5 hidden md:block">

              <div className="flex gap-3 items-center">

                <div className="bg-green-100 p-3 rounded-xl">

                  <TrendingUp className="text-green-600" />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Monthly Savings
                  </p>

                  <h3 className="font-bold text-lg">
                    +₹18,500
                  </h3>

                </div>

              </div>

            </div>

            {/* Floating Card */}

            <div className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-5 hidden md:block">

              <div className="flex gap-3 items-center">

                <div className="bg-violet-100 p-3 rounded-xl">

                  <ShieldCheck className="text-violet-600" />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Secure
                  </p>

                  <h3 className="font-bold">
                    JWT Protected
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;