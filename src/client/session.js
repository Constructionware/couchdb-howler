import cookie from './cookie'
import commonUtils from '../utils'

class Session {
  constructor () {
    this._name = 'couchdb-howler-session'
    this._cookie = cookie.getProvider(commonUtils.inBrowser())
  }

  // We use the async keyword to allow for swapping out the session store with an async store
  async set (id) {
    // We must set an expiration if we want the cookie to persist across app restarts. As per
    // https://stackoverflow.com/a/8713316/2831606 on iOS, cookies without an expiration are
    // considered session cookies and cleared when the app is restarted. The cookies will expire
    // after 30 days. TODO: make this value configurable via Client.
    this._cookie.set(this._name, id, { expires: 30 })
  }

  // We use the async keyword to allow for swapping out the session store with an async store
  async get () {
    return this._cookie.get(this._name)
  }

  // We use the async keyword to allow for swapping out the session store with an async store
  async clear () {
    await this._cookie.remove(this._name)
  }
}

module.exports = Session
