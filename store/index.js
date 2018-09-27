import VuexPersistence from "vuex-persist"

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const strict = false

export const plugins = [vuexLocal.plugin]

export const state = () => ({
  user: null
})

export const mutations = {
  ["SET_USER"](state, payload) {
    state.user = payload
  }
}

export const getters = {
  isLoggedIn: state => {
    return state.user !== null
  }
}
