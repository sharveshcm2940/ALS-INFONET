import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Phone, Mail } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'Custom Software Development',
    requirements: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    referenceId?: string;
    message?: string;
  } | null>(null);

  // Live IST Clock & Architecture Workbench prefill listener
  const [currentTimeIST, setCurrentTimeIST] = useState('');

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceInterest?: string; requirements?: string; company?: string }>;
      if (customEvent.detail) {
        setFormData(prev => ({
          ...prev,
          serviceInterest: customEvent.detail.serviceInterest || prev.serviceInterest,
          requirements: customEvent.detail.requirements || prev.requirements,
          company: customEvent.detail.company || prev.company
        }));
      }
    };
    window.addEventListener('als_prefill_contact', handlePrefill);

    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTimeIST(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('als_prefill_contact', handlePrefill);
    };
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid work email address.';
    }
    if (!formData.requirements.trim()) {
      errs.requirements = 'Please describe your project or operational requirements.';
    } else if (formData.requirements.trim().length < 15) {
      errs.requirements = 'Please provide at least 15 characters describing your scope.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const generatedId = `ALS-${Math.floor(100000 + Math.random() * 900000)}`;
      const existingInquiries = JSON.parse(localStorage.getItem('als_inquiries') || '[]');
      existingInquiries.push({
        id: generatedId,
        date: new Date().toISOString(),
        ...formData
      });
      localStorage.setItem('als_inquiries', JSON.stringify(existingInquiries));

      setSubmissionResult({
        success: true,
        referenceId: generatedId,
        message: 'Inquiry received. A senior engineer will review your requirements and reach out within one business day.'
      });
    } catch {
      setSubmissionResult({
        success: false,
        message: 'Network issue. Please contact contact@alsinfonet.com directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      serviceInterest: 'Custom Software Development',
      requirements: ''
    });
    setSubmissionResult(null);
    setErrors({});
  };

  return (
    <section id="contact" className="relative bg-[#E50914] text-black py-20 sm:py-28 px-6 sm:px-8 border-t border-black/20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-black/20 mb-14 sm:mb-20">
          <div>
            <span className="text-[11px] font-mono-tech tracking-[0.2em] uppercase text-black/80 block mb-2 font-bold">
              05 / Contact
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight">
              Have a project in mind? Let's talk.
            </h2>
          </div>
          <div className="text-xs font-mono-tech font-bold text-black/80">
            CHENNAI &amp; BANGALORE: {currentTimeIST || '14:30:00 IST'}
          </div>
        </div>

        {/* Two-Column Form & Locations Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#0B0B0B] border border-black p-8 sm:p-10 shadow-2xl">
            {submissionResult?.success ? (
              <div className="py-6 space-y-6">
                <div className="w-10 h-10 bg-[#E50914] text-white flex items-center justify-center">
                  <Check size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono-tech font-bold text-[#E50914] uppercase tracking-wider block mb-1">
                    INQUIRY REGISTERED // {submissionResult.referenceId}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Thank you for reaching out.
                  </h3>
                  <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                    {submissionResult.message}
                  </p>
                </div>
                <div className="p-4 bg-[#141414] border border-neutral-800 text-xs font-mono-tech text-neutral-300 space-y-1">
                  <div>NAME: {formData.name}</div>
                  <div>EMAIL: {formData.email}</div>
                  <div>FOCUS: {formData.serviceInterest}</div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-[#E50914] text-white text-xs font-mono-tech font-bold uppercase tracking-wider hover:bg-[#C40810] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name-input" className="block text-[11px] font-mono-tech font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Name *
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#161616] border ${
                        errors.name ? 'border-red-500' : 'border-neutral-700'
                      } text-white focus:outline-none focus:border-[#E50914] transition-colors`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400 font-mono-tech">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email-input" className="block text-[11px] font-mono-tech font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#161616] border ${
                        errors.email ? 'border-red-500' : 'border-neutral-700'
                      } text-white focus:outline-none focus:border-[#E50914] transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 font-mono-tech">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company-input" className="block text-[11px] font-mono-tech font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    id="company-input"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#161616] border border-neutral-700 text-white focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>

                {/* Focus */}
                <div>
                  <label htmlFor="focus-input" className="block text-[11px] font-mono-tech font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Service Area
                  </label>
                  <select
                    id="focus-input"
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#161616] border border-neutral-700 text-white focus:outline-none focus:border-[#E50914] transition-colors cursor-pointer"
                  >
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Web Application Development">Web Application Development</option>
                    <option value="AI Integration & Automation">AI Integration &amp; Automation</option>
                    <option value="Mobile Application Development">Mobile Application Development</option>
                    <option value="Software Integration">Software Integration</option>
                    <option value="Digital Product Development">Digital Product Development</option>
                  </select>
                </div>

                {/* Requirements */}
                <div>
                  <label htmlFor="req-input" className="block text-[11px] font-mono-tech font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Project Requirements *
                  </label>
                  <textarea
                    id="req-input"
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Tell us what you're planning or the challenges you're looking to solve..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#161616] border ${
                      errors.requirements ? 'border-red-500' : 'border-neutral-700'
                    } text-white focus:outline-none focus:border-[#E50914] transition-colors resize-y`}
                  />
                  {errors.requirements && (
                    <p className="mt-1 text-xs text-red-400 font-mono-tech">{errors.requirements}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#E50914] hover:bg-[#C40810] text-white text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Discuss a Project</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Locations & Contact Info */}
          <div className="lg:col-span-5 space-y-8 pt-2">
            <div>
              <span className="text-[11px] font-mono-tech tracking-widest uppercase text-black font-bold block mb-2">
                Chennai
              </span>
              <div className="space-y-1.5">
                <a
                  href="tel:+919894051733"
                  className="inline-flex items-center gap-2 text-base font-mono-tech font-bold text-black hover:underline"
                >
                  <Phone size={14} className="shrink-0" />
                  <span>+91 98940 51733</span>
                </a>
                <div className="text-xs font-mono-tech text-black/75">
                  chennai@alsinfonet.com
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/20">
              <span className="text-[11px] font-mono-tech tracking-widest uppercase text-black font-bold block mb-2">
                Bangalore
              </span>
              <div className="space-y-1.5">
                <a
                  href="tel:+918073888324"
                  className="inline-flex items-center gap-2 text-base font-mono-tech font-bold text-black hover:underline"
                >
                  <Phone size={14} className="shrink-0" />
                  <span>+91 80738 88324</span>
                </a>
                <div className="text-xs font-mono-tech text-black/75">
                  bangalore@alsinfonet.com
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/20">
              <span className="text-[11px] font-mono-tech tracking-widest uppercase text-black font-bold block mb-2">
                Direct Contact
              </span>
              <div className="space-y-2">
                <div className="flex flex-col gap-1 text-sm font-mono-tech font-bold text-black">
                  <a href="tel:+919894051733" className="hover:underline flex items-center gap-2">
                    <Phone size={13} className="shrink-0" />
                    <span>+91 98940 51733</span>
                  </a>
                  <a href="tel:+918073888324" className="hover:underline flex items-center gap-2">
                    <Phone size={13} className="shrink-0" />
                    <span>+91 80738 88324</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/20">
              <span className="text-[11px] font-mono-tech tracking-widest uppercase text-black font-bold block mb-2">
                General Inquiries
              </span>
              <a
                href="mailto:contact@alsinfonet.com"
                className="inline-flex items-center gap-2 text-base font-mono-tech font-bold text-black underline hover:opacity-75 transition-opacity"
              >
                <Mail size={14} className="shrink-0" />
                <span>contact@alsinfonet.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
