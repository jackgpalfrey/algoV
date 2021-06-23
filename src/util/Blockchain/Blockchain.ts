import { textChangeRangeIsUnchanged } from 'typescript';
import Block from './Block';
import Transaction from './Transaction';

class Blockchain {
	chain: Block[];
	difficulty: number;
	pendingTransactions: Transaction[];
	miningReward: number;

	constructor(difficulty = 2, miningReward = 10) {
		this.chain = [this.getGenesisBlock()];
		this.difficulty = difficulty;
		this.pendingTransactions = [];
		this.miningReward = miningReward;
	}

	/**
	 * Gets Genesis Block
	 * @returns Genesis Block ie. First Block in Chain
	 */
	private getGenesisBlock(): Block {
		return new Block(new Date(), [], '');
	}

	/**
	 * Gets latest block in chain
	 * @returns Latest Block in Chain
	 */
	public getLatestBlock(): Block {
		const lastIndex = this.chain.length - 1;
		return this.chain[lastIndex];
	}

	/**
	 * Adds given block to blockchain
	 * @param newBlock New Block to add to chain
	 * @returns True if successful and false if not
	 */
	private addBlock(newBlock: Block): boolean {
		const lastBlockHash = this.getLatestBlock().hash;
		newBlock.previousHash = lastBlockHash;
		newBlock.resetHash();

		newBlock.mine(this.difficulty);

		const hashSubstring = newBlock.getHash().substring(0, this.difficulty);
		const expectedSubstring = Array(this.difficulty + 1).join('0');
		const isDifficultyConditionMet = hashSubstring === expectedSubstring;
		if (!isDifficultyConditionMet) return false;

		this.chain.push(newBlock);
		return true;
	}

	/**
	 * Adds transaction to pending transactions
	 * @param transaction Transaction to add
	 * @returns True if successful false if not
	 */
	public addTransaction(transaction: Transaction): boolean {
		if (!transaction.sender || !transaction.recipient) return false;
		if (!transaction.isValid()) return false;
		if (transaction.amount <= 0) return false;
		this.pendingTransactions.push(transaction);
		return true;
	}

	/**
	 * Gets balance of given address
	 * @param address Addess of wanted balance
	 * @returns Balance of given address
	 */
	public getBalance(address: string): number {
		let balance = 0;
		for (const block of this.chain) {
			for (const transaction of block.transactions) {
				if (transaction.sender === address) balance -= transaction.amount;
				if (transaction.recipient === address) balance += transaction.amount;
			}
		}

		return balance;
	}

	/**
	 * Creates new block with all current pending transactions and adds it to chain
	 * @param minerAddress Address to send miners reward to
	 * @returns True if succesful false if not
	 */
	public minePendingTransactions(minerAddress: string): boolean | object {
		let pendingTransactions = this.pendingTransactions;
		const reward = new Transaction(
			null,
			minerAddress,
			this.miningReward,
			'REWARD'
		);
		pendingTransactions.push(reward);

		let block = new Block(new Date(), pendingTransactions);
		const result = this.addBlock(block);
		if (!result) return false;
		this.pendingTransactions = [];
		//console.log(`Block (${block.hash}) mined by ${minerAddress} for ${this.miningReward}`);
		return {
			hash: block.hash,
			nonce: block.nonce,
			reward: this.miningReward,
			miner: minerAddress,
		};
	}

	/**
	 * Checks blockchain for discrepancy and returns false if one is found
	 * @returns True if blockchain is valid and false if not
	 */
	public isValid(): boolean {
		for (let i = 1; i < this.chain.length; i++) {
			let currentBlock: Block = this.chain[i];
			let previousBlock: Block = this.chain[i - 1];
			if (currentBlock.hash !== currentBlock.getHash()) return false;
			if (currentBlock.previousHash !== previousBlock.hash) return false;
			if (!currentBlock.isValid()) return false;
		}

		return true;
	}
}

export default Blockchain;
