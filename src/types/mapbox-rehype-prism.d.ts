declare module '@mapbox/rehype-prism' {
  import { Plugin } from 'unified';
  
  interface RehypePrismOptions {
    ignoreMissing?: boolean;
    alias?: Record<string, string>;
  }
  
  const rehypePrism: Plugin<[RehypePrismOptions?]>;
  export default rehypePrism;
}