import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'

import { clientsClaim, setCacheNameDetails, skipWaiting } from 'workbox-core'

import {
  NetworkFirst,
  NetworkOnly,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies'

// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from 'workbox-expiration'

console.log(
  '   [  VER-0.0.65 ] _---------________------  PAO: this is my custom service worker')

importScripts('js/idb.js')
importScripts('js/storage.js')
// importScripts('js/workbox-sw.js')

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// importScripts('./ChabokSDKWorker.js', 'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

let port = 3000
if (self.location.hostname.startsWith('test')) {
  port = 3001
}
console.log('SW-06 1')

const cfgenv = {
  serverweb: `${self.location.protocol}//${self.location.hostname}:${port}`,
  dbname: 'mydb3',
  dbversion: 11,
}

// console.log('serverweb', cfgenv.serverweb)

async function writeData (table, data) {
  // console.log('writeData', table, data);
  await idbKeyval.setdata(table, data)
}

async function readAllData (table) {
  // console.log('readAllData', table);
  return idbKeyval.getalldata(table)
}

async function clearAllData (table) {
  // console.log('clearAllData', table);
  await idbKeyval.clearalldata(table)
}

async function deleteItemFromData (table, id) {
  // console.log('deleteItemFromData', table, 'ID:', id);

  await idbKeyval.deletedata(table, id)
}

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     // createDB()
//   );
// });

if (!workbox) {
  const workbox = new self.WorkboxSW()
}

if (workbox) {
  const debug = true
  workbox.setConfig({ debug })

  const precacheList = self.__WB_MANIFEST || [];
  setCacheNameDetails({
    prefix: self.location.hostname,
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime'
  })

  // clientsClaim()
  // skipWaiting()

  precacheAndRoute(precacheList)
  // cleanupOutdatedCaches()

  registerRoute(
    new RegExp(/\.(?:png|gif|jpg|jpeg|svg)$/),
    new CacheFirst({
      cacheName: 'images',
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  )

  // Per Articoli....
  const articleHandler = new NetworkFirst({
    cacheName: 'articles-cache',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  })

  registerRoute(
    new RegExp(/(.*)article(.*)\.html/), args => articleHandler.handle(args),
  )

  registerRoute(
    new RegExp(/.*(?:googleapis|gstatic)\.com.*$/),
    new StaleWhileRevalidate({
      cacheName: 'google-fonts',
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
        new ExpirationPlugin({
          maxEntries: 30,
        }),
      ],
    }),
  )

  // console.log('  routing.registerRoute function declaration:')

  function Execute_Fetch (table, args) {
    console.log('Execute_Fetch registerRoute! ',
      `${cfgenv.serverweb}/${table}/`)
    // console.log('DATABODY:', args.event.request.body)
    let myres = null
    // return fetch(args.event.request, args.event.headers)
    return fetch(args.event.request, args.event.headers)
      .then((res) => {
        myres = res
        if (res.status === 200) {
          const clonedRes = res.clone()

          let secondatab = ''
          if (table === 'todos') {
            secondatab = 'categories'
          }
          console.log('1) clearAllData: ', table)
          return clearAllData(table)
            .then(() => {
              if (secondatab !== '') {
                // console.log('2) clearAllData(todos)')
                return clearAllData(secondatab)
                  .then(() =>
                    // console.log('3)  ....return clonedRes')
                    clonedRes)
              }
              return clonedRes
            })
        }
      })
      .then((clonedRes) => {
        // console.log('  3) ')
        if (clonedRes) return clonedRes.json()
        return null
      })
      .then(data => {
        // console.log('  4) data = ', data)
        if (data) {
          const myarr = idbKeyval.getArrayByTable(table, data)
          if (myarr) {
            let promiseChain = Promise.resolve()

            console.log('*********+++++++++++++++++**********    Records ',
              `${table} Received from Server [`, myarr.length, 'record]', myarr)

            if (table === 'todos') {
              for (const cat in data.categories) {
                promiseChain = promiseChain.then(() => writeData('categories', {
                  _id: cat,
                  valore: data.categories[cat],
                }))
              }

              for (const arrsing of myarr) {
                for (const rec of arrsing) {
                  promiseChain = promiseChain.then(() => writeData(table, rec))
                }
              }
            } else {
              // Others tables
              for (const rec of myarr) {
                promiseChain = promiseChain.then(() => writeData(table, rec))
              }
            }

            // console.log('promiseChain', promiseChain)

            return promiseChain
          }
        }
      })
      .then(() => myres)
      .catch(err => {
        console.log('ERROR registerRoute FETCH:', err)
        return myres
      })
  }

  for (const table of MainTables) {
    registerRoute(
      new RegExp(`${cfgenv.serverweb}/${table}/`),
      (args) => {
        Execute_Fetch(table, args)
      },
    )
  }

  registerRoute(
    (routeData) => (routeData.event.request.headers.get('accept')
      .includes('text/html')), (args) => caches.match(args.event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(args.event.request)
          .then((res) => caches.open('dynamic')
            .then((cache) => {
              cache.put(args.event.request.url, res.clone())
              return res
            }))
          .catch((err) => caches.match('/offline')
            .then((res) => res))
      }),
  )

  registerRoute(
    new RegExp(/.*\/(?:statics\/icons).*$/),
    new CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    }),
  )

  registerRoute(
    new RegExp(/\.(?:js|css|font)$/),
    new StaleWhileRevalidate({
      cacheName: 'js-css-fonts',
      // Ensure that only requests that result in a 200 status are cached
      plugins: [
        new CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    }),
  )

  // Storage
  registerRoute(
    new RegExp(/.*(?:storage)/),
    new StaleWhileRevalidate({
      cacheName: 'storage',
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
          // Only cache 10 requests.
          maxEntries: 200,
        }),
      ],
    }),
  )

  registerRoute(
    new RegExp(/.*\/(?:statics).*$/),
    new CacheFirst({
      cacheName: 'statics',
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new CacheableResponsePlugin({
          statuses: [200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 10 * 24 * 60 * 60,
          // Only cache 10 requests.
        }),
      ],
    }),
  )

  registerRoute(
    new RegExp('/admin/'),
    new NetworkOnly(),
  )

  /*registerRoute(
    new RegExp('/owa/'),
    new NetworkOnly(),
  )
   */

}

