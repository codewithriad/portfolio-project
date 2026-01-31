"use client";

import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";
import Image from "next/image";

const Testimonials = () => {
    return (
        <section id="testimonials" className="section-padding bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                        What my colleagues say
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                        >
                            {/* Quote */}
                            <p className="text-base md:text-lg text-primary italic mb-6 leading-relaxed">
                                &quot;{testimonial.quote}&quot;
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-primary">{testimonial.author}</p>
                                    <p className="text-sm text-secondary">{testimonial.title}</p>
                                </div>
                            </div>

                            {/* LinkedIn Link */}
                            <a
                                href={testimonial.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
                            >
                                Read on LinkedIn
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
