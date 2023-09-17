enum CacheType {
  Locacl,
  Session
}
class Cache {
  storeage: Storage;
  constructor(type: CacheType) {
    this.storeage = type === CacheType.Locacl ? localStorage : sessionStorage;
  }
  setChche(key: string, value: any) {
    if (value) {
      this.storeage.setItem(key, JSON.stringify(value));
    }
  }
  getChache(key: string) {
    const value = this.storeage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  removeCache(key: string) {
    this.storeage.removeItem(key);
  }
  clear() {
    this.storeage.clear();
  }
}

const localCache = new Cache(CacheType.Locacl);
const sessionCache = new Cache(CacheType.Session);

export { localCache, sessionCache };
