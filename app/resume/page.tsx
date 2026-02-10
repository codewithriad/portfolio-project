"use client";

import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

const Resume = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 print:bg-white print:py-0">
            <div className="container mx-auto max-w-[210mm] bg-white shadow-2xl print:shadow-none print:max-w-none print:w-full">

                {/* Print Controls - Hidden when printing */}
                <div className="flex justify-between items-center p-4 bg-gray-800 text-white print:hidden rounded-t-lg">
                    <Link href="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to Portfolio
                    </Link>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Print / Save as PDF
                    </button>
                </div>

                <div className="flex flex-col md:flex-row print:flex-row min-h-[297mm]">

                    {/* LEFT SIDEBAR */}
                    <aside className="w-full md:w-[35%] print:w-[35%] bg-slate-900 text-white p-8 print:p-6 flex flex-col gap-8 print:h-full">
                        {/* Profile Image */}
                        <div className="flex justify-center">
                            <div className="relative w-48 h-48 rounded-full border-4 border-white/20 overflow-hidden shadow-xl">
                                <Image
                                    src="/riyad/s1.png"
                                    alt="Md. Riyad Khan"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-blue-400 uppercase tracking-widest text-sm font-bold border-b border-white/10 pb-2">Contact</h3>

                            <div className="space-y-3 text-sm text-gray-300">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    <a href="mailto:info@riyadkhan.dev" className="hover:text-white transition-colors">info@riyadkhan.dev</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <a href="tel:+8801617852183" className="hover:text-white transition-colors">+880 1617 852183</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <span>Miami, Florida</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    <a href="https://github.com/YourUsername" target="_blank" className="hover:text-white transition-colors">github.com/codewithriyad</a>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-4">
                            <h3 className="text-blue-400 uppercase tracking-widest text-sm font-bold border-b border-white/10 pb-2">Education</h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-white font-bold">B.Sc. in Computer Science</h4>
                                    <p className="text-gray-400 text-sm">University of Technology</p>
                                    <p className="text-blue-400 text-xs mt-1">2014 - 2018</p>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-4">
                            <h3 className="text-blue-400 uppercase tracking-widest text-sm font-bold border-b border-white/10 pb-2">Skills</h3>

                            <div className="flex flex-wrap gap-2">
                                {["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "AI Integration", "Vue.js", "Nuxt", "UI/UX Design", "Figma"].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-xs text-blue-100 border border-white/5">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="space-y-4 mt-auto">
                            <h3 className="text-blue-400 uppercase tracking-widest text-sm font-bold border-b border-white/10 pb-2">Languages</h3>
                            <ul className="text-sm text-gray-300 space-y-2">
                                <li className="flex justify-between"><span>English</span> <span className="text-blue-400">Native</span></li>
                                <li className="flex justify-between"><span>Spanish</span> <span className="text-gray-500">Basic</span></li>
                            </ul>
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <main className="w-full md:w-[65%] print:w-[65%] bg-white p-8 md:p-12 print:p-8 text-gray-800">
                        {/* Header */}
                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Md. Riyad <span className="text-blue-600">Khan</span></h1>
                            <p className="text-xl text-gray-500 font-medium tracking-wide">Web Developer</p>
                        </div>

                        {/* Summary */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-blue-100 pb-2 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Profile
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Passionate web developer with a strong foundation in building modern, responsive, and user-friendly websites. Specializing in creating seamless digital experiences by combining clean code with creative design. Experienced in working with cross-functional teams to deliver high-quality software solutions.
                            </p>
                        </div>

                        {/* Experience */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-blue-100 pb-2 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Experience
                            </h2>

                            <div className="space-y-8">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="relative pl-4 border-l-2 border-gray-100">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-100"></div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                                            <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                                            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{exp.period}</span>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-500 mb-2">{exp.company} <span className="text-gray-300">•</span> {exp.duration}</div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Projects */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-blue-100 pb-2 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span> Key Projects
                            </h2>

                            <div className="grid grid-cols-1 gap-4">
                                {projects.slice(0, 3).map((project) => (
                                    <div key={project.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-slate-800">{project.title}</h3>
                                            <a href={project.liveUrl} target="_blank" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                                View Live <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                            </a>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.slice(0, 4).map(tech => (
                                                <span key={tech} className="text-[10px] px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default Resume;
