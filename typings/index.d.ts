declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module "*.json" {
  const content: object;
  export default content;
}
