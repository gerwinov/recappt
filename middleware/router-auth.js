import { fireAuth } from "~/plugins/vuefire.js"

export default function({ redirect, route }) {
  console.log(fireAuth)
  console.log(fireAuth.currentUser)
  if (fireAuth.currentUser !== null && route.name === "login")
    redirect("/recipe")
  if (fireAuth.currentUser === null && isAdminRoute(route)) redirect("/login")
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === "/recipe")) {
    return true
  }
}
