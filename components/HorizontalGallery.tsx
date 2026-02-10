'use client';

import { Project } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import './HorizontalGallery.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalGalleryProps {
    projects: Project[];
}

const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ projects }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Ensure refs are available
        if (!containerRef.current || !scrollContainerRef.current) return;

        const container = containerRef.current;
        const scrollContainer = scrollContainerRef.current;

        // Calculate the total scroll distance
        // This is the width of the scrollable content minus the viewport width
        const scrollWidth = scrollContainer.scrollWidth - container.offsetWidth;

        // Create the horizontal scroll animation
        // As the user scrolls vertically, the content moves horizontally
        const scrollTween = gsap.to(scrollContainer, {
            x: -scrollWidth, // Move left by the scroll width
            ease: 'none', // Linear movement for smooth scrolling
            scrollTrigger: {
                trigger: container, // Element that triggers the animation
                start: 'center center', // Start when section center hits viewport center
                end: () => `+=${scrollWidth + window.innerHeight}`, // Extended scroll distance
                scrub: 0.5, // Smoother scrubbing (0.5 second delay)
                pin: true, // Pin the container while scrolling
                anticipatePin: 1, // Prevent jump when pinning starts
                invalidateOnRefresh: true, // Recalculate on window resize
            },
        });

        // Cleanup function to kill ScrollTrigger instances
        return () => {
            scrollTween.scrollTrigger?.kill();
            scrollTween.kill();
        };
    }, [projects]); // Re-run if projects change

    // Handle empty projects array
    if (!projects || projects.length === 0) {
        return (
            <div className="w-full py-20 text-center">
                <p>No projects to display</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="horizontal-gallery-wrapper"
            style={{ overflow: 'hidden', position: 'relative', height: '100vh' }}
        >
            <div
                ref={scrollContainerRef}
                className="horizontal-gallery-container"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 'fit-content',
                    height: '100%',
                    alignItems: 'center',
                    willChange: 'transform',
                }}
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="gallery-item group"
                        style={{
                            width: '35vw', // Each image takes 45% of viewport width
                            minWidth: '500px', // Minimum size for smaller screens
                            height: '55vh', // Increased height
                            padding: '0 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <Link
                            href={`/work/${project.slug}`}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '1rem',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                }}
                                className="project-image-container"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                    sizes="35vw"
                                    priority={false}
                                    className="project-image"
                                />
                                {/* Hover overlay with gradient */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                                        opacity: 0,
                                        transition: 'opacity 0.4s ease-in-out',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        padding: '2rem',
                                    }}
                                    className="project-overlay"
                                >
                                    <h3 style={{
                                        color: 'white',
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                        marginBottom: '1rem',
                                        textAlign: 'center',
                                        transform: 'translateY(20px)',
                                        transition: 'transform 0.4s ease-out',
                                    }}>
                                        {project.title}
                                    </h3>
                                    <p style={{
                                        color: 'rgba(255,255,255,0.9)',
                                        fontSize: '1.1rem',
                                        textAlign: 'center',
                                        lineHeight: '1.6',
                                        transform: 'translateY(20px)',
                                        transition: 'transform 0.4s ease-out 0.1s',
                                    }}>
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalGallery;
