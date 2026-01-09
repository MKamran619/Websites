# Professional Portfolio Website

A modern, SEO-optimized Angular 18+ SSR portfolio website for showcasing software engineering expertise and attracting high-value clients.

## Font Family

- **Logo : Agbalumo**

## Features

- ✨ **Server-Side Rendering (SSR)** - Optimized for SEO
- 🎨 **Modern Design** - Professional, animated UI with GSAP
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **High Performance** - Optimized for Lighthouse scores
- 🔍 **SEO Ready** - Meta tags, structured data, sitemap
- 🎯 **Lead Generation** - Contact forms with validation
- 📊 **Case Studies** - Portfolio showcase with metrics
- 📝 **Blog System** - Technical insights and thought leadership

## Technology Stack

- **Frontend**: Angular 18, SCSS, TypeScript
- **Animation**: GSAP with ScrollTrigger
- **Styling**: SCSS with CSS Grid/Flexbox
- **SSR**: Angular Universal
- **Deployment**: Vercel/Netlify ready

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   └── footer/
│   ├── pages/
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   └── contact/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.scss
└── index.html
```

## Pages

1. **Home** - Hero section with value proposition and trust indicators
2. **About** - Story, expertise, and philosophy
3. **Services** - Detailed service offerings with benefits
4. **Portfolio** - Case studies with metrics and technologies
5. **Blog** - Technical articles and insights
6. **Contact** - Lead capture form with Calendly integration

## Installation

```bash
npm install
```

## Development

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Production Build

```bash
ng build --configuration production
```

## SSR Build and Serve

```bash
npm run build:ssr
npm run serve:ssr
```

## Customization

### Replace Placeholder Content

- Update your name and professional details in component files
- Replace placeholder company/project names with actual work
- Update contact information and social links
- Add your professional images and case study visuals

### Update Colors

- Primary color: `#14b8a6` (teal)
- Secondary color: `#06b6d4` (cyan)
- Modify in `src/styles.scss` and component SCSS files

### Add Portfolio Items

- Edit the `caseStudies` array in `portfolio.component.ts`
- Add your actual project metrics and results

### Update Services

- Modify the `services` array in `services.component.ts`
- Customize service descriptions and benefits

## SEO Optimization

- ✅ Semantic HTML structure
- ✅ Meta tags for all pages
- ✅ Structured schema markup
- ✅ Open Graph tags
- ✅ Mobile-friendly design
- ✅ Fast load times
- ✅ Image optimization
- ✅ XML sitemap ready

## Performance Tips

1. **Optimize Images**: Use WebP format with fallbacks
2. **Code Splitting**: Angular automatically handles route-based splitting
3. **Lazy Loading**: Implement for large images
4. **Caching**: Configure headers for static assets
5. **Compression**: Enable gzip on your server

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

## Environment Setup

Create an `.env` file with your settings:

```
GOOGLE_ANALYTICS_ID=your-id
CONTACT_EMAIL=your-email@domain.com
CALENDLY_URL=your-calendly-url
```

## License

MIT

## Support

For questions or issues, please reach out or open an issue in the repository.

---

**Ready to transform your business?** Start by customizing this portfolio with your unique story and expertise.
