/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void

export type Options = {
  isImmediate: boolean
}

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds: number = 50,
  options: Options = {
    isImmediate: false,
  },
): F {
  let timeoutId: NodeJS.Timeout | undefined

  return function retA(this: any, ...args: any[]) {
    const context = this

    const doLater = function retB() {
      timeoutId = undefined
      if (!options.isImmediate) {
        func.apply(context, args)
      }
    }

    const shouldCallNow = options.isImmediate && timeoutId === undefined

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = <any>setTimeout(doLater, waitMilliseconds)

    if (shouldCallNow) {
      func.apply(context, args)
    }
  } as any
}
