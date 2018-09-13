import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// This should go in .env! These are dev variables.
let config = {
  apiKey: 'AIzaSyAeSp9g0g_dAqNE_y8PISylOGtRzVnq1oo',
  authDomain: 'recappt-db1.firebaseapp.com',
  databaseURL: 'https://recappt-db1.firebaseio.com',
  projectId: 'recappt-db1',
  storageBucket: 'recappt-db1.appspot.com',
  messagingSenderId: '122668327272'
}

let firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase

// Register fireDB globally
Vue.mixin({
  data () {
    return {
      get fireDB () {
        return firebaseApp.database()
      }
    }
  }
})

Vue.use(VueFire)
