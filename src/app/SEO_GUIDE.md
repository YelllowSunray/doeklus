# SEO Implementation Guide for Doeklus

## ✅ What's Been Implemented

### 1. **SEO Utilities** (`src/lib/seo.ts`)
- Reusable metadata generation functions
- Site-wide configuration (title, description, keywords, URLs)
- Open Graph and Twitter Card metadata
- Structured data (Schema.org) helpers:
  - Organization schema
  - Service schema
  - Breadcrumb schema
  - FAQ schema

### 2. **Page Metadata**
All major pages now have optimized metadata:

#### Homepage (`src/app/page.tsx`)
- Organization structured data
- Service schemas for popular services
- Optimized title and description

#### Services Page (`src/app/diensten/page.tsx`)
- Breadcrumb navigation schema
- Individual service schemas (top 8 results)
- Dynamic meta based on search

#### Become Klusser (`src/app/word-klusser/page.tsx`)
- Breadcrumb schema
- Targeted keywords for job seekers
- Clear call-to-action metadata

#### Help/FAQ (`src/app/help/page.tsx`)
- FAQ schema for rich snippets in Google
- Searchable Q&A content

#### Static Pages
- **Privacy** (`src/app/privacy/page.tsx`): Full privacy policy with proper metadata
- **Terms** (`src/app/voorwaarden/page.tsx`): Complete terms with metadata
- **About** (`src/app/over-ons/page.tsx`): Company info with metadata
- **Contact** (`src/app/contact/page.tsx`): Contact info with metadata

### 3. **Technical SEO Files**

#### Robots.txt (`public/robots.txt`)
- Allows search engines to crawl public pages
- Blocks private pages (dashboards, auth)
- Sitemap reference

#### Sitemap.xml (`public/sitemap.xml`)
- All public pages listed
- Priority and change frequency set
- Individual service URLs included

#### Web App Manifest (`public/manifest.json`)
- PWA-ready configuration
- App name and description
- Theme colors and icons

### 4. **Layout Optimization** (`src/app/layout.tsx`)
- Global SEO metadata
- Mobile viewport optimization
- Theme color for mobile browsers
- Language set to Dutch (`lang="nl"`)
- Favicon and app icons configuration

---

## 🎯 SEO Best Practices Applied

### Meta Tags
✅ Title tags (unique per page, <60 characters)  
✅ Meta descriptions (unique per page, <160 characters)  
✅ Keywords (relevant, not stuffed)  
✅ Canonical URLs (prevent duplicate content)  
✅ Open Graph tags (social media sharing)  
✅ Twitter Cards (Twitter sharing)

### Structured Data (Schema.org)
✅ Organization schema (homepage)  
✅ Service schemas (services page)  
✅ Breadcrumb navigation  
✅ FAQ schema (help page)

### Technical
✅ Robots.txt (search engine guidance)  
✅ Sitemap.xml (page discovery)  
✅ Mobile-friendly (viewport meta, responsive)  
✅ Language declaration (`lang="nl"`)  
✅ Semantic HTML

---

## 📈 Next Steps (Optional Improvements)

### 1. **Images** (Not yet implemented - requires actual images)
- Add `alt` tags to all images
- Create proper favicons (16x16, 32x32, 180x180, 192x192, 512x512)
- Generate Open Graph images (1200x630) for social sharing
- Implement lazy loading for images

### 2. **Performance**
- Enable Next.js Image optimization
- Add loading states for better perceived performance
- Implement service worker for offline support

### 3. **Content**
- Add blog/news section for fresh content
- Create location-specific landing pages (SEO for cities)
- Add more FAQ content based on user questions

### 4. **Analytics**
- Implement Google Analytics 4
- Set up Google Search Console
- Track conversion events (task posted, klusser signup, etc.)

### 5. **Advanced Schema**
- LocalBusiness schema (if physical location exists)
- Review/Rating schema (aggregate ratings)
- JobPosting schema (for klusser recruitment)
- HowTo schema (for guides/tutorials)

---

## 🔍 SEO Checklist for New Pages

When creating a new page, always:

1. **Import and use the SEO utility:**
   ```tsx
   import { generateMetadata } from "@/lib/seo";
   
   export const metadata = generateMetadata({
     title: 'Your Page Title',
     description: 'Your page description (max 160 chars)',
     keywords: ['keyword1', 'keyword2'],
     canonical: 'https://doeklus.nl/your-page'
   });
   ```

2. **Add structured data if relevant:**
   ```tsx
   import { generateBreadcrumbSchema } from "@/lib/seo";
   
   const breadcrumbs = generateBreadcrumbSchema([...]);
   
   <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
   />
   ```

3. **Update sitemap.xml** with the new URL

4. **Test with:**
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - Schema Validator: https://validator.schema.org/

---

## 🌐 How to Submit to Search Engines

### Google
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://doeklus.nl`
3. Verify ownership (DNS or file upload)
4. Submit sitemap: `https://doeklus.nl/sitemap.xml`

### Bing
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site
3. Submit sitemap

### Other
- Sitemap is auto-discoverable via robots.txt
- Most search engines will find it automatically

---

## 📱 Mobile SEO

Already implemented:
- Viewport meta tag with safe-area support
- Touch-friendly button sizes (min 44x44px)
- Responsive design with Tailwind
- Apple mobile web app meta tags
- Theme color for mobile browsers

---

## 🧪 Testing Your SEO

### Tools to Use:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Validator**: https://validator.schema.org/
3. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
4. **PageSpeed Insights**: https://pagespeed.web.dev/
5. **Lighthouse** (built into Chrome DevTools)

### What to Check:
- ✅ All structured data validates
- ✅ Meta descriptions under 160 chars
- ✅ Titles under 60 chars
- ✅ No broken links
- ✅ Mobile usability
- ✅ Page load speed

---

## 💡 Keywords Strategy

### Primary Keywords (Already Implemented):
- "klusser vinden"
- "lokale klusser"
- "klussen Nederland"
- "klusser worden"
- "bijverdienen klussen"

### Long-tail Keywords (In Content):
- "betrouwbare klusser in mijn buurt"
- "snel klusser vinden"
- "wat kost een klusser per uur"
- "hoe word ik klusser"

### Service-Specific:
- "meubelmontage Amsterdam"
- "schilder Rotterdam"
- "verhuizer Utrecht"
(Can be expanded with location pages)

---

## 📊 Expected SEO Results

### Week 1-2:
- Pages indexed by Google
- Rich snippets visible in search console

### Month 1:
- Ranking for brand name "Doeklus"
- Some long-tail keyword visibility

### Month 3-6:
- Ranking improvements for primary keywords
- Increased organic traffic
- Rich results (FAQ, services) in SERPs

---

## 🚀 Quick Wins

Already implemented:
1. ✅ Unique titles and descriptions for all pages
2. ✅ Structured data for key pages
3. ✅ Robots.txt and sitemap
4. ✅ Mobile optimization
5. ✅ Fast page loads (Next.js)
6. ✅ Semantic HTML structure

---

## Need Help?

For SEO questions or improvements, check:
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)

