"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
    const handleScroll = () => {
        const element = document.querySelector("#selected-work");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative bg-linear-to-br from-gray-50 to-white pt-20"
        >
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-72 h-112 md:w-80 md:h-128 lg:w-96 lg:h-144 shrink-0"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                            <Image
                                src="/riyad/s1.png"
                                alt="Md. Riyad Khan"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                            />
                        </div>
                    </motion.div>

                    {/* Hero Content */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="mb-4">
                                <span className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full text-sm font-medium text-secondary">
                                    📍 Bangladesh
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                                Md. Riyad Khan
                            </h1>

                            <p className="text-xl md:text-2xl text-secondary mb-8 max-w-2xl">
                                I am a passionate web developer with a strong foundation in building modern, responsive, and user-friendly websites. I specialize in creating seamless digital experiences by combining clean code with creative design.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <a
                                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[EMAIL_ADDRESS]"}`}
                                    className="px-8 py-3.5 bg-accent text-white rounded-full hover:bg-accent-hover transition-all hover:scale-105 font-medium"
                                >
                                    Let&apos;s talk!
                                </a>
                                <a
                                    href="#selected-work"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleScroll();
                                    }}
                                    className="px-8 py-3.5 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all font-medium"
                                >
                                    View Work
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    onClick={handleScroll}
                >
                    <div className="flex flex-col items-center gap-2 text-secondary hover:text-primary transition-colors">
                        <span className="text-sm font-medium">Scroll to explore</span>
                        <motion.svg
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </motion.svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
