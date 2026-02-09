"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isWhiteSection, setIsWhiteSection] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);

        // Check if we are in the contact section
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            const rect = contactSection.getBoundingClientRect();
            // If the top of the contact section is near the top of the viewport (including nav height)
            // or if we've scrolled past the start of it
            setIsWhiteSection(rect.top <= 100 && rect.bottom >= 100);
        } else {
            setIsWhiteSection(false);
        }
    });

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navLinks = [
        { href: "#hero", label: "Home" },
        { href: "#selected-work", label: "Works" },
        { href: "#about", label: "About" },
        { href: "#testimonials", label: "Testimonials" },
        { href: "#articles", label: "Articles" },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const navHeight = 80; // Approximate nav height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setIsOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center pt-4 md:pt-6"
            >
                <div
                    className={`
                        pointer-events-auto transition-all duration-500 ease-in-out
                        relative flex items-center justify-between
                        
                        /* Layout: Full width minus margins, rounded */
                        w-[calc(100%-2rem)] md:w-4/5 max-w-[1920px] mx-auto
                        h-16 md:h-20
                        px-4 md:px-8
                        rounded-2xl
                        
                        /* Glassmorphism Background ("Proper Background") */
                        backdrop-blur-xl border shadow-lg
                        ${isWhiteSection
                            ? "bg-white/5 border-white/10 shadow-black/20"
                            : "bg-white/80 border-white/40 shadow-sm supports-backdrop-filter:bg-white/60"
                        }
                    `}
                >
                    {/* Logo - Left Side */}
                    <Link
                        href="/"
                        className={`shrink-0 flex items-center hover:opacity-80 transition-opacity relative`}
                        style={{ marginLeft: -8 }} // Reduce margin on mobile as requested
                    >
                        <Image
                            src="/logo.png"
                            alt="Riyad"
                            width={180}
                            height={50}
                            priority
                            className={`
                                h-8 md:h-10 w-auto object-contain transition-all duration-500
                                ${isWhiteSection ? "invert brightness-0 grayscale-0" : ""} 
                            `}
                        />
                    </Link>

                    {/* Desktop Navigation - Center (Unified Bar) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`
                                    relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${isWhiteSection
                                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                                        : "text-gray-600 hover:text-black hover:bg-black/5"
                                    }
                                `}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Contact Button - Desktop */}
                        <div className="hidden md:block">
                            <a
                                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@riyadkhan.dev"}`}
                                className={`
                                    px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border hover:scale-105 active:scale-95
                                    ${isWhiteSection
                                        ? "bg-white text-black border-transparent shadow-lg hover:shadow-xl hover:bg-gray-100"
                                        : "bg-black text-white border-transparent hover:bg-gray-800 shadow-md"
                                    }
                                `}
                            >
                                Let&apos;s connect
                            </a>
                        </div>

                        {/* Mobile Menu Button - Using consistent icons */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`md:hidden p-2 transition-colors z-50 relative`}
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 flex flex-col items-end gap-1.5">
                                <motion.span
                                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                    className={`w-full h-0.5 block transition-all duration-300 ${isWhiteSection || isOpen ? 'bg-white' : 'bg-black'}`}
                                />
                                <motion.span
                                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                    className={`w-4 h-0.5 block transition-all duration-300 ${isWhiteSection || isOpen ? 'bg-white' : 'bg-black'}`}
                                />
                                <motion.span
                                    animate={isOpen ? { rotate: -45, y: -8, width: "100%" } : { rotate: 0, y: 0, width: "75%" }}
                                    className={`h-0.5 block transition-all duration-300 ${isWhiteSection || isOpen ? 'bg-white' : 'bg-black'}`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Modern Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center items-center"
                    >
                        <div className="flex flex-col items-center space-y-8 p-6 w-full max-w-sm mx-auto">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 hover:to-white transition-all relative group"
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="pt-8 w-full flex flex-col items-center gap-6 border-t border-white/10 mt-8"
                            >
                                <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">Get in touch</p>
                                <a
                                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@riyadkhan.dev"}`}
                                    className="px-8 py-4 bg-white text-black text-lg font-semibold rounded-full hover:scale-105 transition-all w-full text-center shadow-lg shadow-white/10"
                                >
                                    Let&apos;s connect
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
