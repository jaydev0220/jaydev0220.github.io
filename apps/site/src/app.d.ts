declare global {
  namespace App {}

  interface Window {
    onMengcheTurnstile?: (token: string) => void;
    turnstile?: { reset: () => void };
  }
}

declare module '*.md' {
  import type { Component } from 'svelte';
  const component: Component;
  export default component;
}

export {};
