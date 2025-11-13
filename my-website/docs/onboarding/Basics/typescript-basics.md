---
sidebar_position: 4
---

# TypeScript Basics

TypeScript is a programming language built on top of JavaScript that adds **type safety**. It helps catch bugs before you run your code and makes your code more maintainable.

## Why TypeScript?

JavaScript is dynamically typed, which can lead to errors:

```javascript
// JavaScript - this will cause an error at runtime
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

greet(123); // Error: name.toUpperCase is not a function
```

TypeScript catches these errors before running:

```typescript
// TypeScript - error caught immediately
function greet(name: string) {
  return "Hello, " + name.toUpperCase();
}

greet(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

## Basic Types

### Primitive Types
```typescript
let name: string = "Alice";
let age: number = 20;
let isStudent: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
```

### Arrays
```typescript
let numbers: number[] = [1, 2, 3, 4];
let names: string[] = ["Alice", "Bob", "Carol"];

// Alternative syntax
let numbers: Array<number> = [1, 2, 3];
```

### Objects
```typescript
let user: { name: string; age: number } = {
  name: "Alice",
  age: 20
};
```

### Any (avoid when possible)
```typescript
let anything: any = "hello";
anything = 42; // No error, but defeats the purpose of TypeScript
```

## Functions

### Function Parameters and Return Types
```typescript
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): void {
  console.log("Hello, " + name);
  // void means no return value
}
```

### Optional Parameters
```typescript
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}`;
  }
  return `Hello, ${name}`;
}

greet("Alice");           // "Hello, Alice"
greet("Bob", "Hi");       // "Hi, Bob"
```

### Default Parameters
```typescript
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}
```

### Arrow Functions
```typescript
const add = (a: number, b: number): number => {
  return a + b;
};

// Shorter syntax for single expression
const multiply = (a: number, b: number): number => a * b;
```

## Interfaces

Interfaces define the shape of objects:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional property
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

function getUser(id: number): User {
  // Implementation
  return { id: 1, name: "Alice", email: "alice@example.com" };
}
```

## Type Aliases

Similar to interfaces, but more flexible:

```typescript
type ID = number | string;

type User = {
  id: ID;
  name: string;
};

type Status = "pending" | "approved" | "rejected"; // Union type

let status: Status = "pending"; // Can only be one of these three values
```

## Union Types

A value can be one of several types:

```typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

printId(101);      // OK
printId("202");    // OK
```

## Type Assertions

Tell TypeScript you know better about the type:

```typescript
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

// Alternative syntax
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
```

## Generics

Create reusable components that work with multiple types:

```typescript
function getFirstElement<T>(array: T[]): T {
  return array[0];
}

const firstNumber = getFirstElement([1, 2, 3]);    // Type: number
const firstName = getFirstElement(["a", "b"]);     // Type: string
```

## Common Patterns in React

### Component Props
```typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
```

### State Types
```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Event Handlers
```typescript
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log("Button clicked!");
}

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}
```

## Important Concepts

### Type Inference
TypeScript can often infer types without you specifying them:

```typescript
let name = "Alice"; // TypeScript infers this is a string
let age = 20;       // TypeScript infers this is a number
```

### Null and Undefined Safety
```typescript
function greet(name: string | null) {
  if (name === null) {
    return "Hello, stranger";
  }
  return `Hello, ${name}`;
}
```

## Common Mistakes to Avoid

1. Using `any` everywhere (defeats the purpose of TypeScript)
2. Not enabling strict mode in `tsconfig.json`
3. Ignoring type errors with `@ts-ignore` instead of fixing them
4. Not typing function parameters

## Practice Exercise

Try creating:
1. An interface for a `Student` with name, id, and grade
2. A function that takes a `Student` and returns a greeting string
3. An array of students and a function to filter students by grade

## Learn More

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Try TypeScript in your browser

## Next Up

Now that you understand TypeScript, let's learn Git - the tool we use to collaborate and manage code!
