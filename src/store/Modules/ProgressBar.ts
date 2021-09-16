import { defineStore } from 'pinia'

import { nextTick } from 'vue'
import { dom } from 'quasar'

let TIMER: any = null
let TIMEOUT: any = null
let CUT: any = null

export const useProgressBar = defineStore('ProgressBar', {
  state: () => ({
    percent: 0,
    show: false,
    canSuccess: true,
    duration: 3000,
    height: '2px',
    color: '#4975BA',
    failedColor: '#c84242',
  }),
  getters: {},
  actions: {
    start(): void {
      if (!this.show) {
        clearTimeout(TIMEOUT)
        this.show = true
        this.canSuccess = true
        if (TIMER) {
          clearInterval(TIMER)
          this.percent = 0
        }
        CUT = 20000 / Math.floor(this.duration)
        TIMER = setInterval(() => {
          this.increase(CUT * Math.random())
          if (this.percent > 80) {
            this.pause()
          }
        }, 200)
      }
    },
    set(num: number): void {
      this.show = true
      this.canSuccess = true
      this.percent = Math.floor(num)
    },
    increase(num: number) {
      this.percent += Math.floor(num)
    },
    decrease(num: number) {
      this.percent -= Math.floor(num)
    },
    finish(): void {
      this.percent = 100
      this.hide()
    },
    pause() {
      clearInterval(TIMER)
    },
    hide() {
      clearInterval(TIMER)
      TIMER = null
      TIMEOUT = setTimeout(() => {
        this.show = false
        this.percent = 0
        nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
    },

    fail() {
      this.canSuccess = false
      this.finish()
    },

  },
})
