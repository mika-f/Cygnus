<template lang="pug">
  #app
    cygnus-header
    router-view
    new-address-modal
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import HeaderComponent from "./components/Header.vue";
import NewAddressModalComponent from "./components/NewAddressModal.vue";

@Component({
  components: {
    "cygnus-header": HeaderComponent,
    "new-address-modal": NewAddressModalComponent
  }
})
export default class AppComponent extends Vue {}
</script>


<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

body {
  color: #333333;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, "ヒラギノ角ゴ ProN W3",
    "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
