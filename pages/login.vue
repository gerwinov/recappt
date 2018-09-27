<template>
  <v-container>
    <login-form/>
    <nuxt-link to="/register">Registreren</nuxt-link>
  </v-container>
</template>

<script>
import LoginForm from "~/components/LoginForm"

export default {
  components: {
    LoginForm
  }
}
</script>
