import { Wallet, ArrowUpCircle, ArrowDownCircle, PieChart, BellRing, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Wallet size={28} />,
    title: "Track Every Transaction",
    description:
      "Record your income and expenses effortlessly so every rupee is accounted for.",
  },
  {
    icon: <ArrowDownCircle size={28} />,
    title: "Manage Income",
    description:
      "Keep all income sources organized and monitor your monthly cash flow.",
  },
  {
    icon: <ArrowUpCircle size={28} />,
    title: "Control Expenses",
    description:
      "Categorize daily spending and understand exactly where your money goes.",
  },
  {
    icon: <PieChart size={28} />,
    title: "Visual Insights",
    description:
      "Simple charts and summaries help you make smarter financial decisions.",
  },
  {
    icon: <BellRing size={28} />,
    title: "Daily Reminders",
    description:
      "Never forget to record today's transactions with automatic reminder emails.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Account",
    description:
      "Protected authentication and email verification keep your account secure.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-white to-violet-50/40"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block px-4 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
            Features
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#2B0F3F]">
            Everything you need to manage your money
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Money Manager gives you the essential tools to monitor your
            finances, build better habits, and stay in control of your money.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => (

            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              p-8
              border
              border-violet-100
              hover:border-violet-300
              hover:-translate-y-2
              transition-all
              duration-300
              shadow-sm
              hover:shadow-xl"
            >

              <div
                className="
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-[#5B174C]
                to-[#8B1E63]
                text-white
                shadow-lg"
              >
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#2B0F3F]">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-600 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;