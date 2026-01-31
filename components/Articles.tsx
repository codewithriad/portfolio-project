"use client";

import { articles } from "@/data/articles";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Articles = () => {
    const [visibleCount, setVisibleCount] = useState(3);

    const handleLoadMore = () => {
        setVisibleCount(articles.length);
    };

    return (
        <section id="articles" className="section-padding bg-gray-50">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                        Recent articles
                    </h2>
                    <p className="text-lg md:text-xl text-secondary max-w-2xl">
                        I write about the future of design and the life of a product designer.
                    </p>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {articles.slice(0, visibleCount).map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link href={`/articles/${article.slug}`} className="group block">
                                {/* Article Image */}
                                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-gray-100">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Article Content */}
                                <div>
                                    <p className="text-sm text-secondary mb-3">{article.date}</p>

                                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                                        {article.title}
                                    </h3>

                                    <p className="text-base text-secondary line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < articles.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center"
                    >
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-3.5 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all font-medium"
                        >
                            Load more
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Articles;
