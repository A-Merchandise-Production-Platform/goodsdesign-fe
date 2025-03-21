This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.

# GoodsDesign

## Font Configuration

This project uses the following fonts:

### Primary Fonts

- **Outfit** (Primary) - A modern, clean, and versatile variable font for text
  and UI elements
- **Onest** (Headings) - A contemporary geometric sans-serif with slightly
  rounded terminals

### Special Fonts

- **Satoshi** - A gorgeous neo-grotesque font with humanist touches for display
  text and hero sections
- **JetBrains Mono** - A monospaced font specifically designed for coding with
  excellent readability

### Alternative Fonts

- **Plus Jakarta Sans** - A versatile and modern humanist sans-serif with a
  professional look
- **Space Grotesk** - A quirky yet readable font that adds personality while
  maintaining professionalism

## Font Setup Instructions

1. **Google Fonts** (Already configured):

   - Outfit, JetBrains Mono, Space Grotesk, and Plus Jakarta Sans are loaded
     from Google Fonts

2. **Onest Font**:

   - Download Onest from [Fontshare](https://www.fontshare.com/fonts/onest)
   - Place the font files in the `src/fonts` directory:
     - `Onest-Regular.ttf`
     - `Onest-Medium.ttf`
     - `Onest-Bold.ttf`

3. **Satoshi Font**:
   - Download Satoshi from [Fontshare](https://www.fontshare.com/fonts/satoshi)
   - Place the font files in the `public/fonts/satoshi` directory:
     - `Satoshi-Regular.otf`
     - `Satoshi-Medium.otf`
     - `Satoshi-Bold.otf`

## Font Usage

The fonts are already set up in the project's CSS with appropriate font
families:

- Body text: `var(--font-outfit)`
- Headings: `var(--font-onest)`
- Special elements: `var(--font-satoshi)`
- Code blocks: `var(--font-jetbrains-mono)`

Use these utility classes to apply specific fonts:

- `.font-special`, `.hero-text`, `.display-text` - Apply Satoshi font
- `.font-alt-1` - Apply Space Grotesk font
- `.font-alt-2` - Apply Plus Jakarta Sans font
- `.code` - Apply JetBrains Mono font
