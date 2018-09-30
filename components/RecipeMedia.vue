<template>
  <div v-if="!loaded" class="text-xs-center">
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
  </div>
  <v-card v-else flat>
    <v-container grid-list-sm fluid>
      <v-layout row wrap>
        <v-flex
          v-for="(media, index) in recipeMedia" :key="'media' + index" xs4 d-flex>
          <v-card flat tile class="d-flex">
            <v-img :src="`https://picsum.photos/500/300`" aspect-ratio="1" class="grey lighten-2">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="primary" />
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn color="primary" @click="takePhoto">Foto maken</v-btn>
    <web-cam ref="webcam" :device-id="deviceId" @cameras="onCameras"/>
    <v-layout wrap align-center>
      <v-flex xs12 sm6 d-flex>
        <v-select :items="devices" :value="deviceId" item-text="label" item-value="deviceId" label="Camera" @input="setCamera" />
      </v-flex>
    </v-layout>
    <img :src="img">
  </v-card>
</template>

<script>
import { fireDB } from "~/plugins/vuefire.js"
import { WebCam } from "vue-web-cam"

export default {
  name: "RecipeMedia",

  components: {
    WebCam
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  firebase() {
    return {
      recipeMedia: {
        source: fireDB.ref(`/Recipes/${this.user.uid}/${this.id}/Media`),
        asObject: false,
        readyCallback: () => {
          this.loaded = true
        }
      }
    }
  },

  data() {
    return {
      error: null,
      loaded: false,
      devices: [],
      deviceId: null,
      img: null
    }
  },

  computed: {
    user() {
      if (this.$store.getters.isLoggedIn) return this.$store.state.user
    }
  },

  methods: {
    takePhoto() {
      this.img = this.$refs.webcam.capture()
    },

    onCameras(cameras) {
      this.devices = cameras
    },

    setCamera(camera) {
      this.deviceId = camera
    }
  }
}
</script>
