<template lang="pug">
  ui-modal(title="Add new address" dismiss-on="close-button esc" ref="modal" @close="onClose")
    div
      ui-select(has-search
        error="This field is required." 
        label="Currency"
        help="Currency type that you input"
        placeholder="Select cryptocurrency"
        :options="currencies"
        :invalid="isCurrencyTouched && form.currency.value.length === 0"
        @touch="isCurrencyTouched = true"
        v-model="form.currency")
      ui-textbox(floating-label
        required
        error="This field is required."
        label="Address"
        help="Address that you want to track balance."
        :invalid="isAddressTouched && form.address.length === 0"
        @touch="isAddressTouched = true"
        v-model="form.address")
      .messages
        p
          | If you already registered selected currency, Cygnus will display total balance of addresses.
          br
          | Example, you registered two Bitcoin addresses (addr1: 0.5 BTC, addr2: 1.2 BTC), we will display it as 1.7 BTC.
        p.danger
          | DANGER: When block explorer provide wrong balances, Cygnus display wrong balance.
      
    div(slot="footer")
      ui-button(color="primary" @click="onClickOkButton" :disabled="form.currency.value.length === 0 || form.address.length === 0") OK
      ui-button(@click="hideAddressModal()") Cancel
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { ISupportCurrency, supportedCurrencies } from "../models/currencies";

interface IFormInput {
  address: string;
  currency: IOption;
}

interface IOption {
  label: string;
  value: string;
}

@Component
export default class NewAddressModalComponent extends Vue {
  public form: IFormInput = { address: "", currency: { label: "", value: "" } };
  public isAddressTouched: boolean = false;
  public isCurrencyTouched: boolean = false;
  public currencies: IOption[] = supportedCurrencies.map(w => {
    return { label: w.name, value: w.id };
  });

  @Action("hideAddressModal") public hideAddressModal: () => void;

  @Action("registerAddress") public registerAddress: ({ address, id }) => void;

  @Getter("isShowAddressModal") public isShowAddressModal: boolean;

  @Watch("isShowAddressModal")
  public onIsShowAddressModalChanged(newValue: boolean, oldValue: boolean): void {
    if (newValue) {
      this.initializeForm();
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  public onClose(): void {
    this.hideAddressModal();
  }

  public onClickOkButton(): void {
    this.registerAddress({ address: this.form.address, id: this.form.currency.value });
    this.hideAddressModal();
  }

  private initializeForm(): void {
    this.form = { address: "", currency: { label: "", value: "" } };
    this.isAddressTouched = false;
    this.isCurrencyTouched = false;
  }

  private openModal(): void {
    (this.$refs.modal as any).open();
  }

  private closeModal(): void {
    (this.$refs.modal as any).close();
  }
}
</script>

<style lang="scss" scoped>
.messages {
  margin-top: 30px;
  margin-bottom: 20px;
}

.danger {
  color: #dc3545 !important;
}
</style>
