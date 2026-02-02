"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/10 backdrop-blur-md border-b border-white/10 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo - Left Side */}
                    <Link
                        href="/"
                        className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity z-50 relative"
                    >
                        <Image
                            src="/logo.png"
                            alt="Riyad"
                            width={220}
                            height={60}
                            priority
                            className="h-14 md:h-16 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="group relative text-sm font-medium text-secondary hover:text-gold transition-colors py-1"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Contact Button - Right Side */}
                    <div className="hidden md:flex items-center flex-shrink-0">
                        <a
                            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@riyadkhan.dev"}`}
                            className="px-6 py-2.5 bg-accent text-white rounded-full hover:bg-gold hover:text-white transition-all hover:scale-105 shadow-md"
                        >
                            Let&apos;s connect
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-primary hover:text-gold transition-colors z-50 relative"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col items-end gap-1.5">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current block transition-transform"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-4 h-0.5 bg-current block transition-opacity"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -8, width: "100%" } : { rotate: 0, y: 0, width: "75%" }}
                                className="h-0.5 bg-current block transition-transform"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Modern Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center items-center"
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
                                    className="text-3xl font-bold text-primary hover:text-gold transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-1 left-0 w-0 h-1 bg-gold transition-all duration-300 group-hover:w-full opacity-50" />
                                </motion.a>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="pt-8 w-full flex flex-col items-center gap-6 border-t border-gray-100 mt-8"
                            >
                                <p className="text-secondary text-sm uppercase tracking-widest">Get in touch</p>
                                <a
                                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@riyadkhan.dev"}`}
                                    className="px-8 py-3 bg-accent text-white text-lg rounded-full hover:bg-gold transition-all w-full text-center shadow-lg"
                                >
                                    Let&apos;s connect
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navigation;
