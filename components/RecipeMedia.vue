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
            <v-img :src="media.url" aspect-ratio="1" class="grey lighten-2" @click="dialogImg = media.url">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="primary" />
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-if="dialogImg" v-model="dialogImg" full-width transition="dialog-bottom-transition">
      <v-toolbar dark color="primary">
        <v-spacer />
        <v-btn icon dark @click.native="dialogImg = null">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-img :src="dialogImg" contain class="grey lighten-2">
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="primary" />
        </v-layout>
      </v-img>
    </v-dialog>

    <!-- <v-file @change="uploadImage">
      <v-btn color="primary">Foto toevoegen</v-btn>
    </v-file> -->

    <upload-btn
      :file-changed-callback="uploadImage"
      title="Foto toevoegen" />

      <!--     <v-btn color="primary" @click="webcamDialog = true">Foto maken</v-btn>

    <v-dialog v-model="webcamDialog" full-width transition="dialog-bottom-transition">
      <v-toolbar dark color="primary">
        <v-spacer />
        <v-btn icon dark @click.native="webcamDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-layout wrap align-center>
          <v-flex xs12 sm6 d-flex>
            <v-select :items="devices" :value="deviceId" item-text="label" item-value="deviceId" label="Camera" @input="setCamera" />
          </v-flex>
        </v-layout>
        <v-btn v-if="deviceId" color="primary" @click="takePhoto">Foto maken</v-btn>
        <web-cam ref="webcam" :device-id="deviceId" @cameras="onCameras"/>
      </v-card>
    </v-dialog>-->
  </v-card>
</template>

<script>
import { fireDB, fireStorage } from "~/plugins/vuefire.js"
// import { WebCam } from "vue-web-cam"
// import VFile from "@outluch/v-file"
import UploadButton from "vuetify-upload-button"

export default {
  name: "RecipeMedia",

  components: {
    // WebCam,
    // "v-file": VFile
    "upload-btn": UploadButton
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
      dialogImg: null,
      loaded: false,
      // devices: [],
      // deviceId: null,
      // img: null,
      uploadTask: "",
      progressUpload: 0 //,
      // webcamDialog: false
    }
  },

  computed: {
    user() {
      if (this.$store.getters.isLoggedIn) return this.$store.state.user
    }
  },

  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          )
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            fireDB.ref(`/Recipes/${this.user.uid}/${this.id}/Media`).push(
              {
                url: downloadURL
              },
              error => {
                if (error) {
                  this.error = error
                }
              }
            )
          })
        }
      )
    }
  },

  methods: {
    // takePhoto() {
    //   let img = this.$refs.webcam.capture()

    //   let type = img.split(";")[0].split(":")[1]

    //   fetch(img)
    //     .then(res => res.blob())
    //     .then(blob => {
    //       const file = new File([blob], "photo", {
    //         type: type
    //       })
    //       this.uploadImage(file)
    //       this.webcamDialog = false
    //     })
    // },

    // onCameras(cameras) {
    //   this.devices = cameras
    // },

    // setCamera(camera) {
    //   this.deviceId = camera
    // },

    uploadImage(file) {
      let name = file.name.split(".")[0] + "_" + Date.now()

      this.uploadTask = fireStorage
        .ref(`recipeMedia/${this.id}/${name}`)
        .put(file)
    }
  }
}
</script>
