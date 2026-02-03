import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Tapplix Sass Project",
    description: "Tapplix is a Miami Beach-based software development and AI solutions company that believes great technology should move fast and make sense.",
    purpose: "To build a scalable SaaS platform that leverages AI for business automation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "PostgreSQL"],
    image: "/images/projects/tapplix.jpg",
    slug: "tapplix-sass-project",
    liveUrl: "https://tapplix.com",
  },
  {
    id: "2",
    title: "Ebonix Ai Project",
    description: "Ebonix is a Miami Beach-based software development and AI solutions company that believes great technology should move fast and make sense.",
    purpose: "Create an intuitive AI assistant for personal productivity.",
    technologies: ["React", "Python", "FastAPI", "TensorFlow"],
    image: "/images/projects/ebonix.jpg",
    slug: "ebonix-ai-project",
    liveUrl: "https://ebonix.ai",
  },
  {
    id: "3",
    title: "Charity Project",
    description: "Charity is a Miami Beach-based software development and AI solutions company that believes great technology should move fast and make sense.",
    purpose: "A donation platform connecting donors with transparency-focused non-profits.",
    technologies: ["Vue.js", "Nuxt", "Node.js", "Stripe"],
    image: "/images/projects/charity.jpeg",
    slug: "charity-project",
  },
  {
    id: "4",
    title: "Lumeva Project",
    description: "Lumeva is a Miami Beach-based software development and AI solutions company that believes great technology should move fast and make sense.",
    purpose: "Smart lighting control system for modern homes.",
    technologies: ["React Native", "IoT", "GraphQL", "AWS IoT"],
    image: "/images/projects/lumeva.jpg",
    slug: "lumeva-project",
    liveUrl: "https://lumeva.io",
  },
];
