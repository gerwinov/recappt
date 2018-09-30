<template>
  <div v-if="!loaded" class="text-xs-center">
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
  </div>
  <v-card v-else>
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ recipe.name }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-alert v-if="error" :value="error" type="error" transition="scale-transition">
        {{ error }}
      </v-alert>
      <v-form>
        <v-text-field v-model="recipe.name" :error="hasError" label="Naam" required @input="error = null" @change="updateRecipe" />
        <v-textarea v-model="recipe.text" :error="hasError" label="Beschrijving" hint="Hoe moet het recept gemaakt worden?" required auto-grow @input="error = null" @change="updateRecipe" />
        <v-rating v-model="recipe.rating" @input="updateRecipe" />
        <v-textarea v-model="recipe.ratingComments" :error="hasError" label="Beschrijving bij beoordeling" hint="Wat vond je er zelf van?" required auto-grow @input="error = null" @change="updateRecipe" />
      </v-form>
      <recipe-media :id="id" />
    </v-card-text>
    <v-card-actions>
      <v-btn flat to="/recipe" nuxt color="primary">Terug</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { fireDB } from "~/plugins/vuefire.js"
import RecipeMedia from "~/components/RecipeMedia"

export default {
  components: {
    RecipeMedia
  },

  firebase() {
    return {
      recipe: {
        source: fireDB.ref(`/Recipes/${this.user.uid}/${this.id}`),
        asObject: true,
        readyCallback: () => {
          this.loaded = true
        }
      }
    }
  },

  data() {
    return {
      error: null,
      loaded: false
    }
  },

  computed: {
    user() {
      if (this.$store.getters.isLoggedIn) return this.$store.state.user
    },

    id() {
      return this.$route.params.id
    },

    hasError() {
      return this.error ? true : false
    }
  },

  methods: {
    updateRecipe() {
      fireDB.ref(`/Recipes/${this.user.uid}/${this.id}`).set(
        {
          name: this.recipe.name,
          text: this.recipe.text,
          rating: this.recipe.rating,
          ratingComments: this.recipe.ratingComments
        },
        error => {
          if (error) {
            this.error = error
          }
        }
      )
    }
  }
}
</script>
