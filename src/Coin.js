import bitcoin from 'bitcoinjs-lib'
import bip32 from 'bip32'
import bip32utils from 'bip32-utils'

import Account from './Account'

const COIN_START = 0x80000000;

/**
 * Manage Accounts for a specific Coin
 */
class Coin {
	/**
	 * @param  {string} seed - Master Seed hex
	 * @param  {CoinInfo} coin - The CoinInfo containing network & version variables
	 * @param  {boolean} [discover=true] - Should the Coin auto-discover Accounts and Chains
	 * @return {Coin}
	 */
	constructor(seed, coin, discover){
		this.coin = coin;

		if (discover || discover === false)
			this.discover = discover
		else
			this.discover = true

		var mainRoot = bip32.fromSeed(new Buffer(seed, "hex"), this.coin.network);

		var bip44Num = this.coin.network.slip44;

		// Check if we need to convert the hexa to the index
		if (bip44Num >= COIN_START)
			bip44Num -= COIN_START;

		this.root = mainRoot.derivePath("m/44'/" + bip44Num + "'");

		this.accounts = {}

		// Default add account zero
		this.addAccount(0);
	}
	/**
	 * Get the balance for the entire coin, or a specific address/array of addresses
	 * @param  {Object} [options] - Specific options defining what balance to get back
	 * @param {string} [options.address] - Get Balance for Single Address
	 * @param {Array.<string>} [options.addresses] - Get Balance for Addresses
	 * @return {number} Returns a numerical balance
	 */
	getBalance(options){
		if (options.address){

		}
	}
	/**
	 * Get the Main Address for a specific Account number. 
	 * This is the Address at index 0 on the External Chain of the Account.
	 * @param  {number} [account_number=0] - Number of the Account you wish to get
	 * @return {Address}
	 */
	getMainAddress(account_number){
		return this.getAccount(account_number || 0).getMainAddress()
	}
	/**
	 * Send payment, NOT YET IMPLEMENTED!
	 * @param  {Object} options
	 * @return {Promise<string>} A Promise that will resolve to the success txid
	 */
	sendPayment(options){

	}
	/**
	 * Get the Extended Private Key for the root path. This is derived at m/44'/coin_type'
	 * @return {string} The Extended Private Key
	 */
	getExtendedPrivateKey(){
		return this.root.toBase58();
	}
	/**
	 * Get the Neutered Extended Public Key for the root path. This is derived at m/44'/coin_type'
	 * @return {string} The Extended Public Key
	 */
	getExtendedPublicKey(){
		return this.root.neutered().toBase58();
	}
	/**
	 * Get the Account at the specified number
	 * @param  {number} [account_number=0]
	 * @return {Account}
	 */
	getAccount(account_number){
		var num = account_number || 0;

		if (!this.accounts[num])
			return this.addAccount(num);

		return this.accounts[num];
	}
	/**
	 * Add the Account at the specified number, if it already exists, it returns the Account.
	 * If the Account does not exist, it will create it and then return it.
	 * @param  {number} [account_number=0]
	 * @return {Account}
	 */
	addAccount(account_number){
		var num = account_number || 0;

		// if the account has already been added, just return 
		if (this.accounts[num])
			return this.getAccount(num);

		var accountMaster = this.root.deriveHardened(num);

		var account = new Account(accountMaster, this.coin, this.discover);

		this.accounts[num] = account;

		return this.getAccount(num);
	}
	/**
	 * Get the CoinInfo for the Coin
	 * @return {CoinInfo}
	 */
	getCoinInfo(){
		return this.coin
	}
}

module.exports = Coin