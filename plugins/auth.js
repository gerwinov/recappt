import { fireAuth } from "~/plugins/vuefire.js"

export default function({ store }) {
  fireAuth.onAuthStateChanged(user => {
    store.commit("SET_USER", user)
  })
}