if ('serviceWorker' in navigator) {

  // console.log('*****************      Entering in custom-service-worker.js:')

}

// self.addEventListener('fetch', (event) => {
//   if (event.request.url === '/') {
//     const StaleWhileRevalidate = new StaleWhileRevalidate();
//     event.respondWith(StaleWhileRevalidate.handle({ event }));
//   }
// });

// self.addEventListener('fetch', function (event) {
//   console.log('[Service Worker] Fetching something ....', event);
//   console.log('event.request.cache=', event.request.cache)
//   if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
//     console.log('SAME ORIGIN!', event);
//     return;
//   }
//   event.respondWith(caches.match(event.request));
// });
//

// const syncStore = {}
// self.addEventListener('message', event => {
//   if (event.data.type === 'sync') {
//     // get a unique id to save the data
//     const id = uuid()
//     syncStore[id] = event.data
//     // register a sync and pass the id as tag for it to get the data
//     self.registration.sync.register(id)
//   }
//   console.log(event.data)
// })

// addEventListener('fetch', event => {
//   // Prevent the default, and handle the request ourselves.
//   event.respondWith(async function() {
//     // Try to get the response from a cache.
//     const cachedResponse = await caches.match(event.request);
//     // Return it if we found one.
//     if (cachedResponse && (event.request.cache !== 'no-cache'))
//       return cachedResponse;
//
//     // If we didn't find a match in the cache, use the network.
//     return fetch(event.request);
//   }());
// });

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       return response ||
//         fetch(event.request, event.headers)
//           .catch(err => {
//             console.log('_______________________ ERRORE FETCH SW: ', event.request, err)
//             writeData('config', { _id: 2, stateconn: 'offline' })
//             return caches.match(event.request);
//           })
//     })
//   );
// });

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request, event.headers)
//       .catch(err => {
//         console.log('_______________________ ERRORE FETCH SW: ', event.request, err)
//         writeData('config', {_id: 2, stateconn: 'offline'})
//         return caches.match(event.request);
//       })
//   );
// });

