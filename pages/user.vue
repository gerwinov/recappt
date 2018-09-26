<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <p v-for="user in users">{{ user.value }}</p>

        {{ user }}

        <v-btn class="signIn mb-2" primary @click="logout">Logout</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { fireDB, fireAuth } from '~/plugins/vuefire.js'

export default {
  firebase () {
    return {
      users: fireDB.ref('/')
    }
  },

  computed: {
    user () {
      return fireAuth.currentUser
    }
  },

  methods: {
    // Move this to drawer..
    logout () {
      fireAuth.signOut()
    }
  }
}
</script>
