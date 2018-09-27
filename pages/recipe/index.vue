<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-btn class="mb-2" primary @click="logout">Logout</v-btn>
      <nuxt-link to="/recipe/new">nieuw recept</nuxt-link>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Recepten</v-toolbar-title>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(recipe, index) in recipes">
            <v-list-tile
              :key="'recipe' + index"
              @click="alert('tett')"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="recipe.name"/>
                <v-list-tile-sub-title v-html="recipe.text"/>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { fireDB, fireAuth } from "~/plugins/vuefire.js"

export default {
  firebase() {
    return {
      recipes: fireDB.ref(`/Recipes/${this.user.uid}`)
    }
  },

  computed: {
    user() {
      if (this.$store.getters.isLoggedIn) return this.$store.state.user
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
