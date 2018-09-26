<template>
  <v-container>
    <register-form></register-form>
    <nuxt-link to="/login">inloggen</nuxt-link>
  </v-container>
</template>

<script>
import RegisterForm from '~/components/RegisterForm'

export default {
  components: {
    RegisterForm
  }
}
</script>
