"use client";

import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SelectedWork = () => {
    return (
        <section id="selected-work" className="section-padding bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <div className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                                Selected work
                            </h2>
                            <span className="text-sm md:text-base text-secondary font-medium">
                                2022 - 2025
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/work/${project.slug}`}
                                className="group block"
                            >
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-100">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-base md:text-lg text-secondary">
                                    {project.description}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SelectedWork;
