import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-sky-500/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px]" />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Column 1: Brand & Logo */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block relative w-56 h-28">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className="object-contain object-left invert brightness-0 grayscale-0"
                            /* Assuming image is dark text, invert makes it white. Removed grayscale if color is needed */
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Crafting digital experiences that merge creativity with code.
                            Let's build something extraordinary together.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-green-400">Available for new projects</span>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white/90">Explore</h3>
                        <ul className="space-y-4">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Selected Work", href: "/#selected-work" },
                                { label: "About", href: "/#about" },
                                { label: "Articles", href: "/#articles" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors hover:pl-2 duration-300 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Socials */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white/90">Social Link</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://www.facebook.com/codewithriyad"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all"
                                >
                                    <span className="p-2 bg-white/5 rounded-full group-hover:bg-blue-600 transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Facebook
                                </a>
                            </li>
                            {/* Add LinkedIn or others here if needed later */}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white/90">Contact</h3>
                        <div className="space-y-6">
                            <a href="mailto:info@riyadkhan.dev" className="block group">
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold group-hover:text-primary-400">Email</span>
                                <p className="text-lg text-gray-200 mt-1 group-hover:text-white transition-colors">info@riyadkhan.dev</p>
                            </a>

                            <a href="https://wa.me/8801617852183" target="_blank" rel="noopener noreferrer" className="block group">
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold group-hover:text-green-400">WhatsApp</span>
                                <p className="text-lg text-gray-200 mt-1 group-hover:text-white transition-colors">+880 1617 852183</p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-10" />

                {/* Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© {currentYear} Riyad Khan. All rights reserved.</p>
                    <p>Designed & Built with passion.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
