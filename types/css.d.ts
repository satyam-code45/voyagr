// CSS Module declarations
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Global CSS declarations
declare module '*.css' {
  const content: string;
  export = content;
}

// Next.js specific CSS declarations
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}