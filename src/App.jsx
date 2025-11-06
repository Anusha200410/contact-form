import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [statusText, setStatusText] = useState("");
  const API_URL = "https://vernanbackend.ezlab.in/api/contact-us/";

  // Validate inputs
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else {
      const re = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
      if (!re.test(form.email)) e.email = "Enter a valid email";
    }
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusText("");
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setSubmitting(true);

    try {
      const payload = { ...form };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        setStatusText("Form Submitted");
        setForm({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        let bodyText = "";
        try {
          const json = await res.json();
          bodyText = JSON.stringify(json);
        } catch (_) {
          bodyText = await res.text();
        }
        setStatusText(`Error: ${res.status} ${bodyText}`);
      }
    } catch (err) {
      setStatusText(`Network error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-b from-[#5C6BC0] to-[#3949AB] text-white gap-6">
          <h1 className="text-4xl font-semibold">EZ Labs</h1>
          <p className="text-lg opacity-90">
            Contact us — fill the form and we will get back to you shortly.
          </p>
          <div className="mt-6 w-full">
            <div className="rounded-lg bg-white bg-opacity-10 p-4">
              <p className="text-sm">Responsive on:</p>
              <ul className="text-sm mt-2 list-disc list-inside opacity-90">
                <li>480p (Mobile)</li>
                <li>720p</li>
                <li>1080p</li>
                <li>2732×2048 (iPad)</li>
                <li>1440×823 (MacBook)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-6 sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Get in touch</h2>
          <p className="text-gray-700 mb-6">All fields are required.</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C6BC0] ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  inputMode="email"
                  className={`mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C6BC0] ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Mobile number"
                inputMode="tel"
                className={`mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C6BC0] ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your message..."
                className={`mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C6BC0] ${errors.message ? 'border-red-500' : ''}`}
              />
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
            </div>

            {/* Submit & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium ${submitting ? 'bg-[#90CAF9]' : 'bg-[#1E88E5] hover:bg-[#1565C0]'}`}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <input
                  readOnly
                  value={statusText}
                  placeholder="Status will appear here"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100 text-gray-700"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
