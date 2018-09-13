<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <p v-for="user in users">{{ user.value }}</p>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  firebase () {
    return {
      users: this.fireDB.ref('/')
    }
  }
}
</script>
