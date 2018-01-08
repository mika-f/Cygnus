<template lang="pug">
  ui-toolbar(brand="Cygnus" type="colored" textColor="white")
    div(slot="icon")
      ui-icon-button(has-dropdown size="large" type="secondary" color="white" icon="menu" ref="dropdown")
        ui-menu(contain-focus slot="dropdown" :options="options" @close="$refs.dropdown.closeDropdown()" @select="onSelected")
    div(slot="actions")
      p.balance {{`Total Balance (JPY) : ${balance}`}}
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

enum Actions {
  ADD_NEW_ADDRESS,
  SHOW_SETTINGS
}

interface IOptionItem {
  action: Actions;
  label: string;
}

@Component
export default class HeaderComponent extends Vue {
  @Action("showAddressModal") public showAddressModal: () => void;

  @Getter("balance") public balance: number;

  public options: IOptionItem[] = [
    { action: Actions.ADD_NEW_ADDRESS, label: "Add new address" },
    { action: Actions.SHOW_SETTINGS, label: "Settings" }
  ];

  public onSelected(item: IOptionItem): void {
    switch (item.action) {
      case Actions.ADD_NEW_ADDRESS:
        this.showAddressModal();
        break;

      case Actions.SHOW_SETTINGS:
        this.$router.push("settings");
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.balance {
  padding-right: 15px;
  font-weight: 400;
  line-height: 24px;
  font-size: 1.125rem;
  margin: 0;
}
</style>
