"use client";

import { Project } from "@/types";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        gsap: any;
        Observer: any;
        SplitText: any;
    }
}

interface ProjectSliderProps {
    project: Project;
}

export default function ProjectSlider({ project }: ProjectSliderProps) {
    const [isGsapLoaded, setIsGsapLoaded] = useState(false);
    const [isObserverLoaded, setIsObserverLoaded] = useState(false);
    const [isSplitTextLoaded, setIsSplitTextLoaded] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isGsapLoaded || !isObserverLoaded || !isSplitTextLoaded) return;

        const { gsap, Observer, SplitText } = window;

        // Register GSAP plugins
        gsap.registerPlugin(Observer);

        // Get all DOM elements
        const sections = document.querySelectorAll<HTMLElement>(".gsap-section");
        const images = document.querySelectorAll<HTMLElement>(".gsap-section .bg");
        const headings = gsap.utils.toArray(".section-heading");
        const outerWrappers = gsap.utils.toArray(".gsap-section .outer");
        const innerWrappers = gsap.utils.toArray(".gsap-section .inner");

        // Split text for staggered animation
        const splitHeadings = headings.map((heading: any) =>
            new SplitText(heading, {
                type: "chars,words,lines",
                linesClass: "clip-text",
            })
        );

        // State variables
        let currentIndex = -1;
        let wrap = gsap.utils.wrap(0, sections.length);
        let animating = false;

        // Initialize wrapper positions
        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });

        // Main animation function
        function gotoSection(index: number, direction: number) {
            index = wrap(index);

            if (animating) return;
            animating = true;

            const fromTop = direction === -1;
            const dFactor = fromTop ? -1 : 1;

            const tl = gsap.timeline({
                defaults: { duration: 1.25, ease: "power1.inOut" },
                onComplete: () => {
                    animating = false;
                },
            });

            // Hide previous section
            if (currentIndex >= 0) {
                gsap.set(sections[currentIndex], { zIndex: 0 });
                tl.to(images[currentIndex], { yPercent: -15 * dFactor }, 0).set(
                    sections[currentIndex],
                    { autoAlpha: 0 },
                    0.3
                );
            }

            // Show new section
            gsap.set(sections[index], { autoAlpha: 1, zIndex: 10 });

            // Animate wrappers (main entrance animation)
            tl.fromTo(
                [outerWrappers[index], innerWrappers[index]],
                { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
                { yPercent: 0 },
                0
            );

            // Animate background image
            tl.fromTo(
                images[index],
                { yPercent: 15 * dFactor },
                { yPercent: 0 },
                0
            );

            // Animate heading characters (staggered)
            const currentSplit = splitHeadings[index];
            if (currentSplit && currentSplit.chars) {
                tl.fromTo(
                    currentSplit.chars,
                    {
                        autoAlpha: 0,
                        yPercent: 150 * dFactor,
                    },
                    {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 1,
                        ease: "power2",
                        stagger: {
                            each: 0.02,
                            from: "random",
                        },
                    },
                    0.2
                );
            }

            currentIndex = index;
        }

        // Create scroll observer
        Observer.create({
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => !animating && gotoSection(currentIndex - 1, -1),
            onUp: () => !animating && gotoSection(currentIndex + 1, 1),
            tolerance: 10,
            preventDefault: true,
        });

        // Initialize at first section
        gotoSection(0, 1);

        return () => {
            // Cleanup if necessary (Observer usually cleans up nicely but good practice)
            Observer.getAll().forEach((o: any) => o.kill());
        };
    }, [isGsapLoaded, isObserverLoaded, isSplitTextLoaded]);

    return (
        <>
            <Script
                src="https://assets.codepen.io/16327/gsap-latest-beta.min.js"
                onLoad={() => setIsGsapLoaded(true)}
            />
            <Script
                src="https://assets.codepen.io/16327/Observer.min.js"
                onLoad={() => setIsObserverLoaded(true)}
            />
            <Script
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/SplitText3.min.js"
                onLoad={() => setIsSplitTextLoaded(true)}
            />

            <style jsx global>{`
        /* ===== RESET & BASE ===== */
        .project-slider-wrapper * {
          box-sizing: border-box;
          user-select: none;
        }

        .project-slider-wrapper {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #000;
          color: #fff;
          font-family: 'Arial', sans-serif;
        }

        /* ===== HEADER ===== */
        .gsap-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          z-index: 999;
          background: rgba(0, 0, 0, 0.3);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .gsap-header a {
          color: #fff;
          text-decoration: none;
          transition: opacity 0.3s;
        }

        .gsap-header a:hover {
          opacity: 0.7;
        }

        /* ===== SECTIONS ===== */
        .gsap-section {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          visibility: hidden;
          z-index: 1;
        }

        .gsap-section.active {
          visibility: visible;
          z-index: 10;
        }

        /* Outer & Inner Wrappers */
        .gsap-section .outer,
        .gsap-section .inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Background Container */
        .gsap-section .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Dark Overlay */
        .gsap-section .bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.2)
          );
          z-index: 2;
        }

        /* Heading */
        .section-heading {
          font-size: clamp(2rem, 8vw, 6rem);
          font-weight: 700;
          line-height: 1.2;
          text-align: center;
          max-width: 90%;
          position: relative;
          z-index: 3;
          margin: 0;
          letter-spacing: -2px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .section-heading * {
          will-change: transform;
          display: inline-block;
        }

        .clip-text {
          overflow: hidden;
          display: inline-block;
        }

        /* Custom Content Styling in BG */
        .content-container {
             z-index: 10;
             text-align: center;
             max-width: 1200px;
             padding: 20px;
        }
        
        .tech-tag {
            display: inline-block;
            padding: 8px 16px;
            margin: 5px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 999px;
            font-size: 1rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .gsap-header {
            height: 60px;
            font-size: 12px;
          }

          .section-heading {
            font-size: clamp(1.5rem, 6vw, 3rem);
          }
        }
      `}</style>

            <div className="project-slider-wrapper">
                <header className="gsap-header">
                    <div className="header-left">{project.title}</div>
                    <div className="header-right">
                        <Link href="/#selected-work">Back to Projects</Link>
                    </div>
                </header>

                {/* Section 1: Title & Main Image */}
                <section className="gsap-section section-1">
                    <div className="outer">
                        <div className="inner">
                            <div
                                className="bg"
                                style={{ backgroundImage: `url('${project.image}')` }}
                            >
                                <div className="content-container">
                                    <h2 className="section-heading">{project.title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Description */}
                <section className="gsap-section section-2">
                    <div className="outer">
                        <div className="inner">
                            <div
                                className="bg"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1200&fit=crop')",
                                }}
                            >
                                <div className="content-container">
                                    <h2 className="section-heading">{project.description}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Purpose */}
                <section className="gsap-section section-3">
                    <div className="outer">
                        <div className="inner">
                            <div
                                className="bg"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=1200&fit=crop')",
                                }}
                            >
                                <div className="content-container">
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>Purpose</h3>
                                    <h2 className="section-heading">{project.purpose}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Technologies */}
                <section className="gsap-section section-4">
                    <div className="outer">
                        <div className="inner">
                            <div
                                className="bg"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1200&h=1200&fit=crop')",
                                }}
                            >
                                <div className="content-container">
                                    <h2 className="section-heading" style={{ marginBottom: '2rem' }}>Technologies</h2>
                                    <div>
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: CTA / Link */}
                <section className="gsap-section section-5">
                    <div className="outer">
                        <div className="inner">
                            <div
                                className="bg"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&h=1200&fit=crop')",
                                }}
                            >
                                <div className="content-container">
                                    {project.liveUrl ? (
                                        <>
                                            <h2 className="section-heading" style={{ marginBottom: '30px' }}>Ready to explore?</h2>
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                                                display: 'inline-block',
                                                padding: '15px 40px',
                                                background: '#fff',
                                                color: '#000',
                                                textDecoration: 'none',
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                borderRadius: '50px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Visit Website
                                            </a>
                                        </>
                                    ) : (
                                        <h2 className="section-heading">Thanks for watching.</h2>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
