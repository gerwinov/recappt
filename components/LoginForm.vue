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
     <v-btn class="signIn mb-2" primary @click="login">Login</v-btn>
    </v-flex>
  </v-layout>

</template>

<script>
import { fireAuth } from '~/plugins/vuefire.js'

export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      fireAuth.signInWithEmailAndPassword(this.name, this.password)
        .then((response) => {
          // Send user to page..
        })
    }
  }
}
</script>
