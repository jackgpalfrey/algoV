import SHA256 from 'crypto-js/sha256.js';
import Transaction from './Transaction';

class Block {
	timestamp: Date;
	transactions: Transaction[];
	previousHash: string;
	hash: string;
	nonce: number;
	constructor(
		timestamp: Date,
		transactions: Transaction[],
		previousHash: string = ''
	) {
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.hash = this.getHash();
		this.nonce = 0;
	}

	/**
	 * Resets hash of block to new hash
	 */
	public resetHash(): void {
		this.hash = this.getHash();
	}

	/**
	 * Gets hash of block
	 * @returns SHA256 hash of block
	 */
	public getHash(): string {
		let timestamp = this.timestamp.toISOString();
		let dataString = JSON.stringify(this.transactions);
		let stringRepresentation = `${timestamp}${dataString}${this.previousHash}${this.nonce}`;
		return SHA256(stringRepresentation).toString();
	}

	/**
	 * Mines block
	 * @param difficulty Number of 0's necessary in hash. This is doubled checked when adding to chain so can't be cheated
	 */
	public mine(difficulty: number) {
		while (
			this.getHash().substring(0, difficulty) !==
			Array(difficulty + 1).join('0')
		) {
			this.nonce++;
		}

		this.resetHash();
	}

	/**
	 * Checks integrity of block
	 * @returns True if valid false if not
	 */
	public isValid(): boolean {
		for (const transaction of this.transactions) {
			if (!transaction.isValid()) return false;
		}

		return true;
	}
}

export default Block;
