# HomeKasa

This is HomeKasa's website. The start was provided by [Adam Laycock](https://github.com/Arcath/arcath.net-next)

## Other resources

- templates from [Treact](https://treact.owaiskhan.me/#)
- [Tailwind starter kit](https://github.com/creativetimofficial/tailwind-starter-kit)
- [Mamba UI](https://mambaui.com)

More resources at [Awesome TailwindCSS](https://github.com/aniftyco/awesome-tailwindcss)

## Others

### Documentation of Arcath Utils

The [Documentation][https://utils.arcath.net] of this scoped package

# Components

## TextContainer

## Content

## MDX

## ImageWithTextOnTop

Provide {text, image, alt, title} and it will render a card like component with image as the background and text on top. Tested on desktop and mobile viewport sizes.

## Future

- move the URLs of all social accounts to a constants file. This will make the components reusable. Right now they are hardcoded in social-buttons.tsx

# Credits

Social Icon SVGs are from https://tailwindcomponents.com/component/social-media-icons
[Pagination on the blog page](https://dev.to/elisabethleonhardt/how-to-combine-ssr-and-pagination-with-react-query-4ihp)

# To build

## Dev version

`docker build -f Dockerfile.dev -t website .`
docker run -p 3000:3000 website

## Prod version

```
docker build -f Dockerfile.prod -t website .
docker run -p 3000:3000 website
```

Though prod is usually run from `rome` docker compose

# Environment variables

SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=$SITE_URL

# External docs

- https://fettblog.eu/typescript-react/components/

# Semantic elements

Address - use in footer
Article - blog index
Aside
Data / Datalist
Footer
Nav
Details - should include summary
Time - use for blogs (updated at )
Header
Main
Section

# Pages

index
/blog
/blog/[slug]
/features/[slug]
/help/index
/resources
/resources/us-taxes
404.tsx

# Post deployment checks

- check opengraph for all pages
- check all blogs and index pages

# Different versions of the website

[2021 website](https://2021-homekasa-website.vercel.app/home)

# SEO

For each page make sure we send the following attributes to Next SEO

- title
- description
- image
- keywords
- url (the canonical URL)

## Semantic HTML elements

- article
- aside
- details
- footer
- header
- main
- mark
- nav
- section
- summary
- time

# Notes

- All dates inside text (MDX or otherwise) should always be in yyy-mm-dd
