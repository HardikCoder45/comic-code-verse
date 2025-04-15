
// Global type definitions for the project

// Device memory for navigator
interface Navigator {
  deviceMemory?: number;
}

// Window with confetti
interface Window {
  confetti?: (options?: any) => void;
}

// Additional HTML element props
interface HTMLAttributes {
  inline?: boolean;
}

// Fix for X component in CodeDNA
declare namespace JSX {
  interface IntrinsicElements {
    'X': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

// Extended React properties
declare namespace React {
  interface HTMLAttributes<T> {
    inline?: boolean;
  }
}
