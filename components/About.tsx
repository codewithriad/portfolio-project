"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const About = () => {
    return (
        <section id="about" className="section-padding bg-gray-50">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative aspect-square rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/images/profile-large.jpg"
                            alt="Roy Jones - About"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </motion.div>

                    {/* About Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
                            Md. Riyad Khan
                        </h2>

                        <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed">
                            I am a web developer with a background in computer science,
                            blending design intuition with technical problem-solving to create
                            seamless, user-friendly web applications.
                        </p>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-base md:text-lg text-primary">
                                <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Previously worked for Tapplix</span>
                            </div>
                            <div className="flex items-center gap-3 text-base md:text-lg text-primary">
                                <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Based in Miami, Florida</span>
                            </div>
                        </div>

                        <Link
                            href="/resume"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full hover:bg-accent-hover transition-all hover:scale-105 font-medium w-fit"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Resume
                        </Link>
                    </motion.div>
                </div>

                {/* Experience Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                        Experience
                    </h3>

                    {/* Experience Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Glassmorphism Card */}
                                <div className="relative h-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-blue-500/30">
                                    {/* Gradient Border Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Period Badge */}
                                    <div className="mb-4 relative z-10">
                                        <span className="inline-flex items-center px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm font-semibold">
                                            {exp.period}
                                        </span>
                                    </div>

                                    {/* Role & Company */}
                                    <div className="mb-4 relative z-10">
                                        <h4 className="text-xl md:text-2xl font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors">
                                            {exp.role}
                                        </h4>
                                        <div className="flex items-center gap-2 text-secondary">
                                            <span className="font-semibold">{exp.company}</span>
                                            <span className="text-sm">• {exp.duration}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-base text-gray-600 leading-relaxed relative z-10">
                                        {exp.description}
                                    </p>

                                    {/* Decorative Element */}
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
