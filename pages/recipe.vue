<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        {{ user }}
      </div>
      <br><br>
      <v-card>
        <p v-for="recipe in recipes">{{ recipe }}</p>
      </v-card>

      <v-btn class="signIn mb-2" primary @click="logout">Logout</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { fireDB, fireAuth } from '~/plugins/vuefire.js'

export default {
  firebase () {
    return {
      recipes: fireDB.ref('/Recipes')
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
        .then((response) => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
