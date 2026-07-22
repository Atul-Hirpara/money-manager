import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useRef } from "react";

function Contact() {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      nameRef.current?.focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      emailRef.current?.focus();
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      messageRef.current?.focus();
      return;
    }

    toast.success("Message sent successfully");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block px-4 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
            Contact Us
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#2B0F3F]">
            We'd love to hear from you
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Have questions, feedback, or suggestions? Feel free to reach out.
            We're always happy to help.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-16 mt-16">

          {/* Left Side */}

          <div className="space-y-6">

            <div className="flex items-start gap-5 p-6 rounded-3xl border border-violet-100 hover:shadow-lg transition">

              <div className="w-14 h-14 rounded-2xl  flex items-center justify-center ">
                <Mail size={26} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#2B0F3F]">
                  Email
                </h3>

                <p className="mt-2 text-slate-600">
                  support@moneymanager.com
                </p>
              </div>

            </div>

            <div className="flex items-start gap-5 p-6 rounded-3xl border border-violet-100 hover:shadow-lg transition">

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                <Phone size={26} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#2B0F3F]">
                  Phone
                </h3>

                <p className="mt-2 text-slate-600">
                  +91 98765 43210
                </p>
              </div>

            </div>

            <div className="flex items-start gap-5 p-6 rounded-3xl border border-violet-100 hover:shadow-lg transition">

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                <MapPin size={26} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#2B0F3F]">
                  Location
                </h3>

                <p className="mt-2 text-slate-600">
                  Gujarat, India
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="bg-violet-50/40 rounded-3xl p-8 border border-violet-100">

            <form className="space-y-5" onSubmit={handleSendMessage}>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ref={nameRef}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-violet-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  ref={messageRef}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#5B174C] to-[#8B1E63] text-white py-3.5 rounded-xl font-semibold hover:opacity-95 transition shadow-lg cursor-pointer"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;