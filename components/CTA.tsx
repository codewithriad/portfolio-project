const CTA = () => {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/cta-background.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto">
                    Let&apos;s create something great together.
                </h2>

                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                    I&apos;m not just here to design products; I&apos;m here to connect with
                    people.
                </p>

                <a
                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@riyadkhan.dev"}`}
                    className="inline-block px-8 py-3.5 bg-white text-primary rounded-full hover:bg-gray-100 transition-all hover:scale-105 font-medium"
                >
                    Let&apos;s talk!
                </a>
            </div>
        </section>
    );
};

export default CTA;
