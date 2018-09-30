<template>
  <div v-if="!loaded" class="text-xs-center">
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
  </div>
  <v-card v-else>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Mijn recepten</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="(recipe, index) in recipes" :key="'recipe' + index">
          <div slot="header">{{ recipe.name }}</div>
          <v-card>
            <v-card-text>Wat moet hier komen te staan?</v-card-text>
            <v-card-actions>
              <v-rating :value="recipe.rating" readonly />
              <v-spacer />
              <v-btn color="error" @click="deleteItem(recipe['.key'])">Verwijderen</v-btn>
              <v-btn :to="{ name: 'recipe-id', params: { id: recipe['.key'] }}" nuxt color="primary">Open</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn to="/recipe/new" nuxt color="primary">Nieuw recept</v-btn>
      <v-btn flat color="primary" @click="logout">Uitloggen</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { fireDB, fireAuth } from "~/plugins/vuefire.js"

export default {
  firebase() {
    return {
      recipes: {
        source: fireDB.ref(`/Recipes/${this.user.uid}`),
        asObject: false,
        readyCallback: () => {
          this.loaded = true
        }
      }
    }
  },

  data() {
    return {
      loaded: false
    }
  },

  computed: {
    user() {
      if (this.$store.getters.isLoggedIn) return this.$store.state.user
    }
  },

  methods: {
    logout() {
      fireAuth.signOut().then(() => {
        this.$router.push("/")
      })
    },

    deleteItem(id) {
      this.$firebaseRefs.recipes.child(id).remove()
    }
  }
}
</script>
