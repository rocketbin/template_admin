import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import config from './config/index'
import modals from './modals/index'
import scripts from './scripts/index'
import colours from './colours/index'
import active from './active/index'
import tables from './tables/index'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      config,
      scripts,
      modals,
      active,
      tables,
      colours
    }
  })

  return Store
}
