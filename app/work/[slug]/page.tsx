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
        <main className="min-h-screen pt-24 pb-20">
            <div className="container-custom">
                {/* Back Button */}
                <Link
                    href="/#selected-work"
                    className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8"
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
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to work
                </Link>

                {/* Project Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary max-w-3xl">
                        {project.description}
                    </p>
                </div>

                {/* Project Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                </div>

                {/* Project Content */}
                <div className="prose prose-lg max-w-4xl mx-auto">
                    <h2>Project Overview</h2>
                    <p>
                        This project focused on {project.description.toLowerCase()}. Through
                        extensive user research and iterative design processes, we created a
                        solution that significantly improved user satisfaction and engagement
                        metrics.
                    </p>

                    <h3>Challenge</h3>
                    <p>
                        The main challenge was understanding the diverse needs of our user
                        base while maintaining a cohesive design language. We needed to
                        balance functionality with aesthetics, ensuring that every design
                        decision served a clear purpose.
                    </p>

                    <h3>Solution</h3>
                    <p>
                        We implemented a user-centered design approach, conducting multiple
                        rounds of usability testing and gathering feedback from stakeholders.
                        The final design incorporated modern UI patterns while maintaining
                        accessibility standards.
                    </p>

                    <h3>Results</h3>
                    <ul>
                        <li>40% increase in user engagement</li>
                        <li>25% reduction in task completion time</li>
                        <li>95% positive user feedback</li>
                        <li>Improved accessibility scores across all metrics</li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/#selected-work"
                        className="inline-block px-8 py-3.5 bg-accent text-white rounded-full hover:bg-accent-hover transition-all hover:scale-105 font-medium"
                    >
                        View more projects
                    </Link>
                </div>
            </div>
        </main>
    );
}
