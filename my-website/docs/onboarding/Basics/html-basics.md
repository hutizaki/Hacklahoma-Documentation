---
sidebar_position: 2
---

# HTML Basics

HTML (HyperText Markup Language) is the foundation of every website. It provides the structure and content of web pages.

## What is HTML?

HTML uses **tags** to mark up content and tell the browser what each piece of content represents. Tags are wrapped in angle brackets like `<tagname>`.

## Essential HTML Structure

Every HTML page has the same basic structure:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page Title</title>
  </head>
  <body>
    <h1>Welcome to my page</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` - Tells the browser this is an HTML5 document
- `<html>` - The root element that contains all other elements
- `<head>` - Contains metadata (title, links to CSS, etc.)
- `<body>` - Contains the visible content of the page

## Common HTML Tags You'll Use

### Headings
```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Smaller Subheading</h3>
<!-- h4, h5, h6 are also available -->
```

### Text Elements
```html
<p>A paragraph of text.</p>
<span>Inline text</span>
<strong>Bold text</strong>
<em>Italic text</em>
```

### Links
```html
<a href="https://example.com">Click here</a>
```

### Images
```html
<img src="image.jpg" alt="Description of image" />
```

### Lists
```html
<!-- Unordered list -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
```

### Divs and Containers
```html
<div>
  <p>Divs are used to group content together</p>
</div>
```

### Buttons and Forms
```html
<button>Click me</button>

<form>
  <input type="text" placeholder="Enter your name" />
  <input type="email" placeholder="Enter your email" />
  <button type="submit">Submit</button>
</form>
```

## HTML Attributes

Tags can have **attributes** that provide additional information:

```html
<img src="photo.jpg" alt="A photo" width="500" />
<a href="https://google.com" target="_blank">Open in new tab</a>
<div id="header" class="container">Content</div>
```

Common attributes:
- `id` - Unique identifier for an element
- `class` - Used for styling multiple elements
- `src` - Source URL for images/scripts
- `href` - Destination URL for links
- `alt` - Alternative text for images

## Semantic HTML

Modern HTML uses **semantic tags** that describe their content:

```html
<header>Site header with logo and navigation</header>
<nav>Navigation links</nav>
<main>Main content of the page</main>
<article>A blog post or article</article>
<section>A section of content</section>
<footer>Footer with copyright info</footer>
```

These are better than using `<div>` for everything because they:
- Make code more readable
- Help with accessibility
- Improve SEO

## Practice Exercise

Try creating a simple HTML page with:
1. A heading with your name
2. A paragraph about yourself
3. A list of your hobbies
4. A link to your favorite website

## Learn More

- [MDN HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

## Next Up

Now that you understand HTML structure, let's learn how to make it look good with CSS!
