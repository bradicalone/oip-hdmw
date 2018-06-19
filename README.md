![](https://travis-ci.org/oipwg/oip-hdmw.svg?branch=master)
[![](https://img.shields.io/npm/v/oip-hdmw.svg)](https://www.npmjs.com/package/oip-hdmw)
# OIP HD-MultiWallet
`oip-hdmw` is a [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) Javascript Lite Wallet. You can spawn and recover the entire wallet for each coin using just a single [BIP-39 Mnemonic](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki). We use an [`insight-api`](https://github.com/bitpay/insight-api) server as the source of truth for Wallet balances and unspent outputs instead of syncing Block Headers like most SPV wallets do. 

## Table of Contents
* [Installation Instructions](https://github.com/oipwg/oip-hdmw/#installation-instructions)
* [Getting Started](https://github.com/oipwg/oip-hdmw/#getting-started)
	* [Creating your first Wallet](https://github.com/oipwg/oip-hdmw/#)
	* [Getting your first Address](https://github.com/oipwg/oip-hdmw/#)
	* [Sending your first Transaction](https://github.com/oipwg/oip-hdmw/#)
* [API Documentation](https://github.com/oipwg/oip-hdmw/#api-documentation)
	* [Wallet](https://oipwg.github.io/oip-hdmw/1.0.0/Wallet.html)
	* [Coin](https://oipwg.github.io/oip-hdmw/1.0.0/Coin.html)
	* [Account](https://oipwg.github.io/oip-hdmw/1.0.0/Account.html)
	* [Address](https://oipwg.github.io/oip-hdmw/1.0.0/Address.html)
	* [TransactionBuilder](https://oipwg.github.io/oip-hdmw/1.0.0/TransactionBuilder.html)
* [License](https://github.com/oipwg/oip-hdmw/#license)

## Installation Instructions
You can install the latest version by running the following `npm install` command.
```
$ npm install --save oip-hdmw
```
## Getting Started
### Creating your first Wallet
Creating a wallet is extremely simple! To create a new wallet with a random new Mnemonic, all we need to do is create a Wallet with no paramaters. After the wallet is created, we log the Mnemonic so that we can use it in our other examples
```javascript
const HDMW = require('oip-hdmw')
const Wallet = HDMW.Wallet;

var myWallet = new Wallet();

console.log("My Mnemonic: '" + myWallet.getMnemonic() + "'")
// My Mnemonic: 'carbon panda replace drum guess heart inside useless random bulb hint industry'
```
### Getting the Coins from your Wallet
Now that you have a Mnemonic for your wallet, lets go ahead and create the Wallet again, but this time, we will give it the Mnemonic to start from.
```javascript
const HDMW = require('oip-hdmw')
const Wallet = HDMW.Wallet;

var myWallet = new Wallet('carbon panda replace drum guess heart inside useless random bulb hint industry');

console.log("My Wallets Coins: ", myWallet.getCoins())
// My Wallets Coins: {
//	bitcoin: Coin,
//	litecoin: Coin,
//	flo: Coin
//}
```
As you can see, we get back a JSON object containing each `Coin` along with an `identifier` that is the Coin name.
### Getting your first Address
Now that we have created a new Wallet and accessed the Coins on the wallet, lets go ahead and get the Main Address for one of the coins. To do this, we will first need to get a `Coin` from the `Wallet`. To do this, we use the `getCoin` function and pass it the Coin name that we wish to get the Coin for. After we have grabbed the `Coin`, we run the `getMainAddress` function in order to get the main address for the `Coin`. After we have stored the `Address` returned to us by the `Coin`, we need to get the human readable Public key of the Address.
```javascript
const HDMW = require('oip-hdmw')
const Wallet = HDMW.Wallet;

var myWallet = new Wallet('carbon panda replace drum guess heart inside useless random bulb hint industry');

var bitcoin = myWallet.getCoin('bitcoin');

var myMainAddress = bitcoin.getMainAddress();

console.log("My Wallets Bitcoin Main Address: ", myMainAddress.getPublicAddress());
// My Wallets Bitcoin Main Address: 13BW4eTvNFXBLeTjJQRgVxuiuStAFp1HfL
```
### Sending your first Transaction
In order to send a transaction, we will need to have a balance on our Wallet first. Send some funds to the Address that you got in the last step. After you have sent some money to the Wallet, we can send our first transaction. To send the Transaction, use the `sendPayment` method.
```javascript
const HDMW = require('oip-hdmw')
const Wallet = HDMW.Wallet;

var myWallet = new Wallet('carbon panda replace drum guess heart inside useless random bulb hint industry');

myWallet.sendPayment({
	to: { "12nP3k9tFKgQPJNkDDyNWqgjtm2bt3qq1b": 0.001 }
}).then(function(txid){
	console.log("Successfully sent Transaction! " + txid);
}).catch(function(error){
	console.error("Unable to send Transaction!", error)
})
```
### Understanding the Wallet Topology
![](https://raw.githubusercontent.com/oipwg/oip-hdmw/master/docs/hdmw-topology.png)

## API Documentation
Learn more about how each Class works, or take a look at all functions available to you.
* [Documentation Home](https://oipwg.github.io/oip-hdmw/)
	* [Wallet](https://oipwg.github.io/oip-hdmw/1.0.1/Wallet.html)
	* [Coin](https://oipwg.github.io/oip-hdmw/1.0.1/Coin.html)
	* [Account](https://oipwg.github.io/oip-hdmw/1.0.1/Account.html)
	* [Address](https://oipwg.github.io/oip-hdmw/1.0.1/Address.html)
	* [TransactionBuilder](https://oipwg.github.io/oip-hdmw/1.0.1/TransactionBuilder.html)

## License
MIT License

Copyright (c) 2018 Open Index Protocol Working Group

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.