<template>
  <v-layout>
    <v-flex text-xs-center xs12 sm6 offset-sm3>
      <v-text-field
        v-model="name"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
     <v-btn class="register mb-2" primary @click="register">Register</v-btn>
    </v-flex>
  </v-layout>

</template>

<script>
import { fireAuth } from '~/plugins/vuefire.js'

export default {
  data () {
    return {
      name: '',
      password: '',
      errorCode: null,
      errorMessage: null
    }
  },
  methods: {
    register () {
      fireAuth.createUserWithEmailAndPassword(this.name, this.password)
        .then((response) => {
          this.$router.push('/recipe')
        })
        .catch((error) => {
          this.errorCode = error.code
          this.errorMessage = error.message
        })
    }
  }
}
</script>
