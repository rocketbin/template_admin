import { route, axe } from 'assets/backend'
import { _glob } from 'assets/global'
import { Router } from 'src/router/index'
export const ignoreRoutes = ['/forgotPassword', '/quote', '/portal/quote', '/portal/status','/set-password', '/login/baseauth', '/portal/login']

export const _token = {

  /**
   * @param [token, user] sets up the token;
   * @var x;
  */
  integrate (token_, user_, account_ = []) {
    var _t = this.hash(token_)
    this.store((window.atob(_t)))
    localStorage.setItem('_rt', token_)
    _user.storeUser(user_)
    _accounts.storeAccounts(account_)
  },

  /**
   * @param token | stores raw token;
   * @var x;
  */
  store (t) {
    localStorage.setItem('_t', t)
  },

  /**
   * @param token | release token information;
   * @var string;
  */
  hash (_t) {
    const b64url = _t.split('.')[1]
    const b64 = b64url.replace('-', '+').replace('_', '/')
    return b64
  },

  /**
   * @param returns the parsed token;
   * @var str;
  */
  getToken () {
    return JSON.parse(localStorage.getItem('_t'))
  },

  /**
   * @param ;
   * @var obj;
  */
  getRawToken () {
    return localStorage.getItem('_rt')
  },

  /**
   * @param checks the token existence;
   * @var bool;
  */
  checkToken () {
    const _t = localStorage.getItem('_t')
    if (_t === null || _t === undefined) {
      return false
    } else {
      return true
    }
  },

  /**
   * @param deletes the token;
   * @var x ;
  */
  release () {
    localStorage.clear()
  },

  /**
   * @param checks if the user needs to change password;
   * @var x ;
  */
  checkPasswordStatus () {
    var _u = _user.getUser()
    if (Number(_u.require_password_change) === 1) {
      return true
    } else {
      return false
    }
  },

  /**
   * @param checks if the user needs to change password;
   * @var x ;
  */
  deactivatedUser () {
    var _u = _user.getUser()
    if (Number(_u.active) < 1) {
      return true
    } else {
      return false
    }
  },

  /**
   * @param checks if the user needs to change password;
   * @var x ;
  */
  relievePasswordStatus () {
    var _u = _user.getUser()
    _u.require_password_change = 0
    _user.storeUser(_u)
  },

  /**
   * @param checks if the user needs to change password;
   * @var x ;
  */
  verifyPassword (pass) {
    var _u = _user.getUser()
    if (window.atob(_u.encpas) === pass) {
      return true
    } else {
      return false
    }
  },

  /**
   * @param deletes the token;
   * @var x ;
  */
  checkExpire () {
    var _t = this.getToken()
    var _time = new Date(_t.exp * 1000)
    var _now = new Date()
    if (_time < _now) {
      // user.rehash()
      return true
    } else {
      return false
    }
  }
}

export const _user = {
  hasAuth () {
    if (localStorage.getItem('_rt') === null) {
      return false
    }
    return true
  },
  /**
   * @param gets the user information ;
   * @var x ;
  */
  getUser () {
    let _u = localStorage.getItem('_u')
    if (_u !== null) {
      return JSON.parse(window.atob(_u))
    } else {
      return []
    }
  },

  /**
   * @param user | encodes and stores the user information;
   * @var x ;
  */
  storeUser (_u) {
    var hash = window.btoa(JSON.stringify(_u))
    localStorage.setItem('_u', hash)
  },

  /**
   * @param user | stores that encoded variable value with a given variable name
   * @var x ;
  */
  storeVar (_v, _item) {
    var hash = window.btoa(JSON.stringify(_item))
    localStorage.setItem(_v, hash)
  },

  /**
   * @param user | updates the vars data
   * @var x ;
  */
  updateVar (_v, _item) {
    if (localStorage.getItem(_v) === null) {
      localStorage.removeItem(_v)
    }
    var hash = window.btoa(JSON.stringify(_item))
    localStorage.setItem(_v, hash)
  },

  /**
   * @param user | returns the decoded var value from a given name
   * @var x ;
  */
  getVar (_v) {
    if (localStorage.getItem(_v) !== null) {
      return JSON.parse(window.atob(localStorage.getItem(_v)))
    } else {
      return []
    }
  },

  /**
   * @param user | rehashes the user for a new exchange token;
   * @var ;
  */
  rehash () {
    let _u = this.getUser()
    var _r = route.signin
    return axe.post(_r, { email: _u.email, password: window.atob(_u.encpas) }).then(r => {
      r.data.user.encpas = _u.encpas
      r.data.user.logged = true
      _token.integrate(r.data.token, r.data.user)
      _glob.notify('logged in!', 'positive')
      return true
    }).catch(e => {
      if (e.response) {
        _glob.notify('Oops! we cant recognize your username / password', 'negative')
      } else {
        _glob.notify('Sorry, we are having server issues right now, please login later ', 'negative')
      }
      _token.release()
      router.push('/login')
      return false
    })
  }
}

export const _accounts = {
  /**
   * @param gets the Accounts information ;
   * @var x ;
  */
  getAccounts () {
    let _a = localStorage.getItem('_a')
    if (_a !== null) {
      return JSON.parse(window.atob(_a))
    } else {
      return []
    }
  },

  /**
   * @param gets the Account information ;
   * @var x ;
  */
  getAccount () {
    let _activeAccount = localStorage.getItem('_activeAccount')
    if (_activeAccount !== null) {
      return JSON.parse(window.atob(_activeAccount))
    } else {
      return []
    }
  },


  /**
   * @param sets the active Account information ;
   * @var x ;
  */
  storeAccount (_activeAccount) {
    var hash = window.btoa(JSON.stringify(_activeAccount))
    localStorage.setItem('_activeAccount', hash)
  },

  /**
   * @param gets the activity information ;
   * @var x ;
  */
  getActivity (localname) {
    let _act = localStorage.getItem(window.btoa('@' + localname))
    if (_act !== null) {
      return JSON.parse(window.atob(_act))
    } else {
      return false
    }
  },

  /**
   * @param Account | encodes and stores the Account information;
   * @var x ;
  */

  storeAccounts (_a) {
    var hash = window.btoa(JSON.stringify(_a))
    localStorage.setItem('_a', hash)
  },

  /**
   * @param Account | encodes and stores the Account information;
   * @var x ;
  */
  storeActivity (_r, localname) {
    var objs = {
      'active': _r
    }
    var cache = []
    localStorage.setItem(window.btoa('@' + localname), window.btoa(JSON.stringify(objs,
      function (key, value) {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            try {
              return JSON.parse(JSON.stringify(value))
            } catch (error) {
              return
            }
          }
          cache.push(value)
        }
        return value
      }
    )))
  }
}
