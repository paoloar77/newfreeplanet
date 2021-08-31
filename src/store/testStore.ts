import { defineStore } from 'pinia'
import { tools } from '@store/Modules/tools'
import { toolsext } from '@store/Modules/toolsext'

export interface ITest {
  finishLoading: boolean
}

export const useTestStore = defineStore({
  id: 'TestStore',
  state: (): ITest => ({
    finishLoading: false,
  }),

  getters: {

    isMyLang: (state: ITest) => (rec: { lang: string }): boolean => {
      if (!rec.lang) return true

      return (rec.lang === toolsext.getLocale(false) || toolsext.getLocale() === '')
    },

    prova2(): boolean {
      return this.finishLoading
    },
  },

  actions: {
    async testProva() {
      let arrpagesroute = null

      arrpagesroute = this.isMyLang({ lang: 'test' })
    },

  },
})
