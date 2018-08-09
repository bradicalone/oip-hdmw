import { Insight } from 'insight-explorer'
import { varIntBuffer } from '../util'

var floFeePerKb = 100000

module.exports = {
	name: 'flo_testnet',
	displayName: 'Flo Testnet',
	ticker: 'tFLO',
	satPerCoin: 1e8,
	feePerKb: floFeePerKb,
	feePerByte: floFeePerKb / 1024,
	maxFeePerByte: 100,
	minFee: floFeePerKb,
	dust: 100000,

	txVersion: 2,

	explorer: new Insight('https://flosight.mk1.alexandria.io/api'),

	getExtraBytes: function(options){
		var fData = options.floData || ""
		return varIntBuffer(fData.length).toString("hex") + Buffer.from(fData).toString("hex")
	},

	network: {
		bip32: {
			public: 0x013440e2,
			private: 0x01343c23
		},
		slip44: 1,
		messagePrefix: '\u001bFlorincoin Signed Message:\n',
		pubKeyHash: 115,
		scriptHash: 58,
		wif: 239
	}
}