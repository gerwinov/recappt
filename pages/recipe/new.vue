<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Nieuw recept</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-alert v-if="error" :value="error" type="error" transition="scale-transition">
        {{ error }}
      </v-alert>
      <v-form @submit="addRecipe">
        <v-text-field v-model="name" :error="hasError" label="Naam" required @input="error = null" />
        <v-textarea v-model="text" :error="hasError" label="Beschrijving" hint="Hoe moet het recept gemaakt worden?" required @input="error = null" />
        <v-rating v-model="rating" />
        <v-textarea v-model="ratingComments" :error="hasError" label="Beschrijving bij beoordeling" hint="Wat vond je er zelf van?" required @input="error = null" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn flat to="/recipe" nuxt color="primary">Terug</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="addRecipe">Toevoegen</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { fireDB, fireAuth } from "~/plugins/vuefire.js"

export default {
  data() {
    return {
      name: "",
      text: "",
      rating: 0,
      ratingComments: "",
      error: null
    }
  },

  computed: {
    user() {
      return fireAuth.currentUser
    },
    hasError() {
      return this.error ? true : false
    }
  },

  methods: {
    addRecipe() {
      fireDB.ref(`/Recipes/${this.user.uid}`).push(
        {
          name: this.name,
          text: this.text,
          rating: this.rating,
          ratingComments: this.ratingComments
        },
        error => {
          if (error) {
            this.error = error
            return
          }
          this.$router.push("/recipe")
        }
      )
    }
  }
}
</script>
