"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

const SelectedWork = () => {
    const [activeTab, setActiveTab] = useState("All");

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

    // Filter projects based on active tab
    const filteredProjects = activeTab === "All" 
        ? projects 
        : projects.filter(p => p.category === activeTab);

    return (
        <section id="selected-work" className="bg-white">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                        Selected work
                    </h2>
                    <span className="text-sm md:text-base text-secondary font-medium">
                        2022 - 2025
                    </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <p className="text-base md:text-lg text-secondary max-w-2xl">
                        Explore our latest projects showcasing our expertise
                    </p>
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                                    activeTab === category
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-secondary hover:bg-gray-200"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                            <Link href={`/work/${project.slug}`} className="block w-full h-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        {project.technologies.slice(0, 3).map((tech) => (
                                            <span key={tech} className="bg-white/20 backdrop-blur-sm px-3 py-1 text-xs text-white rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SelectedWork;
