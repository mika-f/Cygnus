<template lang="pug">
  .container
    h4 Balances
    table.mdl-data-table.full-width
      thead
        tr
          th.mdl-data-table__cell--non-numeric Name
          th Balance
          th Addresses
          th Price (JPY)
          th Price (BTC)
          th Balance (JPY)
          th Balance (BTC)
          th Actions
      tbody
        tr(v-for="currency in currencies")
          td.mdl-data-table__cell--non-numeric {{(name(currency))}}
          td {{formatBalance(currency)}}
          td {{`${currency.addresses.length} addr(s)`}}
          td {{`${0} JPY`}}
          td {{`${0} BTC`}}
          td {{`${0} JPY`}}
          td {{`${0} BTC`}}
          td
            a Transactions
            | ・
            a Logs
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { resolveFromId } from "../models/currencies";
import { sumBalances, ITrackCurrency } from "../models/ITrackCurrency";

@Component
export default class HomeComponent extends Vue {
  @Getter("currencies") public currencies: ITrackCurrency[];

  @Action("updateBalances") public updateBalances: (id: string) => Promise<void>;

  @Watch("currencies")
  public async onCurrenciesChanged(newValue: ITrackCurrency[], oldValue: ITrackCurrency[]): Promise<void> {
    // tslint:disable:no-console
    console.log(newValue);
    console.log(oldValue);
  }

  public formatBalance(currency: ITrackCurrency): string {
    return `${sumBalances(currency)} ${resolveFromId(currency.id).symbol}`;
  }

  public name(currency: ITrackCurrency): string {
    return resolveFromId(currency.id).name;
  }

  public async mounted(): Promise<void> {
    this.currencies.forEach(async w => {
      await this.updateBalances(w.id);
    });
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
}

.full-width {
  width: 100%;
}
</style>
