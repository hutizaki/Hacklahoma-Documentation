---
sidebar_position: 3
---

# Tailwind CSS Basics

Tailwind CSS is a utility-first CSS framework that we use to style our applications. Instead of writing custom CSS, you apply pre-built utility classes directly in your HTML/JSX to style elements quickly and consistently.

## What is Tailwind CSS?

Tailwind provides thousands of utility classes that map directly to CSS properties. Instead of this:

```css
.button {
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
```

You write this:

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

## Why We Use Tailwind

- **Fast development** - No need to write custom CSS or think of class names
- **Consistent design** - Pre-defined spacing, colors, and sizing scales
- **Responsive by default** - Easy mobile-first responsive design
- **No CSS bloat** - Only the classes you use are included in production
- **Easy to maintain** - Styles are colocated with components

## Core Concepts

### Utility Classes

Each class does one thing:

```jsx
<div className="text-center text-blue-500 font-bold">
  Centered, blue, bold text
</div>
```

- `text-center` → `text-align: center`
- `text-blue-500` → `color: rgb(59 130 246)`
- `font-bold` → `font-weight: 700`

### Spacing Scale

Tailwind uses a consistent spacing scale (1 unit = 0.25rem = 4px):

```jsx
<div className="p-4">      {/* padding: 1rem (16px) */}
<div className="m-8">      {/* margin: 2rem (32px) */}
<div className="px-6">     {/* padding-left & right: 1.5rem */}
<div className="mt-2">     {/* margin-top: 0.5rem */}
```

Common spacing values:
- `0` = 0px
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px

## Essential Utilities

### Layout & Display

```jsx
{/* Flexbox */}
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

{/* Grid */}
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

{/* Hide/Show */}
<div className="hidden md:block">Visible on medium screens and up</div>
```

### Sizing

```jsx
{/* Width */}
<div className="w-full">      {/* width: 100% */}
<div className="w-1/2">       {/* width: 50% */}
<div className="w-64">        {/* width: 16rem */}

{/* Height */}
<div className="h-screen">    {/* height: 100vh */}
<div className="h-32">        {/* height: 8rem */}
```

### Colors

```jsx
{/* Text colors */}
<p className="text-gray-900">Dark gray text</p>
<p className="text-blue-500">Blue text</p>
<p className="text-red-600">Red text</p>

{/* Background colors */}
<div className="bg-white">White background</div>
<div className="bg-gray-100">Light gray background</div>
<div className="bg-blue-500">Blue background</div>

{/* Border colors */}
<div className="border border-gray-300">Gray border</div>
```

Color scale: `50` (lightest) to `950` (darkest)

### Typography

```jsx
{/* Font size */}
<p className="text-sm">Small text</p>
<p className="text-base">Base text (16px)</p>
<p className="text-lg">Large text</p>
<p className="text-xl">Extra large</p>
<p className="text-2xl">2X large</p>

{/* Font weight */}
<p className="font-normal">Normal weight</p>
<p className="font-medium">Medium weight</p>
<p className="font-semibold">Semibold</p>
<p className="font-bold">Bold</p>

{/* Text alignment */}
<p className="text-left">Left aligned</p>
<p className="text-center">Centered</p>
<p className="text-right">Right aligned</p>
```

### Borders & Rounding

```jsx
{/* Borders */}
<div className="border">1px border all sides</div>
<div className="border-2">2px border</div>
<div className="border-t">Border top only</div>

{/* Border radius */}
<div className="rounded">Small rounded corners</div>
<div className="rounded-lg">Large rounded corners</div>
<div className="rounded-full">Fully rounded (circle/pill)</div>
```

### Shadows

```jsx
<div className="shadow">Small shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">Extra large shadow</div>
```

## Responsive Design

Tailwind uses mobile-first breakpoints. Add prefixes to apply styles at different screen sizes:

```jsx
<div className="text-sm md:text-base lg:text-lg">
  {/* Small on mobile, base on tablet, large on desktop */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

Breakpoints:
- `sm:` - 640px and up (small tablets)
- `md:` - 768px and up (tablets)
- `lg:` - 1024px and up (laptops)
- `xl:` - 1280px and up (desktops)
- `2xl:` - 1536px and up (large desktops)

## Interactive States

Add hover, focus, and active states:

```jsx
{/* Hover */}
<button className="bg-blue-500 hover:bg-blue-600">
  Hover me
</button>

{/* Focus */}
<input className="border focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

{/* Active */}
<button className="active:scale-95">
  Click me
</button>

{/* Disabled */}
<button className="disabled:opacity-50 disabled:cursor-not-allowed">
  Disabled
</button>
```

## Common Patterns

### Button

```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition">
  Click me
</button>
```

### Card

```jsx
<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
  <h2 className="text-xl font-bold mb-2">Card Title</h2>
  <p className="text-gray-600">Card content goes here</p>
</div>
```

### Centered Container

```jsx
<div className="flex items-center justify-center min-h-screen">
  <div className="max-w-md w-full">
    {/* Content */}
  </div>
</div>
```

### Navigation Bar

```jsx
<nav className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="font-bold text-xl">Logo</div>
      <div className="flex gap-4">
        <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
        <a href="#" className="text-gray-700 hover:text-blue-500">About</a>
      </div>
    </div>
  </div>
</nav>
```

## Tips for Using Tailwind

1. **Use the docs** - The [Tailwind documentation](https://tailwindcss.com/docs) is excellent. Search for what you need.

2. **Install Tailwind IntelliSense** - VS Code extension that autocompletes class names.

3. **Extract components** - Don't repeat long class strings. Create reusable React components:

```jsx
// Instead of repeating this everywhere:
<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">

// Create a component:
function Button({ children }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
      {children}
    </button>
  );
}
```

4. **Use @apply sparingly** - For truly repeated patterns, you can use `@apply` in CSS:

```css
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded;
}
```

## Practice Exercise

Try building a simple profile card:
1. White background with rounded corners and shadow
2. Centered avatar (rounded full)
3. Name in bold, large text
4. Bio in smaller, gray text
5. Button at the bottom with hover effect

## Learn More

- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - The official docs are fantastic
- [Tailwind UI](https://tailwindui.com/) - Pre-built component examples
- [Tailwind Play](https://play.tailwindcss.com/) - Online playground to experiment

## Next Up

Now that you understand our styling approach, let's learn TypeScript - the language that powers our applications!

