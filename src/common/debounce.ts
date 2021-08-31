/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear'
 * that is a function which will clear the timer to prevent previously scheduled executions.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

export function Debounce(func: Function, wait?: number, immediate?: boolean) {
  // @ts-ignore
  let timeout: any,
    args: any,
    context: any,
    timestamp: any,
    result: any
  if (wait == null) wait = 100

  function later() {
    const last = Date.now() - timestamp

    // @ts-ignore
    if (last < wait && last > 0) {
      // @ts-ignore
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        context = args == null
      }
    }
  }

  return function a2() {
    // @ts-ignore
    context = this
    // @ts-ignore
    // args = arguments
    timestamp = Date.now()
    const callNow = immediate && !timeout
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = args == null
    }

    return result
  }
}
