"use client";

import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";
import Image from "next/image";

const QuoteIcon = () => (
    <svg className="w-10 h-10 text-blue-500/20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
);

const Testimonials = () => {
    return (
        <section id="testimonials" className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
                        What my colleagues say
                    </h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Trusted by teams and leaders across the industry
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Glassmorphism Card */}
                            <div className="relative h-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-blue-500/20">
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Quote Icon */}
                                <div className="mb-6">
                                    <QuoteIcon />
                                </div>

                                {/* Quote Text */}
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 relative z-10">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author Section */}
                                <div className="flex items-center justify-between gap-4 relative z-10">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar with Gradient Ring */}
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.author}
                                                    fill
                                                    className="object-cover"
                                                    sizes="56px"
                                                />
                                            </div>
                                        </div>

                                        {/* Author Info */}
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                                            <p className="text-sm text-gray-600">{testimonial.title}</p>
                                        </div>
                                    </div>

                                    {/* LinkedIn Link */}
                                    <a
                                        href={testimonial.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-shrink-0 p-3 rounded-full bg-blue-500/10 hover:bg-blue-500 text-blue-600 hover:text-white transition-all duration-300 hover:scale-110 group/link"
                                        aria-label="View on LinkedIn"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
