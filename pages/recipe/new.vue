<template>
  <v-layout>
    <v-flex text-xs-center xs12 sm6 offset-sm3>
      <v-text-field
        v-model="name"
        label="Name"
        required
      />
      <v-text-field
        v-model="text"
        label="Text"
        required
      />
      <v-text-field
        v-model="rating"
        label="Rating"
        type="number"
      />
      <v-text-field
        v-model="ratingComments"
        label="Rating comments"
        type="text"
      />
      <v-btn class="register mb-2" primary @click="addRecipe">Toevoegen</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { fireDB, fireAuth } from "~/plugins/vuefire.js"

export default {
  // firebase () {
  //   return {
  //     recipes: fireDB.ref('/Recipes')
  //   }
  // },

  data() {
    return {
      name: "",
      text: "",
      rating: 0,
      ratingComments: ""
    }
  },

  computed: {
    user() {
      return fireAuth.currentUser
    }
  },

  methods: {
    // Move this to drawer..
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
            console.log(error)
            return
          }
          this.$router.push("/recipe")
        }
      )
    }
  }
}
</script>
