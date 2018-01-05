<template lang="pug">
  ui-modal(title="Add new address" dismiss-on="close-button esc" ref="modal")
    div
      ui-select(has-search
        error="This field is required." 
        label="Currency"
        help="Currency type that you input"
        placeholder="Select cryptocurrency"
        :options="options"
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
          | DANGER: When does't provide (or not registered) block explorer, Cygnus can't track balance and display it as 0.0.
      
    div(slot="footer")
      ui-button(color="primary") OK
      ui-button(@click="hideAddressModal()") Cancel
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { ICurrency } from "../models/ICurrency";

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
  public options: IOption[] = [];

  @Action("hideAddressModal") public hideAddressModal: () => void;

  @Getter("isShowAddressModal") public isShowAddressModal: boolean;

  @Getter("currencies") public currencies: ICurrency[];

  @Watch("isShowAddressModal")
  public onIsShowAddressModalChanged(newValue: boolean, oldValue: boolean): void {
    if (newValue) {
      this.initialize();
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  private initialize(): void {
    this.form = { address: "", currency: { label: "", value: "" } };
    this.isAddressTouched = false;
    this.isCurrencyTouched = false;
    if (this.options.length === 0) {
      this.currencies.forEach(w => {
        this.options.push({ label: `${w.name} (${w.symbol})`, value: w.id });
      });
    }
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
