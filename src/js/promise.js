/**
 * setImmediate polyfill v1.0.1, supports IE9+
 * © 2014–2015 Dmitry Korobkin
 * Released under the MIT license
 * github.com/Octane/setImmediate
 */
window.setImmediate || (function () {
  let uid = 0;
  const storage = {};
  let firstCall = true;
  const { slice } = Array.prototype;
  const message = 'setImmediatePolyfillMessage';

  function fastApply(args) {
    const func = args[0];
    switch (args.length) {
      case 1:
        return func();
      case 2:
        return func(args[1]);
      case 3:
        return func(args[1], args[2]);
    }
    return func.apply(window, slice.call(args, 1));
  }

  function callback(event) {
    const key = event.data;
    let data;
    if (typeof key === 'string' && key.indexOf(message) === 0) {
      data = storage[key];
      if (data) {
        delete storage[key];
        fastApply(data);
      }
    }
  }

  window.setImmediate = function setImmediate() {
    const id = uid++;
    const key = message + id;
    let i = arguments.length;
    const args = new Array(i);
    while (i--) {
      args[i] = arguments[i];
    }
    storage[key] = args;
    if (firstCall) {
      firstCall = false;
      window.addEventListener('message', callback);
    }
    window.postMessage(key, '*');
    return id;
  };

  window.clearImmediate = function clearImmediate(id) {
    delete storage[message + id];
  };
}());

/**
 * Promise polyfill v1.0.10
 * requires setImmediate
 *
 * © 2014–2015 Dmitry Korobkin
 * Released under the MIT license
 * github.com/Octane/Promise
 */
