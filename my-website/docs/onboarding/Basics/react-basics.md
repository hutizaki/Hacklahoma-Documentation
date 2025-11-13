---
sidebar_position: 6
---

# React Basics

React is a JavaScript library for building user interfaces. It's what we use to create interactive, dynamic web applications.

## What is React?

React allows you to build UIs using **components** - reusable pieces of code that represent parts of your interface. Think of components like LEGO blocks that you can combine to build complex applications.

## Why React?

- **Component-based** - Build encapsulated components that manage their own state
- **Declarative** - Describe what you want, React handles the updates
- **Learn once, write anywhere** - Use React for web, mobile (React Native), and more
- **Large ecosystem** - Tons of libraries and community support

## Your First Component

```tsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

That's it! A component is just a function that returns JSX (HTML-like syntax).

## JSX - JavaScript + XML

JSX looks like HTML but it's actually JavaScript:

```tsx
function Greeting() {
  const name = "Alice";
  const isStudent = true;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      {isStudent && <p>Welcome to the team!</p>}
    </div>
  );
}
```

### JSX Rules
1. Return a single parent element (or use fragments)
```tsx
// Good
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// Also good - using fragment
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

2. Close all tags
```tsx
<img src="photo.jpg" />  // Self-closing
<input type="text" />    // Must close
```

3. Use `className` instead of `class`
```tsx
<div className="container">Content</div>
```

4. Use camelCase for attributes
```tsx
<button onClick={handleClick}>Click me</button>
<div backgroundColor="blue">Content</div>
```

## Props - Passing Data to Components

Props (properties) are how you pass data from parent to child components:

```tsx
// Define component with props
interface ButtonProps {
  text: string;
  color: string;
}

function Button({ text, color }: ButtonProps) {
  return (
    <button style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}

// Use the component
function App() {
  return (
    <div>
      <Button text="Click me" color="blue" />
      <Button text="Submit" color="green" />
    </div>
  );
}
```

### Props are Read-Only
You cannot modify props inside a component. They flow one way: from parent to child.

## State - Managing Dynamic Data

State allows components to remember information and update the UI when it changes:

```tsx
import { useState } from 'react';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
```

### useState Explained
```tsx
const [value, setValue] = useState(initialValue);
//     ↑       ↑                      ↑
//   current  function to         initial value
//   value    update value
```

### Multiple State Variables
```tsx
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
    </form>
  );
}
```

## Event Handling

React uses camelCase event handlers:

```tsx
function EventExamples() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // Prevent page reload
    console.log("Form submitted!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input value:", e.target.value);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

## Conditional Rendering

Show different content based on conditions:

```tsx
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  // Using if statement
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}

function Status({ isLoading }: { isLoading: boolean }) {
  // Using ternary operator
  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
    </div>
  );
}

function Message({ error }: { error: string | null }) {
  // Using && operator
  return (
    <div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

## Lists and Keys

Render multiple items from an array:

```tsx
function TodoList() {
  const todos = [
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Build project", completed: false },
    { id: 3, text: "Deploy app", completed: false }
  ];

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text} {todo.completed && "✓"}
        </li>
      ))}
    </ul>
  );
}
```

**Important:** Always provide a unique `key` prop when rendering lists!

## useEffect - Side Effects

Use `useEffect` for things like fetching data, subscriptions, or manually changing the DOM:

```tsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs after component mounts
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []); // Empty array means run once on mount

  if (loading) return <p>Loading...</p>;
  return <div>{/* Render data */}</div>;
}
```

### useEffect Dependencies
```tsx
useEffect(() => {
  // Runs once on mount
}, []);

useEffect(() => {
  // Runs on every render
});

useEffect(() => {
  // Runs when 'count' changes
}, [count]);
```

## Component Composition

Build complex UIs by composing components:

```tsx
function Header() {
  return <header><h1>My App</h1></header>;
}

function Sidebar() {
  return <aside>Sidebar content</aside>;
}

function MainContent() {
  return <main>Main content</main>;
}

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
```

## Common Patterns

### Form Handling
```tsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Loading States
```tsx
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

## File Structure

Typical React component file:

```tsx
// UserCard.tsx
import { useState } from 'react';
import './UserCard.css'; // Import styles

// Type definitions
interface UserCardProps {
  name: string;
  email: string;
  onDelete?: () => void;
}

// Component
export function UserCard({ name, email, onDelete }: UserCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
      {onDelete && (
        <button onClick={onDelete}>Delete</button>
      )}
    </div>
  );
}
```

## React Best Practices

1. **Keep components small** - One component = one responsibility
2. **Name components clearly** - `UserProfile` not `Component1`
3. **Extract reusable logic** - Use custom hooks
4. **Avoid prop drilling** - Use Context API or state management
5. **Type your props** - Use TypeScript interfaces
6. **Handle loading and error states** - Always consider all states
7. **Don't mutate state directly** - Always use setState
8. **Use keys in lists** - Helps React optimize rendering

## Common Mistakes

1. Modifying state directly: `state.count++` ❌
   - Use: `setState(state.count + 1)` ✅

2. Forgetting dependencies in useEffect
3. Not handling loading/error states
4. Props drilling too deep (use Context instead)
5. Too many useEffects in one component

## Practice Exercise

Build a simple Todo App with:
1. A form to add new todos
2. A list displaying todos
3. Ability to mark todos as complete
4. Ability to delete todos
5. Show count of completed vs total todos

## Learn More

- [React Official Tutorial](https://react.dev/learn)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Patterns](https://reactpatterns.com/)
- [Awesome React](https://github.com/enaqx/awesome-react) - Curated list of React resources

## Next Up

Excellent! You now know the fundamentals. Let's learn our team's workflow for creating features and contributing code!
