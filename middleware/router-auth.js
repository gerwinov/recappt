import { fireAuth } from '~/plugins/vuefire.js'

export default function ({ store, redirect, route }) {
  if (fireAuth.currentUser !== null && route.name === 'login') redirect('/user')
  if (fireAuth.currentUser === null && isAdminRoute(route)) redirect('/login')
}

function isAdminRoute (route) {
  if (route.matched.some(record => record.path === '/user')) {
    return true
  }
}