// self.addEventListener('sync', function (event) {
//   console.log('[Service Worker V5] Background syncing', event.tag);
//
//   let mystrparam = event.tag
//   let multiparams = mystrparam.split('|')
//   if (multiparams) {
//     if (multiparams.length > 3) {
//       let cmd = multiparams[0]
//       let table = multiparams[1]
//       let method = multiparams[2]
//       let token = multiparams[3]
//       // let lang = multiparams[3]
//
//       if (cmd === 'sync-todos') {
//         console.log('[Service Worker] Syncing', cmd, table, method);
//
//         const headers = new Headers()
//         headers.append('content-Type', 'application/json')
//         headers.append('Accept', 'application/json')
//         headers.append('x-auth', token)
//
//
//         // console.log('A1) INIZIO.............................................................');
//
//         event.waitUntil(
//           readAllData(table)
//             .then(function (alldata) {
//               const myrecs = [...alldata]
//               console.log('----------------------- LEGGO QUALCOSA DAL WAITUNTIL ')
//               let errorfromserver = false
//               if (myrecs) {
//                 for (let rec of myrecs) {
//                   //console.log('syncing', table, '', rec.descr)
//                   let link = cfgenv.serverweb + '/todos'
//
//                   if (method !== 'POST')
//                     link += '/' + rec._id
//
//                   console.log('++++++++++++++++++ SYNCING !!!!  ', rec.descr, table, 'FETCH: ', method, link, 'data:')
//
//                   // console.log('DATATOSAVE:', JSON.stringify(rec))
//
//                   // Insert/Delete/Update table to the server
//                   fetch(link, {
//                     method: method,
//                     headers: headers,
//                     cache: 'no-cache',
//                     mode: 'cors',   // 'no-cors',
//                     body: JSON.stringify(rec)
//                   })
//                     .then(() => {
//                       deleteItemFromData(table, rec._id)
//                     })
//                     .then(() => {
//                       deleteItemFromData('swmsg', mystrparam)
//                     })
//                     .catch(function (err) {
//                       console.log('!!!!!!!!!!!!!!!   Error while sending data', err, err.message);
//                       if (err.message === 'Failed to fetch') {
//                         errorfromserver = true
//                       }
//                     })
//                 }
//                 return errorfromserver
//               }
//             })
//             .then((errorfromserver) => {
//               const mystate = !errorfromserver ? 'online' : 'offline'
//               writeData('config', { _id: 2, stateconn: mystate })
//             })
//         );
//         // console.log('A2) ?????????????????????????? ESCO DAL LOOP !!!!!!!!! err=')
//       }
//     }
//   }
// })
// ;

/*

// send message to serviceWorker
function sync (url, options) {
  navigator.serviceWorker.controller.postMessage({type: 'sync', url, options})
}

const syncStore = {}
self.addEventListener('message', event => {
  if(event.data.type === 'sync') {
    // get a unique id to save the data
    const id = uuid()
    syncStore[id] = event.data
    // register a sync and pass the id as tag for it to get the data
    self.registration.sync.register(id)
  }
  console.log(event.data)
})

self.addEventListener('sync', event => {
  // get the data by tag
  const {url, options} = syncStore[event.tag]
  event.waitUntil(fetch(url, options))
})
*/

self.addEventListener('notificationclick', (event) => {
  const { notification } = event
  const { action } = event

  console.log(notification)

  if (action === 'confirm') {
    console.log('Confirm was chosen')
    notification.close()
  } else {
    console.log(action)
    event.waitUntil(
      clients.matchAll()
        .then((clis) => {
          const client = clis.find((c) => c.visibilityState === 'visible')

          if (client) {
            client.navigate(notification.data.url)
            client.focus()
          } else {
            clients.openWindow(notification.data.url)
          }
          notification.close()
        }),
    )
  }
})

self.addEventListener('notificationclose', (event) => {
  console.log('Notification was closed', event)
})

self.addEventListener('push', (event) => {
  console.log('Push Notification received', event)

  let data = {
    title: 'New!',
    content: 'Something new happened!',
    url: '/',
  }

  try {
    if (event.data) {
      try {
        data = JSON.parse(event.data.text())
      } catch (e) {
        data = event.data.text()
      }
    }

    const options = {
      body: data.content,
      icon: '/public/icons/android-chrome-192x192.png',
      badge: '/public/icons/android-chrome-192x192.png',
      data: {
        url: data.url,
      },
      tag: 'received',
      renitify: true, // vibrate also with others messages.
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options),
    )
  } catch (e) {
    console.log('Error on event push:', e)
  }
})
