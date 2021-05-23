import React from 'react';
import {
	Blockchain,
	createWallet,
	sendTransaction,
	Signature,
	Transaction,
} from '../../util/Blockchain';

interface blockchainProps {}

const blockchain: React.FC<blockchainProps> = ({}) => {
	const coin = new Blockchain();

	const myWallet = createWallet();
	const myAddress = myWallet.address;
	const mySignature = myWallet.signature;

	const otherWallet = createWallet();
	const otherAddress = otherWallet.address;
	const otherSignature = otherWallet.signature;

	sendTransaction(myAddress, otherAddress, 6, mySignature, coin);

	sendTransaction(otherAddress, myAddress, 3, otherSignature, coin);

	coin.minePendingTransactions(myAddress);

	console.log('-------- Wallets --------');
	console.log(`My Wallet: ${coin.getBalance(myAddress)}`);
	console.log(`Friend Wallet: ${coin.getBalance(otherAddress)}`);

	console.log('--------- Chain ---------');
	console.log(coin.chain);

	return <div>Test</div>;
};

export default blockchain;
