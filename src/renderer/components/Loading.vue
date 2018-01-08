<template lang="pug">
  .centering
    ui-progress-circular(color="primary")
    p.message Loading...
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class LoadingComponent extends Vue {
  @Action("loadCurrencies") public loadCurrencies: () => Promise<void>;
  @Action("loadAddresses") public loadAddresses: () => void;

  @Getter("isTickersLoaded") private isTickersLoaded: boolean;

  @Watch("isTickersLoaded")
  public onIsTickersLoadedChanged(newValue: boolean, oldValue: boolean): void {
    this.$router.push("home");
  }

  public async mounted(): Promise<void> {
    this.loadAddresses();
    this.loadCurrencies();
  }
}
</script>

<style lang="scss" scoped>
.centering {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.message {
  padding-left: 10px;
}
</style>
