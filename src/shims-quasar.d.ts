import { Vue, Options } from 'vue-class-component'

declare module 'vue/types/vue' {
  interface Vue {
    $q: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    preFectch?: (options: any) => void | Promise<void>
  }
}
