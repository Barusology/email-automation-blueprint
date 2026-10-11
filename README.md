# Email Automation Blueprint Sales Page

This repository contains the public website for **The Email Automation Blueprint**, including a free practical email automation guide and a page for the related paid digital product.

The site is static, with no backend or build step. It includes educational content, product information, a Privacy Policy, Terms of Service, and Creem checkout links.

## Product

The offer currently presented on the page includes:

- A 32-page step-by-step PDF guide
- An editable Word version
- Four hands-on starter projects
- Client-acquisition workflows and outreach templates
- Pricing worksheets and audit checklists
- A one-time purchase price of **$5**
- A 30-day money-back guarantee
- Customer support at barusology@gmail.com

## Checkout

All purchase calls to action link to the Creem product checkout:

<https://www.creem.io/payment/prod_7KMOwGsqSYcldoZPmJBjJ8>

If the Creem product URL, price, guarantee, or fulfillment terms change, update both the checkout configuration and the corresponding copy in [index.html](./index.html).

## Repository structure

```text
.
├── index.html                         # Product information and links to free resources
├── welcome-email-automation-guide.html # Free educational guide; AdSense Auto ads are loaded here
├── privacy.html                       # Privacy, analytics, and advertising disclosures
├── terms.html                         # Public terms of service
├── robots.txt                         # Crawler instructions and sitemap location
├── sitemap.xml                        # Public pages for search discovery
└── favicon.svg                        # Email icon shown in browser tabs
```

## Preview locally

Because the page is static, it can be opened directly in a browser. For a more reliable local preview, serve the repository with any static web server.

### Python

```bash
python -m http.server 8080
```

Then open <http://localhost:8080>.

### Node.js

```bash
npx serve .
```

Open the local URL printed by the command.

## Deployment

Deploy the repository as a static site using any provider that supports a root `index.html`, including:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any standard web server or static hosting provider

The site does not require a build step, server runtime, database, or environment variables.

The production site domain is [emailpro.website](https://emailpro.website/). The site pages use this domain as their canonical URL.

For GitHub Pages, configure the repository's Pages settings to deploy from the `main` branch and the repository root.

### Production custom domain

The production custom domain is `emailpro.website`; keep the Vercel project configured to serve this domain and ensure its DNS and HTTPS certificate remain valid. Do not use a provider preview hostname (such as `*.vercel.app`) as the storefront's final public address.

## Editing guidelines

When updating the site:

1. Keep the Creem checkout URL consistent across every purchase button.
2. Keep visible pricing synchronized with the actual Creem product price.
3. Keep educational pages useful, original, accurate, and maintained; do not add filler or unsupported statistics.
4. Keep the Privacy Policy, Terms of Service, and support email links working and aligned with actual data practices.
5. Confirm the guarantee, refund, product, and fulfillment language matches what you actually provide.
6. Test each page on mobile and desktop widths.
7. Verify every checkout button after publishing.
8. Verify the production custom domain and HTTPS after domain configuration.
9. Configure an appropriate certified consent management platform for regions where Google requires it before serving ads there.
10. Review the policy pages against actual business practices and applicable legal requirements before relying on them as legal advice.

## Quality checklist

Before publishing a change:

- Open the sales page and free guide in a browser.
- Test the navigation CTA, hero CTA, offer CTA, and final CTA.
- Confirm the buttons open the Creem checkout page.
- Check the FAQ expand/collapse behavior on the sales page.
- Test responsive layout on a narrow viewport.
- Confirm the displayed price matches the live product.
- Check the free guide, Privacy Policy, Terms of Service, and support email links.
- Check links and copy for outdated claims or placeholders.

## License and content ownership

The sales copy, visual design, and product materials are proprietary to the product owner unless otherwise stated. Do not redistribute, rebrand, or reuse the content without permission.
