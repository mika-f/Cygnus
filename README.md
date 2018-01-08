# Cygnus
[![license](https://img.shields.io/github/license/mika-f/Cygnus.svg?style=flat-square)](./LICENSE)

Balance management of cryptocurrency.

**This application is not a wallet.**  
**You can't receive/send/exchange cryptocurrency/token in this application.**


## Features

Work in progress...

* [ ] Auto calculate balances/pricing from your addresses.
  * [ ] Support multiple currencies/tokens such as Bitcoin, Litecoin, Ethereum and others.
    * It depends on the existence of block explorer.
  * [ ] Show current pricing of cryptocurrency/token.
    * Powered by CoinMarketCap.
    * [ ] Support multiple exchanges such as bitFlyer, Zaif and others.
  * [ ] Support multiple addresses.
  * [ ] Show as fiat money balance that you lived in.
  * [ ] Show as BTC value.
* [ ] Show transactions in your addresses.
* [ ] Logging
  * [ ] Balances
  * [ ] Pricing
  * [ ] Total
  * [ ] Percentage


## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:9080
yarn run dev

# build electron application for production
yarn run build


# lint all JS/Vue component files in `src/`
yarn run lint

```