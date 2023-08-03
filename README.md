# Stock Oracle

Predict stock prices using neural networks trained on historical price data.

<br>

### Mechanism

Uses financialmarketsprep data API (free upto 250 calls) to fetch historical records, caches data in redis to prevent duplicate calls, trains a NN using brain.js and then predicts future stock prices.

<br>

### Usage

```bash
predict
```
<br>

### Install

```js
npm i -g stock-oracle
```

<details>
<summary>
ENV reference
</summary>
<br>
API_KEY - financialmarketsprep API key

DB_URL - redis URL (Upstash)
</details>

<br>

### Uninstall

```js
npm uninstall stock-oracle
```

<br>

### TBA

1. Cache validation & updation
2. Input credentials on first run

Contributions are welcome, feel free to open a PR.

<br>

### License

AGPL-3.0 ©️ Zubin