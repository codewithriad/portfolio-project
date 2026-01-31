// TypeScript interfaces for all data structures

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  image: string;
  linkedinUrl: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}
