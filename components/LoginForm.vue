<template>
  <v-layout>
    <v-flex text-xs-center xs12 sm6 offset-sm3>
      <v-text-field
        v-model="name"
        label="Name"
        required
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      />
      <v-btn class="signIn mb-2" primary @click="login">Login</v-btn>
    </v-flex>
  </v-layout>

</template>

<script>
import { fireAuth } from "~/plugins/vuefire.js"

export default {
  data() {
    return {
      name: "",
      password: ""
    }
  },

  computed: {
    user() {
      return fireAuth.currentUser
    }
  },

  methods: {
    login() {
      fireAuth.setPersistence("local").then(() => {
        fireAuth
          .signInWithEmailAndPassword(this.name, this.password)
          .then(() => {
            this.$router.push("/recipe")
          })
      })
    }
  }
}
</script>
