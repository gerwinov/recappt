import Vue from "vue"
import VueFire from "vuefire"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

// This should go in .env! These are dev variables.
let config = {
  apiKey: "AIzaSyAeSp9g0g_dAqNE_y8PISylOGtRzVnq1oo",
  authDomain: "recappt-db1.firebaseapp.com",
  databaseURL: "https://recappt-db1.firebaseio.com",
  projectId: "recappt-db1",
  storageBucket: "recappt-db1.appspot.com",
  messagingSenderId: "122668327272"
}

let firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase

export const fireDB = firebaseApp.database()
export const fireAuth = firebaseApp.auth()
export const fireStorage = firebaseApp.storage()

Vue.use(VueFire)
