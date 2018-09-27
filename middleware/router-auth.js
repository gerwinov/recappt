export default function({ store, redirect, route }) {
  if (store.getters.isLoggedIn && route.name === "login") redirect("/recipe")
  if (!store.getters.isLoggedIn && isAdminRoute(route)) redirect("/login")
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === "/recipe")) {
    return true
  }
}
