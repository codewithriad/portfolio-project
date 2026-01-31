const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left Side */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <span className="inline-flex items-center px-4 py-2 bg-green-600 rounded-full text-sm font-medium">
                            ✓ Available for work
                        </span>
                        <span className="text-sm opacity-80">📍 Los Angeles</span>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm opacity-80">
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-100 transition-opacity"
                        >
                            Follow on LinkedIn
                        </a>
                        <span className="hidden md:inline">•</span>
                        <p>
                            Made by volt.supply | Built with Next.js
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm opacity-60">
                    <p>© {new Date().getFullYear()} Roy Jones. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
