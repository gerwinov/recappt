<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Inloggen</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-alert v-if="error" :value="error" type="error" transition="scale-transition">
        {{ error }}
      </v-alert>
      <v-form @keyup.native.enter="login">
        <v-text-field v-model="email" :error="hasError" prepend-icon="person" name="login" label="E-mailadres" type="text" required @input="error = null" />
        <v-text-field v-model="password" :error="hasError" prepend-icon="lock" name="password" label="Wachtwoord" type="password" required @input="error = null" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn flat to="/register" nuxt color="primary">Registreren</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { fireAuth } from "~/plugins/vuefire.js"

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    }
  },

  computed: {
    hasError() {
      return this.error ? true : false
    }
  },

  methods: {
    login() {
      fireAuth.setPersistence("local").then(() => {
        fireAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push("/recipe")
          })
          .catch(error => {
            this.error = error.message
          })
      })
    }
  }
}
</script>
