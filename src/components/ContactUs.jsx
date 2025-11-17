import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email.";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowPopup(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setShowPopup(false), 2500);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-black px-6 py-16 relative">
      {/* ✅ Popup FIXED with z-index and position */}
      {showPopup && (
        <div className="fixed top-8 right-8 z-[9999] bg-white/10 border border-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-fadeIn">
          <CheckCircle2 className="text-green-400 w-5 h-5" />
          <span>Your message has been sent!</span>
        </div>
      )}

      <div className="relative bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10 w-full max-w-4xl text-white shadow-[0_0_40px_rgba(255,255,255,0.04)] overflow-hidden">
        {/* Glossy border */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
          <div className="absolute inset-0 rounded-3xl border border-white/10 before:absolute before:inset-0 before:rounded-3xl before:bg-[linear-gradient(130deg,rgba(255,255,255,0.03)_10%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.03)_90%)] before:animate-[moveGloss_6s_linear_infinite] before:bg-[length:300%_300%]" />
        </div>

        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent tracking-wide">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Info */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-white/70 leading-relaxed text-lg sm:text-xl">
              Got <span className="text-white font-semibold">questions</span>,
              <span className="text-white font-semibold"> feedback</span>, or
              <span className="text-white font-semibold"> collaboration ideas</span>?  
              <br className="hidden sm:block" />
              Drop us a message — we’ll get back to you shortly.
            </p>
          </div>

          {/* Right Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white/70 mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full p-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition ${
                  errors.name ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:ring-white/20"
                }`}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full p-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition ${
                  errors.email ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:ring-white/20"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2">Message</label>
              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className={`w-full p-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition resize-none ${
                  errors.message ? "border-red-500/50 focus:ring-red-500/50" : "border-white/10 focus:ring-white/20"
                }`}
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-white/90 transition"
            >
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes moveGloss {
            0% { background-position: 100% 0%; }
            50% { background-position: 0% 100%; }
            100% { background-position: 100% 0%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactUs;
