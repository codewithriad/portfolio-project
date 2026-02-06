"use client";

import { motion, useInView } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { countries, getCountryFromTimezone, type Country } from "../utils/countryData";
import { validateForm, type ContactFormData, type FormErrors } from "../utils/formUtils";

// --- Icons (Clean White) ---
const PhoneIcon = memo(() => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
));

const MailIcon = memo(() => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
));

const MapPinIcon = memo(() => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
));

const LoaderIcon = memo(() => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
));

const ChevronDownIcon = memo(() => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
));

// --- Components ---

interface InputFieldProps {
    label: string;
    name: keyof ContactFormData;
    type?: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
    // Props for Phone Input logic
    isPhone?: boolean;
    selectedCountry?: Country;
    onCountryChange?: (country: Country) => void;
}

const InputField = memo(({ label, name, type = "text", value, error, onChange, disabled, isPhone, selectedCountry, onCountryChange }: InputFieldProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCountrySelect = (country: Country) => {
        if (onCountryChange) onCountryChange(country);
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex flex-col gap-1.5 w-full relative">
            {name === "message" ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full bg-[#111827] border ${error ? "border-red-500/50" : "border-gray-800 focus:border-blue-500"
                        } rounded-lg px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 resize-none h-32 text-sm`}
                    placeholder={label}
                />
            ) : (
                <div className="relative flex">
                    {/* Country Code Dropdown Trigger */}
                    {isPhone && selectedCountry && (
                        <div className="relative mr-2" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
                                className={`h-full flex items-center gap-1.5 bg-[#111827] border ${error ? "border-red-500/50" : "border-gray-800 focus:border-blue-500"} rounded-lg px-3 text-white transition-all duration-300 outline-none focus:ring-1 focus:ring-blue-500/50`}
                            >
                                <span className="text-xl">{selectedCountry.flag}</span>
                                <span className="text-xs text-gray-400 min-w-[34px]">{selectedCountry.dialCode}</span>
                                <span className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                    <ChevronDownIcon />
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-[#1a2333] border border-gray-700 rounded-lg shadow-xl z-50">
                                    <div className="p-1">
                                        {countries.map((country) => (
                                            <button
                                                key={country.code}
                                                type="button"
                                                onClick={() => handleCountrySelect(country)}
                                                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-white/5 rounded-md text-left transition-colors"
                                            >
                                                <span className="text-xl">{country.flag}</span>
                                                <span className="text-gray-200 text-sm flex-1">{country.name}</span>
                                                <span className="text-gray-500 text-xs">{country.dialCode}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        className={`w-full bg-[#111827] border ${error ? "border-red-500/50" : "border-gray-800 focus:border-blue-500"
                            } rounded-lg px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 text-sm`}
                        placeholder={isPhone ? "123 456 7890" : label}
                    />
                </div>
            )}
            {error && (
                <span className="text-red-400 text-xs ml-1 flex items-center gap-1">
                    {error}
                </span>
            )}
        </div>
    );
});

const ContactInfoItem = memo(({ icon: Icon, title, content, href }: { icon: any; title: string; content: string; href?: string }) => (
    <div className="flex items-start gap-4 group">
        <div className="shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <Icon />
            </div>
        </div>
        <div>
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{title}</h4>
            {href ? (
                <a href={href} className="text-white hover:text-blue-400 transition-colors text-base font-medium block">
                    {content}
                </a>
            ) : (
                <p className="text-white text-base font-medium leading-relaxed max-w-[250px]">{content}</p>
            )}
        </div>
    </div>
));

const Contact = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    // Country state
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
    const [hasUserChangedPhone, setHasUserChangedPhone] = useState(false);

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Auto-detect country on mount
    useEffect(() => {
        const detected = getCountryFromTimezone();
        if (detected) {
            setSelectedCountry(detected);
            // Optional: Pre-fill phone with code if not modified
            // setFormData(prev => ({ ...prev, phone: detected.dialCode + " " })); 
            // Actually, usually better NOT to force value into input to keep it clean, 
            // but user asked for "auto update".
            // Let's just prefix it visually and auto-append on submit or just update state.
            // Strategy: The input holds the NUMBER. The dropdown holds the CODE. 
            // When submitting, we combine them. OR we just update the input value.
            // Simple approach: When country changes, update the phone field to start with code.
            setFormData(prev => {
                if (!prev.phone) return { ...prev, phone: detected.dialCode + " " };
                return prev;
            });
        }
    }, []);

    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        // Replace old code with new code in phone input if it exists
        setFormData(prev => {
            // Simple regex to replace the start +digits if matched, or just prepend
            // Logic: If input starts with a known code, replace it. Else prepend.
            let newPhone = prev.phone;
            const currentCode = selectedCountry.dialCode;
            const nextCode = country.dialCode;

            if (newPhone.trim().startsWith("+")) {
                // Try to replace existing code
                // This is tricky without strict parsing, but we can try to simplistic replace
                // if it starts with the OLD selected country code.
                if (newPhone.startsWith(currentCode)) {
                    newPhone = newPhone.replace(currentCode, nextCode);
                } else {
                    // Just prepend if it looks like a raw number (but we checked startsWith +)
                    // If it starts with + but not our code, maybe user typed it manually. 
                    // Let's just reset to new code
                    newPhone = nextCode + " ";
                }
            } else {
                newPhone = nextCode + " " + newPhone.trim();
            }
            return { ...prev, phone: newPhone };
        });
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // If user is editing phone number, try to detect country code
        if (name === "phone") {
            setHasUserChangedPhone(true);

            // Check if value starts with a known dial code
            const trimmedValue = value.trim();
            if (trimmedValue.startsWith("+")) {
                // Find the longest matching dial code to be accurate (e.g., +1 vs +1242)
                const matchingCountries = countries
                    .filter(c => trimmedValue.startsWith(c.dialCode))
                    .sort((a, b) => b.dialCode.length - a.dialCode.length);

                if (matchingCountries.length > 0) {
                    const bestMatch = matchingCountries[0];
                    if (bestMatch.code !== selectedCountry.code) {
                        setSelectedCountry(bestMatch);
                    }
                }
            }
        }

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }, [errors, selectedCountry.code]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus("submitting");

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setStatus("success");
            // Reset form but keep country code
            setFormData({ name: "", phone: selectedCountry.dialCode + " ", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="py-24 bg-[#010A10] relative overflow-hidden"
        >
            <div className="container-custom relative z-10">
                {/* Dark Card Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-primary rounded-4xl overflow-hidden relative shadow-2xl"
                >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 via-transparent to-transparent pointer-events-none" />

                    <div className="grid lg:grid-cols-12 md:gap-12 gap-12 p-8 md:p-12 lg:p-16 relative z-10">

                        {/* Left Column: Info (5Cols) */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
                            <div className="space-y-6">
                                {/* Decorative Blur Spot */}
                                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] pointer-events-none"></div>

                                <motion.h2
                                    className="text-4xl md:text-5xl font-bold text-white leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 }}
                                >
                                    Get Ready To <br />
                                    Create Great
                                </motion.h2>

                                <motion.p
                                    className="text-gray-400 max-w-sm"
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.3 }}
                                >
                                    Let's collaborate on your next big idea. I'm here to bring your vision to life.
                                </motion.p>
                            </div>

                            <motion.div
                                className="space-y-8"
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.4 }}
                            >
                                <ContactInfoItem
                                    icon={MailIcon}
                                    title="E-mail:"
                                    content="info@riyadkhan.dev"
                                    href="mailto:info@riyadkhan.dev"
                                />
                                <ContactInfoItem
                                    icon={MapPinIcon}
                                    title="Location:"
                                    content="8200 Barisal, Bangladesh"
                                />
                                <ContactInfoItem
                                    icon={PhoneIcon}
                                    title="Contact:"
                                    content="+8801617852183"
                                    href="tel:+8801617852183"
                                />
                            </motion.div>
                        </div>

                        {/* Right Column: Form (7Cols) */}
                        <div className="lg:col-span-7">
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">GET IN TOUCH</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <InputField
                                        label="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                        disabled={status === "submitting"}
                                    />
                                    <InputField
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={errors.phone}
                                        disabled={status === "submitting"}
                                        isPhone={true}
                                        selectedCountry={selectedCountry}
                                        onCountryChange={handleCountryChange}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <InputField
                                        label="Your Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        disabled={status === "submitting"}
                                    />
                                    <InputField
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        error={errors.subject}
                                        disabled={status === "submitting"}
                                    />
                                </div>

                                <InputField
                                    label="Your Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    error={errors.message}
                                    disabled={status === "submitting"}
                                />

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className={`
                       w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform flex items-center justify-center gap-2
                       ${status === "submitting" ? "bg-gray-700 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"}
                     `}
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <LoaderIcon />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Appointment Now
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Success Feedback */}
                                {status === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="bg-green-500/10 text-green-400 p-3 rounded-lg text-center text-sm"
                                    >
                                        Message sent successfully!
                                    </motion.div>
                                )}
                            </form>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
