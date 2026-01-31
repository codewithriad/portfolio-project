"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const About = () => {
    const [expandedId, setExpandedId] = useState<string | null>("1");

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
                            Computer scientist turn designer
                        </h2>

                        <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed">
                            I am a product designer with a background in computer science,
                            blending design intuition with technical problem-solving to create
                            seamless, user-friendly digital experiences.
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
                                <span>Previously worked for Meta</span>
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
                                <span>Based in Los Angeles</span>
                            </div>
                        </div>

                        <a
                            href="/cv.pdf"
                            download
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
                                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download CV
                        </a>
                    </motion.div>
                </div>

                {/* Experience Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8">
                        Experience
                    </h3>

                    <div className="space-y-4">
                        {experiences.map((exp) => (
                            <div
                                key={exp.id}
                                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <button
                                    onClick={() =>
                                        setExpandedId(expandedId === exp.id ? null : exp.id)
                                    }
                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                >
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                            <h4 className="text-lg md:text-xl font-bold text-primary">
                                                {exp.role}
                                            </h4>
                                            <span className="text-sm text-secondary font-medium">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-secondary">
                                            <span className="font-medium">{exp.company}</span>
                                            <span className="text-sm">• {exp.duration}</span>
                                        </div>
                                    </div>

                                    <svg
                                        className={`w-5 h-5 text-secondary transition-transform ml-4 ${expandedId === exp.id ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {expandedId === exp.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-5"
                                    >
                                        <p className="text-secondary leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
