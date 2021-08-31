const OtherTables = ['categories', 'config', 'swmsg']
const MainTables = ['todos', 'projects']
const allMethod = ['sync_post_', 'sync_patch_', 'delete_']

// -------------------------------------

let idbKeyval = (() => {
  let db;

  // console.log('idbKeyval...')

  function getDB() {
    if (!db) {
      // console.log('CREO DB STORAGE JS !')
      db = new Promise((resolve, reject) => {
        const openreq = indexedDB.open('mydb3', 11);

        openreq.onerror = () => {
          reject(openreq.error);
        };

        openreq.onupgradeneeded = () => {
          // First time setup: create an empty object store
          for (const mytab of MainTables) {
            openreq.result.createObjectStore(mytab, { keyPath: '_id' });
            for (const mymeth of allMethod) {
              const tab = mymeth + mytab
              openreq.result.createObjectStore(tab, { keyPath: '_id' });
            }
          }
          for (const mytab of OtherTables) {
            openreq.result.createObjectStore(mytab, { keyPath: '_id' });
          }
        };

        openreq.onsuccess = () => {
          resolve(openreq.result);
        };
      });
    }
    return db;
  }

  async function withStore(type, table, callback) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(table, type);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      callback(transaction.objectStore(table));
    });
  }

  return {
    getArrayByTable(nametable, data) {
      if (nametable === 'todos') {
        return data.todos
      } if (nametable === 'projects') {
        return data.projects
      }
    },

    async get(key) {
      let req;
      await withStore('readonly', 'keyval', store => {
        req = store.get(key);
      });
      return req.result;
    },

    // jsonCopy(src) {
    //   return JSON.parse(JSON.stringify(src));
    // },

    // contains(a, b) {
    //   // array matches
    //   if (Array.isArray(b)) {
    //     return b.some(x => a.indexOf(x) > -1);
    //   }
    //   // string match
    //   return a.indexOf(b) > -1;
    // },

    async getdata(table, key) {
      let req;

      await withStore('readonly', table, store => {
        // console.log('store', store, 'key', key)
        req = store.get(key);
      });

      return req.result;
    },
    async getalldata(table) {
      let req;
      await withStore('readonly', table, store => {
        req = store.getAll();
      });
      return req.result;
    },
    async set(key, value) {
      let req;
      await withStore('readwrite', 'keyval', store => {
        req = store.put(value, key);
      });
      return req.result;
    },
    async setdata(table, value) {
      let req;
      // console.log('setdata', table, value)

      await withStore('readwrite', table, store => {
        req = store.put(value);
      });
      return req.result;
    },
    async delete(key) {
      return withStore('readwrite', 'keyval', store => {
        store.delete(key);
      });
    },
    async deletedata(table, key) {
      return withStore('readwrite', table, store => {
        store.delete(key);
      });
    },
    async clearalldata(table) {
      // console.log('clearalldata', table)
      return withStore('readwrite', table, store => {
        store.clear();
      });
    },
  };
})();

// iOS add-to-homescreen is missing IDB, or at least it used to.
// I haven't tested this in a while.
if (!self.indexedDB) {
  idbKeyval = {
    get: key => Promise.resolve(localStorage.getItem(key)),
    set: (key, val) => Promise.resolve(localStorage.setItem(key, val)),
    delete: key => Promise.resolve(localStorage.removeItem(key)),
  };
}
