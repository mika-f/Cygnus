<template lang="pug">
  .container
    p Hello
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class HomeComponent extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
}
</style>
