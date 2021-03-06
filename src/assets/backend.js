import axios from 'axios'
import store from 'src/store/index'

export const axe = axios
let prod = 'dev' // 'local' | 'dev' | 'live'
var _apiroute, _signed, _pub, _localapiroute, _loginchecker, _storage // eslint-disable-line no-unused-vars

if (prod === 'local') {
  _apiroute       = 'http://localhost:8000/api/'
  _signed         = 'http://localhost:8000/api/signed/'
  _localapiroute  = 'http://localhost:8000/api/'
  _pub            = 'http://localhost:8080/'
  _loginchecker   =  'http://localhost:8000/api/'
  _storage        = 'http://localhost:8000/storage/'
}

if (prod === 'dev') {
  _apiroute       = 'http://admin.homeprezzo.com/api/api/'
  _signed         = 'http://admin.homeprezzo.com/api/api/'
  _localapiroute  = 'http://admin.homeprezzo.com/api/'
  _pub            = 'http://localhost:8080/'
  _loginchecker   = 'http://localhost:8000/api/'
  _storage        = 'http://admin.homeprezzo.com/api/storage/'
}

if (prod === 'live') {
  _apiroute       = 'http://localhost:8000/api/'
  _signed         = 'http://localhost:8000/api/signed/'
  _localapiroute  = 'http://localhost:8000/api/'
  _pub            = 'http://localhost:8080/'
  _loginchecker   =  'http://localhost:8000/api/'
  _storage        = 'http://localhost:8000/storage/'
}

// assign api compiler values
export const _prod          = prod
export const apiroute       = _apiroute
export const storage        = _storage
export const signed         = _signed
export const localapiroute  = _localapiroute
export const pub            = _pub
export const loginchecker   = _loginchecker

export const route = {
  signin: apiroute + 'attempt',
  colours: apiroute + 'colors',
  uploads: {
    image: apiroute + 'uploads/image',
    raw: apiroute + 'uploads/raw/read'
  },
  config: {
    types: apiroute + 'config/types'
  },
  jsscenes: {
    store: apiroute + 'js/store',
    update: js => apiroute + 'js/' + js + '/update'
  },
  scenes: {
    get: apiroute + 'scenes',
    save: apiroute + 'scenes/save',
    scene: scene => apiroute + 'scenes/' + scene,
    approve: scene => apiroute + 'scenes/' + scene + '/approve',
    deactivate: scene => apiroute + 'scenes/' + scene + '/deactivate',
  }
}