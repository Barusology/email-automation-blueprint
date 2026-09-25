# Email Automation Blueprint Sales Page

This repository contains the production sales page for **The Email Automation Blueprint**, a practical digital guide for building email automation systems and selling them as a recurring service.

The page is a self-contained static HTML document. It includes its own responsive layout, styles, FAQ interactions, sales copy, pricing presentation, and Creem checkout links.

## Product

The offer currently presented on the page includes:

- A 32-page step-by-step PDF guide
- An editable Word version
- Four hands-on starter projects
- Client-acquisition workflows and outreach templates
- Pricing worksheets and audit checklists
- A one-time purchase price of **$30**
- A 30-day money-back guarantee, subject to the seller's actual fulfillment and refund policy

## Checkout

All purchase calls to action link to the Creem product checkout:

<https://www.creem.io/payment/prod_7KMOwGsqSYcldoZPmJBjJ8>

If the Creem product URL, price, guarantee, or fulfillment terms change, update both the checkout configuration and the corresponding copy in [index.html](./index.html).

## Repository structure

```text
.
└── index.html    # Complete static sales page
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

For GitHub Pages, configure the repository's Pages settings to deploy from the `main` branch and the repository root.

## Editing guidelines

When updating the page:

1. Keep the Creem checkout URL consistent across every purchase button.
2. Keep visible pricing synchronized with the actual Creem product price.
3. Use real testimonials only. The page intentionally contains testimonial placeholders until genuine customer feedback is available.
4. Confirm guarantee, refund, and fulfillment language before publishing.
5. Test the page on mobile and desktop widths.
6. Verify every checkout button after publishing.

## Quality checklist

Before publishing a change:

- Open `index.html` in a browser.
- Test the navigation CTA, hero CTA, offer CTA, and final CTA.
- Confirm the buttons open the Creem checkout page.
- Check the FAQ expand/collapse behavior.
- Test responsive layout on a narrow viewport.
- Confirm the displayed price matches the live product.
- Check links and copy for outdated claims or placeholders.

## License and content ownership

The sales copy, visual design, and product materials are proprietary to the product owner unless otherwise stated. Do not redistribute, rebrand, or reuse the content without permission.
