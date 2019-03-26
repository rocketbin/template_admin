import { route, axe, loginchecker } from 'assets/backend'
import { _token, _user } from 'assets/token'
import router from 'src/router'

export const _purl = {

  /**
   * @param sets the token param;
   * @var str;
  */
  setToken () {
    var _t = '?token=' + localStorage.getItem('_rt')
    return _t
  },



  /**
   * @param rehashes the token;
   * @var bool;
  */
  logged () {
    // var _u = _user.getUser()
    var log = _token.checkToken()
    if (!log) {
      _token.release()
      if (router.currentRoute.fullPath !== '/login') {
        router.push('/login')
        return false
      }
    } else {
      if (_token.checkExpire()) {
        return false
      } else {
        return true
      }
    }
  },

  /**
   * @param stores the raw token;
   * @var func;
  */
  rawToken () {
    return localStorage.getItem('_rt')
  },

  /**
   * @param data | user info ;
   * @var returns func;
  */
  signup (data) {
    var _r = route.signup
    return axe.post(_r, data)
  },

  /**
   * @param data | user info;
   * @var func;
  */
  signin (data) {
    var _r = route.signin
    return axe.post(_r, data)
  },

  /**
   * @param data | user info;
   * @var func;
  */
  signinByKey (data) {
    var _r = route.onkey
    return axe.post(_r, data)
  },

  /**
   * @param throws the post request to the server;
   * @var func;
  */
  throwPost (xuri, data = {}) {
    var _t = this.setToken()
    var _r = xuri + _t
    if (data === '' || data === null) {
      return axe.post(_r)
    } else {
      return axe.post(_r, data)
    }
  },

  /**
   * @param xuri | data : constructs the post function;
   * @var func;
  */
  post (xuri, data = {}) {
    if (!this.logged()) {
      return _user.rehash().then(r => {
        return this.throwPost(xuri, data)
      })
    } else {
      return this.throwPost(xuri, data)
    }
  },

  /**
   * @param throws the post request to the server;
   * @var func;
  */
  throwPatch (xuri, prop, data = {}) {
    var _t = this.setToken()
    var _r = xuri + '/' + prop + _t
    if (data === '' || data === null) {
      return axe.patch(_r)
    } else {
      return axe.patch(_r, data)
    }
  },

  /**
   * @param xuri | data : constructs the post function;
   * @var func;
  */
  patch (xuri, prop,data = {}) {
    if (!this.logged()) {
      return _user.rehash().then(r => {
        return this.throwPatch(xuri, prop, data)
      })
    } else {
      return this.throwPatch(xuri, prop, data)
    }
  },
  /**
   * @param throws the get request to the server;
   * @var func;
  */
  throwGet (xuri, data = {}) {
    var _t = this.setToken()
    var _r = xuri + _t
    let params = ''
    Object.keys(data).map(r => {
      params +='&' + r + '=' +data[r];
    })
    if (data === '' || data === null) {
      return axe.get(_r)
    } else {
      return axe.get(_r + params)
    }
  },

  /**
   * @param xuri | data : constructs the get function;
   * @var func;
  */
  get (xuri, data = {}) {
    if (!this.logged()) {
      return _user.rehash().then(r => {
        return this.throwGet(xuri, data)
      })
    } else {
      return this.throwGet(xuri, data)
    }
  },

  /**
   * @param xuri | data : posts without token;
   * @var func;
  */
  _p (uri, data = {}) {
    var _r = uri
    if (Object.keys(data).length === 0 || data === null) {
      return axe.post(_r)
    } else {
      return axe.post(_r, data)
    }
  },

  postRequest (uri, data = {}) {
      return axe.post(uri, data,{
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('_rt')
        }
      })
  },

  /**
   * @param uri | data : get without token;
   * @var func;
  */
  _g (uri, data = {}) {
    var _r = uri
    if (Object.keys(data).length === 0 || data === null) {
      return axe.get(_r)
    } else {
      return axe.get(_r, data)
    }
  },

  /**
   * @param xuri | header | data : returns a get request with constructed header;
   * @var func;
  */
  _gPutHeader (xuri, header = {}, data = {}) {
    var _t = this.setToken()
    var _r = xuri + _t
    var _h = {
      headers: header
    }
    return axe.get(_r, data, _h)
  },
  /**
   * @param xuri | data : constructs the post function;
   * @var func;
  */
  put (xuri, data = {}) {
    if (this.logged()) {
      var _t = this.setToken()
      var _r = xuri + _t
      if (data === '' || data === null) {
        return axe.put(_r)
      } else {
        return axe.put(_r, data)
      }
    }
  },

  /**
   * @param xuri | data : constructs the delete function;
   * @var func;
  */
  delete (xuri, prop) {
    if (this.logged()) {
      var _t = this.setToken()
      var _r = xuri + '/' + prop + _t
      return axe.delete(_r)
    }
  },

  /**
   * @param throws the post request with wildcards to the server;
   * @var func;
  */
  throwWPost (xuri, wildcard, data = {}) {
    var _t = this.setToken()
    var _r = xuri + wildcard + _t
    return axe.post(_r)
  },

  /**
   * @param xuri | wildcard | data: sends a post form with a wildcard data;
   * @var func;
  */
  w_post (xuri, wildcard, data = {}) {
    if (!this.logged()) {
      return _user.rehash().then(r => {
        return this.throwWPost(xuri, wildcard, data)
      })
    } else {
      return this.throwWPost(xuri, wildcard, data)
    }
  },

  /**
   * @param xuri | header | data : returns a put request with constructed header;
   * @var func;
  */
  putHeader (xuri, header = {}, data = {}) {
    if (this.logged()) {
      var _t = this.setToken()
      var _r = xuri + _t
      var _h = {
        headers: header
      }
      return axe.post(_r, data, _h)
    }
  }

}
export const _sys = {
  /**
   * @param submits a query request for the accounts;
   * @var ;
  */
  checkLogin () {
    // console.log(loginchecker)
    return _purl._gPutHeader(loginchecker, {'Content-Type': 'application/json'})
  },
  /**
   * @param submits a query request for the accounts;
   * @var ;
  */
  accounts () {
    return _purl.post(route.accounts.fetch)
  },
  /**
   * @param gets the list of countries
   * @var ;
  */
  countries (data) {
    return _purl.post(route.config.countries)
  },
  /**
   * @param submits a query request for the lists of permission per positions ;
   * @var ;
  */
  positions (data) {
    return _purl.post(route.admin.positions.getpositions, {
      type: data
    })
  },
  /**
   * @param returns the lists of the notifications ;
   * @var ;
  */
  rules () {},
  /**
   * @param submits a query request for the suppliers;
   * @var ;
  */
  notifications () {
    return _purl.get(route.notifications.fetch)
  },
  suppliers (data) {
    return _purl.post(route.supplier.list)
  }
}