(function (global) {
  const STATUS = '[[PromiseStatus]]';
  const VALUE = '[[PromiseValue]]';
  const ON_FUlFILLED = '[[OnFulfilled]]';
  const ON_REJECTED = '[[OnRejected]]';
  const ORIGINAL_ERROR = '[[OriginalError]]';
  const PENDING = 'pending';
  const INTERNAL_PENDING = 'internal pending';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';
  const NOT_ARRAY = 'not an array.';
  const REQUIRES_NEW = 'constructor Promise requires "new".';
  const CHAINING_CYCLE = 'then() cannot return same Promise that it resolves.';

  const setImmediate = global.setImmediate || require('timers').setImmediate;
  const isArray = Array.isArray || function (anything) {
    return Object.prototype.toString.call(anything) === '[object Array]';
  };

  function InternalError(originalError) {
    this[ORIGINAL_ERROR] = originalError;
  }

  function isInternalError(anything) {
    return anything instanceof InternalError;
  }

  function isObject(anything) {
    // Object.create(null) instanceof Object → false
    return Object(anything) === anything;
  }

  function isCallable(anything) {
    return typeof anything === 'function';
  }

  function isPromise(anything) {
    return anything instanceof Promise;
  }

  function identity(value) {
    return value;
  }

  function thrower(reason) {
    throw reason;
  }

  function enqueue(promise, onFulfilled, onRejected) {
    if (!promise[ON_FUlFILLED]) {
      promise[ON_FUlFILLED] = [];
      promise[ON_REJECTED] = [];
    }
    promise[ON_FUlFILLED].push(onFulfilled);
    promise[ON_REJECTED].push(onRejected);
  }

  function clearAllQueues(promise) {
    delete promise[ON_FUlFILLED];
    delete promise[ON_REJECTED];
  }

  function callEach(queue) {
    let i;
    const { length } = queue;
    for (i = 0; i < length; i++) {
      queue[i]();
    }
  }

  function call(resolve, reject, value) {
    const anything = toPromise(value);
    if (isPromise(anything)) {
      anything.then(resolve, reject);
    } else if (isInternalError(anything)) {
      reject(anything[ORIGINAL_ERROR]);
    } else {
      resolve(value);
    }
  }

  function toPromise(anything) {
    let then;
    if (isPromise(anything)) {
      return anything;
    }
    if (isObject(anything)) {
      try {
        then = anything.then;
      } catch (error) {
        return new InternalError(error);
      }
      if (isCallable(then)) {
        return new Promise((resolve, reject) => {
          setImmediate(() => {
            try {
              then.call(anything, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    }
    return null;
  }

  function resolvePromise(promise, resolver) {
    function resolve(value) {
      if (promise[STATUS] === PENDING) {
        fulfillPromise(promise, value);
      }
    }
    function reject(reason) {
      if (promise[STATUS] === PENDING) {
        rejectPromise(promise, reason);
      }
    }
    try {
      resolver(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  function fulfillPromise(promise, value) {
    let queue;
    const anything = toPromise(value);
    if (isPromise(anything)) {
      promise[STATUS] = INTERNAL_PENDING;
      anything.then(
        (value) => {
          fulfillPromise(promise, value);
        },
        (reason) => {
          rejectPromise(promise, reason);
        },
      );
    } else if (isInternalError(anything)) {
      rejectPromise(promise, anything[ORIGINAL_ERROR]);
    } else {
      promise[STATUS] = FULFILLED;
      promise[VALUE] = value;
      queue = promise[ON_FUlFILLED];
      if (queue && queue.length) {
        clearAllQueues(promise);
        callEach(queue);
      }
    }
  }

  function rejectPromise(promise, reason) {
    const queue = promise[ON_REJECTED];
    promise[STATUS] = REJECTED;
    promise[VALUE] = reason;
    if (queue && queue.length) {
      clearAllQueues(promise);
      callEach(queue);
    }
  }

  function Promise(resolver) {
    const promise = this;
    if (!isPromise(promise)) {
      throw new TypeError(REQUIRES_NEW);
    }
    promise[STATUS] = PENDING;
    promise[VALUE] = undefined;
    resolvePromise(promise, resolver);
  }

  Promise.prototype.then = function (onFulfilled, onRejected) {
    const promise = this;
    let nextPromise;
    onFulfilled = isCallable(onFulfilled) ? onFulfilled : identity;
    onRejected = isCallable(onRejected) ? onRejected : thrower;
    nextPromise = new Promise((resolve, reject) => {
      function tryCall(func) {
        let value;
        try {
          value = func(promise[VALUE]);
        } catch (error) {
          reject(error);
          return;
        }
        if (value === nextPromise) {
          reject(new TypeError(CHAINING_CYCLE));
        } else {
          call(resolve, reject, value);
        }
      }
      function asyncOnFulfilled() {
        setImmediate(tryCall, onFulfilled);
      }
      function asyncOnRejected() {
        setImmediate(tryCall, onRejected);
      }
      switch (promise[STATUS]) {
        case FULFILLED:
          asyncOnFulfilled();
          break;
        case REJECTED:
          asyncOnRejected();
          break;
        default:
          enqueue(promise, asyncOnFulfilled, asyncOnRejected);
      }
    });
    return nextPromise;
  };

  Promise.prototype.catch = function (onRejected) {
    return this.then(identity, onRejected);
  };

  Promise.resolve = function (value) {
    const anything = toPromise(value);
    if (isPromise(anything)) {
      return anything;
    }
    return new Promise((resolve, reject) => {
      if (isInternalError(anything)) {
        reject(anything[ORIGINAL_ERROR]);
      } else {
        resolve(value);
      }
    });
  };

  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };

  Promise.race = function (values) {
    return new Promise((resolve, reject) => {
      let i;
      let length;
      if (isArray(values)) {
        length = values.length;
        for (i = 0; i < length; i++) {
          call(resolve, reject, values[i]);
        }
      } else {
        reject(new TypeError(NOT_ARRAY));
      }
    });
  };

  Promise.all = function (values) {
    return new Promise((resolve, reject) => {
      let fulfilledCount = 0;
      let promiseCount = 0;
      let anything;
      let length;
      let value;
      let i;
      if (isArray(values)) {
        values = values.slice(0);
        length = values.length;
        for (i = 0; i < length; i++) {
          value = values[i];
          anything = toPromise(value);
          if (isPromise(anything)) {
            promiseCount++;
            anything.then(
              (function (index) {
                return function (value) {
                  values[index] = value;
                  fulfilledCount++;
                  if (fulfilledCount === promiseCount) {
                    resolve(values);
                  }
                };
              }(i)),
              reject,
            );
          } else if (isInternalError(anything)) {
            reject(anything[ORIGINAL_ERROR]);
          } else {
            // [1, , 3] → [1, undefined, 3]
            values[i] = value;
          }
        }
        if (!promiseCount) {
          resolve(values);
        }
      } else {
        reject(new TypeError(NOT_ARRAY));
      }
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = global.Promise || Promise;
  } else if (!global.Promise) {
    global.Promise = Promise;
  }
}(this));
