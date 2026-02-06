import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} - Roy Jones`,
        description: project.description,
    };
}

export default async function WorkDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Back Navigation */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container-custom h-20 flex items-center">
                    <Link
                        href="/#selected-work"
                        className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors group"
                    >
                        <svg
                            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Back to projects</span>
                    </Link>
                </div>
            </div>

            <div className="container-custom pt-32 pb-20">
                {/* Header Section */}
                <div className="max-w-5xl mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-8 leading-tight text-balance">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary max-w-3xl leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Hero Image */}
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-20 shadow-2xl shadow-gray-200/50">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="90vw"
                    />
                </div>

                {/* Project Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
                    {/* Left Sidebar - Details */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Live Link */}
                        {project.liveUrl && (
                            <div>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full px-8 py-4 bg-primary text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20"
                                >
                                    Visit Website
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        )}

                        <div className="p-8 bg-gray-50 rounded-3xl space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies?.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-white border border-gray-100 rounded-full text-sm text-secondary font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Purpose</h3>
                                <p className="text-secondary leading-relaxed">
                                    {project.purpose}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Overview */}
                    <div className="lg:col-span-8 prose prose-lg prose-gray max-w-none">
                        <h2 className="text-3xl font-bold text-primary mb-6">Project Overview</h2>
                        <p className="text-secondary text-lg leading-relaxed mb-8">
                            {project.description} This project represents a significant step forward in {project.purpose.toLowerCase()}.
                            We focused on creating a seamless user experience that addresses the core needs of the target audience.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Key Challenges & Solutions</h3>
                        <p className="text-secondary text-lg leading-relaxed mb-8">
                            One of the main challenges was interpreting complex requirements and translating them into an intuitive interface.
                            By leveraging {project.technologies?.[0] || "modern technologies"} and adopting a component-driven architecture,
                            we were able to build a scalable and maintainable solution.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
                            {[1, 2].map((i) => (
                                <div key={i} className="aspect-4/3 relative rounded-2xl overflow-hidden bg-gray-100">
                                    {/* Placeholder for additional project shots - using main image for now */}
                                    <Image
                                        src={project.image}
                                        alt="Project Screenshot"
                                        fill
                                        className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>

                        <h3 className="text-2xl font-bold text-primary mb-4">Outcome</h3>
                        <p className="text-secondary text-lg leading-relaxed">
                            The final product successfully meets all initial requirements and has received positive feedback for its
                            performance and user-centric design. It stands as a testament to the power of modern web technologies
                            combined with thoughtful design.
                        </p>
                    </div>
                </div>

                {/* Next Project CTA */}
                <div className="border-t border-gray-100 pt-20 mt-20 text-center">
                    <p className="text-secondary mb-6">Ready to see more?</p>
                    <Link
                        href="/#selected-work"
                        className="inline-block px-10 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all font-medium text-lg"
                    >
                        View More Projects
                    </Link>
                </div>
            </div>
        </main>
    );
}
