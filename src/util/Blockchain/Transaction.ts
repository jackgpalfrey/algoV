import { SHA256 } from 'crypto-js';
import elliptic from 'elliptic';

const EC = new elliptic.ec('secp256k1');

export type TransactionType = 'REWARD' | 'PAYMENT';

class Transaction {
	sender: string | null;
	recipient: string;
	amount: number;
	signature: string;
	timestamp: Date;
	hash: string;
	type: TransactionType;
	constructor(
		fromAddress: string | null,
		toAddress: string,
		amount: number,
		type: TransactionType = 'PAYMENT' // This is used solely for the visualisation
	) {
		this.sender = fromAddress;
		this.recipient = toAddress;
		this.amount = amount;
		this.timestamp = new Date();
		this.hash = this.getHash();
		this.signature = '';
		this.type = type;
	}

	/**
	 * Gets hash of transaction
	 * @returns SHA256 hash of transaction
	 */
	public getHash(): string {
		const timestamp = this.timestamp.toISOString();
		const amt = this.amount;
		const sender = this.sender;
		const recipient = this.recipient;
		let stringRepresentation = `${timestamp}${amt}${sender}${recipient}`;
		return SHA256(stringRepresentation).toString();
	}

	/**
	 * Signs transaction
	 * @param signingKey Senders signature
	 * @returns True if succesfully false if not
	 */
	public signTransaction(signingKey: elliptic.ec.KeyPair): boolean {
		if (signingKey.getPublic('hex') !== this.sender) return false;

		const hashTx = this.getHash();
		const sig = signingKey.sign(hashTx, 'base64');
		this.signature = sig.toDER('hex');

		return true;
	}

	/**
	 * Checks integrity of transaction
	 * @returns True if valid false if not
	 */
	public isValid(): boolean {
		if (this.sender === null) return true;

		if (!this.signature || this.signature.length === 0) return false;
		const publicKey = EC.keyFromPublic(this.sender, 'hex');
		return publicKey.verify(this.getHash(), this.signature);
	}
}

export default Transaction;
