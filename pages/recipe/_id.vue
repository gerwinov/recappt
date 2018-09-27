<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-btn class="mb-2" primary @click="logout">Logout</v-btn>

      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Recepten</v-toolbar-title>
        </v-toolbar>

        {{ recipe }}

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { fireDB, fireAuth } from "~/plugins/vuefire.js"

export default {
  firebase() {
    return {
      recipe: fireDB.ref(`/Recipes/${this.user.uid}/${this.id}`)
    }
  },

  computed: {
    user() {
      if (this.$store.getters.isLoggedIn) return this.$store.state.user
    },
    id() {
      return this.$route.params.id
    }
  },

  methods: {
    // Move this to drawer..
    logout() {
      fireAuth.signOut().then(() => {
        this.$router.push("/login")
      })
    }
  }
}
</script>
