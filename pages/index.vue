<template>
  <v-card>
    <v-img :src="bannerImg" max-height="600" />
    <v-card-title>
      <div class="pt-2">
        <span class="display-2">Recappt</span><br>
        <span class="subheading font-italic">..de digitale klapper in de keuken!</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-spacer />
      <v-btn flat nuxt to="/register" color="primary">Registreren</v-btn>
      <v-btn flat nuxt to="/login" color="primary">Inloggen</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import bannerImg from "~/assets/img/banner.jpg"

export default {
  data() {
    return {
      bannerImg: bannerImg
    }
  }
}
</script>
