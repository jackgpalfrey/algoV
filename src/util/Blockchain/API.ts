import Blockchain from './Blockchain';
import Transaction from './Transaction';
import {
	createWallet as createWalletUtil,
	sendTransaction,
	Signature,
} from './util';

export interface HistoryEvent {
	name: string;
	details: object;
	timestamp: number;
}

export class Core {
	history: HistoryEvent[];
	chain: Blockchain;
	activeWallets: Wallet[];

	constructor(Chain: Blockchain) {
		this.history = [];
		this.chain = Chain;
		this.activeWallets = [];
	}

	/**
	 * Creates a new wallet and returns a class Representation
	 * @returns Wallet class of new wallet
	 */
	public createWallet(): Wallet {
		const { address, signature } = createWalletUtil();
		const newWallet = new Wallet(this, address, signature);
		this.activeWallets.push(newWallet);
		return newWallet;
	}

	/**
	 * Creates a history event which is saved as any array in the Core class
	 * @param name Name of event eg. Transaction or Block Mined
	 * @param details Details of event in object form
	 */
	public createHistoryEvent(name: string, details: object): HistoryEvent {
		const historyEvent: HistoryEvent = {
			name,
			details,
			timestamp: Date.now(),
		};

		this.history.push(historyEvent);
		return historyEvent;
	}

	/**
	 * Logs debug information like wallet balances, history and a full blockchain
	 */
	public debug(): void {
		console.groupCollapsed(`${Date.now()} Debug`);
		console.group('Wallets: ');
		this.activeWallets.forEach((value) => {
			console.log(`${value.address} => ${value.balance}`);
		});
		console.groupEnd();

		console.group('Chain: ');
		console.log(this.chain.chain);
		console.groupEnd();

		console.group('History: ');
		console.log(this.history);
		console.groupEnd();
		console.groupEnd();
	}

	/**
	 * Sends coins to target using their Wallet class from System
	 * @param targetWallet Wallet class to send to
	 * @param amount Amount to send
	 */
	public give(wallet: Wallet, amount: number) {
		this.giveToAddress(wallet.address, amount);
	}

	/**
	 * Sends coins to target using their string address from system
	 * @param address Address of wallet to send to
	 * @param amount Amount to send
	 */
	public giveToAddress(address: string, amount: number) {
		const transaction = new Transaction(null, address, amount, 'REWARD');
		this.chain.pendingTransactions.push(transaction);
	}
}

export class Wallet {
	name: string;
	core: Core;
	address: string;
	signature: Signature;
	constructor(
		core: Core,
		address: string,
		signature: Signature,
		name: string = address
	) {
		this.name = name;
		this.core = core;
		this.address = address;
		this.signature = signature;
	}

	/**
	 * Sends coins to target using their Wallet classs
	 * @param targetWallet Wallet class to send to
	 * @param amount Amount to send
	 */
	public send(targetWallet: Wallet, amount: number): void {
		this.sendToAddress(targetWallet.address, amount);
	}

	/**
	 * Sends coins to target using their string address
	 * @param address Address of wallet to send to
	 * @param amount Amount to send
	 */
	public sendToAddress(address: string, amount: number): void {
		sendTransaction(
			this.address,
			address,
			amount,
			this.signature,
			this.core.chain
		);
		this.core.createHistoryEvent('Transaction', {
			sender: this.address,
			amount,
			recipient: address,
		});
	}

	/**
	 * Mines block with all pending transactions
	 */
	public mine(): void {
		const details = this.core.chain.minePendingTransactions(this.address);
		const { hash, nonce, reward, miner } = details as any;
		this.core.createHistoryEvent('Block Mined', {
			miner,
			hash,
			nonce,
			reward,
		});
		console.log(this.core.chain.chain);
	}

	public get balance() {
		return this.core.chain.getBalance(this.address);
	}
}
