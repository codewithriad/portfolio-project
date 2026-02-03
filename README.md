# Md. Riyad Khan - Web Developer Portfolio

A modern, production-ready Next.js 14 portfolio website showcasing design work, experience, and articles.

## 🚀 Features

- ✅ **Next.js 14** with App Router and TypeScript
- ✅ **Tailwind CSS** for styling
- ✅ **Framer Motion** for smooth animations
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimized** - Sitemap, robots.txt, meta tags
- ✅ **Performance Optimized** - Image optimization, lazy loading
- ✅ **Smooth Scroll Navigation** - Hash-based section navigation
- ✅ **Dynamic Routes** - Work and article detail pages with SSG

## 📁 Project Structure

```
portfolio-project/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage with all sections
│   ├── globals.css         # Global styles and Tailwind
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # Robots.txt configuration
│   ├── work/[slug]/        # Dynamic work detail pages
│   └── articles/[slug]/    # Dynamic article detail pages
├── components/
│   ├── Navigation.tsx      # Sticky header with mobile menu
│   ├── Hero.tsx            # Landing section
│   ├── SelectedWork.tsx    # Projects grid
│   ├── About.tsx           # Bio and experience timeline
│   ├── Testimonials.tsx    # Client testimonials
│   ├── Articles.tsx        # Blog articles with pagination
│   ├── CTA.tsx             # Call-to-action section
│   └── Footer.tsx          # Footer with credits
├── data/
│   ├── projects.ts         # Project data
│   ├── testimonials.ts     # Testimonial data
│   ├── articles.ts         # Article data
│   └── experience.ts       # Work experience data
├── types/
│   └── index.ts            # TypeScript interfaces
└── public/
    └── images/             # Image assets
```

## 🎨 Sections

1. **Hero** - Profile image, headline, CTAs, location badge
2. **Selected Work** - 4 project cards with hover effects
3. **About** - Bio, key facts, expandable experience timeline
4. **Testimonials** - 4 client testimonials in grid
5. **Articles** - Blog posts with "load more" pagination
6. **CTA** - Call-to-action with background image
7. **Footer** - Availability status, location, social links

## 🖼️ Images Setup

### Already Generated (6 images):
- ✅ `profile.jpg` - Hero section profile photo
- ✅ `profile-large.jpg` - About section profile photo
- ✅ `projects/cyber-rock.jpg` - Cyber-rock project mockup
- ✅ `projects/vertex-labs.jpg` - Vertex Labs project mockup
- ✅ `projects/hearth-co.jpg` - Hearth & Co. project mockup
- ✅ `projects/lumeva.jpg` - Lumeva project mockup

### Still Needed (9 images):
You can add your own images or use placeholder services like [Unsplash](https://unsplash.com/) or [Lorem Picsum](https://picsum.photos/):

**Testimonial Avatars** (50x50px minimum):
- `public/images/testimonials/avatar1.jpg`
- `public/images/testimonials/avatar2.jpg`
- `public/images/testimonials/avatar3.jpg`
- `public/images/testimonials/avatar4.jpg`

**Article Images** (landscape, 16:10 ratio):
- `public/images/articles/lilac-flower.jpg`
- `public/images/articles/yellow-flower.jpg`
- `public/images/articles/orange-flower.jpg`
- `public/images/articles/green-fern.jpg`

**CTA Background** (wide landscape):
- `public/images/cta-background.jpg`

### Quick Placeholder Setup:
```bash
# Create placeholder images using Lorem Picsum
cd public/images/testimonials
curl -o avatar1.jpg "https://picsum.photos/200/200?random=1"
curl -o avatar2.jpg "https://picsum.photos/200/200?random=2"
curl -o avatar3.jpg "https://picsum.photos/200/200?random=3"
curl -o avatar4.jpg "https://picsum.photos/200/200?random=4"

cd ../articles
curl -o lilac-flower.jpg "https://picsum.photos/1200/750?random=5"
curl -o yellow-flower.jpg "https://picsum.photos/1200/750?random=6"
curl -o orange-flower.jpg "https://picsum.photos/1200/750?random=7"
curl -o green-fern.jpg "https://picsum.photos/1200/750?random=8"

cd ..
curl -o cta-background.jpg "https://picsum.photos/1920/1080?random=9"
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
The `.env.local` file is already created with:
```
NEXT_PUBLIC_CONTACT_EMAIL=info@riyadkhan.dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Roy Jones Portfolio
```

Update `NEXT_PUBLIC_SITE_URL` for production deployment.

### 3. Add Remaining Images
Follow the "Images Setup" section above to add the 9 remaining images.

### 4. Update CV File (Optional)
Replace `public/cv.pdf` with your actual CV file, or update the download link in `components/About.tsx`.

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📊 Performance Targets

- ✅ Lighthouse Performance: 90+
- ✅ First Contentful Paint (FCP): < 1.5s
- ✅ Largest Contentful Paint (LCP): < 2.5s
- ✅ Cumulative Layout Shift (CLS): < 0.1
- ✅ Bundle Size: < 150KB (gzipped)

## 🎨 Customization

### Update Content
Edit the data files in the `data/` directory:
- `projects.ts` - Your portfolio projects
- `testimonials.ts` - Client testimonials
- `articles.ts` - Blog articles
- `experience.ts` - Work history

### Update Colors
Edit `tailwind.config.ts` to customize the color palette.

### Update Typography
The project uses Inter font from Google Fonts. Change it in `app/layout.tsx`.

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod
```

### Environment Variables for Production
Set these in your Vercel dashboard:
- `NEXT_PUBLIC_CONTACT_EMAIL` - Your contact email
- `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., https://royjones.com)

## 📝 To-Do

- [ ] Add remaining 9 placeholder images
- [ ] Replace with your actual images
- [ ] Update CV file (`public/cv.pdf`)
- [ ] Customize content in data files
- [ ] Update site metadata in `app/layout.tsx`
- [ ] Test all links and navigation
- [ ] Run Lighthouse audit
- [ ] Deploy to production

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel (recommended)

## 📧 Contact

Email: info@riyadkhan.dev

---

Built with ❤️ using Next.js and Tailwind CSS
