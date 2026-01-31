import { articles } from "@/data/articles";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: `${article.title} - Roy Jones`,
        description: article.excerpt,
    };
}

export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    // Get related articles (exclude current)
    const relatedArticles = articles
        .filter((a) => a.id !== article.id)
        .slice(0, 3);

    return (
        <main className="min-h-screen pt-24 pb-20">
            <div className="container-custom">
                {/* Back Button */}
                <Link
                    href="/#articles"
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
                    Back to articles
                </Link>

                {/* Article Header */}
                <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-sm text-secondary mb-4">{article.date}</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                        {article.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary">
                        {article.excerpt}
                    </p>
                </div>

                {/* Feature Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 max-w-5xl mx-auto">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-4xl mx-auto">
                    <p className="lead">
                        {article.excerpt} In this article, we&apos;ll explore the key concepts
                        and practical applications that can help you level up your design
                        practice.
                    </p>

                    <h2>Introduction</h2>
                    <p>
                        The landscape of design is constantly evolving, and staying ahead
                        requires continuous learning and adaptation. This article dives deep
                        into the topic, providing actionable insights and real-world examples.
                    </p>

                    <h2>Key Takeaways</h2>
                    <ul>
                        <li>
                            Understanding the fundamental principles that drive effective design
                            decisions
                        </li>
                        <li>
                            Practical techniques you can implement immediately in your workflow
                        </li>
                        <li>
                            Common pitfalls to avoid and how to overcome them
                        </li>
                        <li>
                            Future trends and how to prepare for what&apos;s coming next
                        </li>
                    </ul>

                    <h2>Deep Dive</h2>
                    <p>
                        Let&apos;s explore each of these concepts in detail, examining how they
                        apply to modern design practice and what you can do to incorporate
                        them into your work.
                    </p>

                    <h3>Principle 1: User-Centered Thinking</h3>
                    <p>
                        At the core of great design is a deep understanding of user needs.
                        This goes beyond surface-level research and requires empathy,
                        observation, and continuous iteration.
                    </p>

                    <h3>Principle 2: Systematic Approach</h3>
                    <p>
                        Building scalable design systems ensures consistency and efficiency
                        across your products. Learn how to create and maintain systems that
                        grow with your organization.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        By applying these principles and techniques, you&apos;ll be better
                        equipped to create designs that not only look great but also solve
                        real problems for real people. Remember, great design is an ongoing
                        journey of learning and refinement.
                    </p>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-20 max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map((relatedArticle) => (
                                <Link
                                    key={relatedArticle.id}
                                    href={`/articles/${relatedArticle.slug}`}
                                    className="group"
                                >
                                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                                        <Image
                                            src={relatedArticle.image}
                                            alt={relatedArticle.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <p className="text-sm text-secondary mb-2">
                                        {relatedArticle.date}
                                    </p>
                                    <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                                        {relatedArticle.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
