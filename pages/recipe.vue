<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-btn class="mb-2" primary @click="logout">Logout</v-btn>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Recepten</v-toolbar-title>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(recipe, index) in recipes">
            <v-list-tile
              :key="recipe.Name"
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="recipe.Name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="recipe.Text"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
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
