// Simple utility function to test AI PR review
export function greet(name) {
    if (!name) {
      throw new Error("Name is required");
    }
    return `Hello, ${name}!`;
  }
  
  // Bad style for testing:
  const unused = 42;
  