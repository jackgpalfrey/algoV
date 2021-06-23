import elliptic from 'elliptic';
import { Blockchain, Transaction } from '.';
const EC = elliptic.ec;
const ec = new EC('secp256k1');

export interface createKeyInterface {
	signingKey: elliptic.ec.KeyPair;
	publicKey: string;
	privateKey: string;
}

export interface Wallet {
	address: string;
	signature: Signature;
}

export type Signature = elliptic.ec.KeyPair;

/**
 * Creates new key
 * @returns New object with signingKey, publicKey and a privateKey
 */
export function createKey(): createKeyInterface {
	const key = ec.genKeyPair();
	const publicKey = key.getPublic('hex');
	const privateKey = key.getPrivate('hex');

	return { signingKey: key, publicKey, privateKey };
}

export function createWallet(): Wallet {
	const key = createKey();
	const signature = key.signingKey;
	const address = key.publicKey;

	return { address, signature };
}

export function sendTransaction(
	from: string,
	to: string,
	amount: number,
	signer: Signature,
	chain: Blockchain
) {
	const tx = new Transaction(from, to, amount);
	tx.signTransaction(signer);
	console.log(chain.addTransaction(tx));
}
