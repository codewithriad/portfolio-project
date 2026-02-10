"use client";
import { projects } from "@/data/projects";
import HorizontalGallery from "./HorizontalGallery";

const SelectedWork = () => {
    return (
        <section id="selected-work" className="bg-white">
            {/* Section Header */}
            <div className="container-custom py-8 md:py-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                        Selected work
                    </h2>
                    <span className="text-sm md:text-base text-secondary font-medium">
                        2022 - 2025
                    </span>
                </div>
                <p className="text-base md:text-lg text-secondary max-w-2xl">
                    Scroll down to explore my projects horizontally
                </p>
            </div>

            {/* Horizontal Gallery */}
            <HorizontalGallery projects={projects} />
        </section>
    );
};

export default SelectedWork;
