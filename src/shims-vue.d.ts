// Mocks all files ending in `.vue` showing them as plain Vue instances/* eslint-disable */
/* eslint-disable */
declare module '*.vue' {
  import type { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;

}
