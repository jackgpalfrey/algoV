import React, { useDebugValue, useEffect, useState } from 'react';
import './style.css';
import {
	Block,
	Blockchain as BlockchainClass,
	createWallet,
	sendTransaction,
	Signature,
	Transaction,
} from '../../util/Blockchain';
import { Core, Wallet } from '../../util/Blockchain/API';
import BlockchainBlock from '../../components/BlockchainBlock/BlockchainBlock';
import { updateSourceFile, validateLocaleAndSetLanguage } from 'typescript';
import MakeTransactioModal from '../../components/MakeTransactionModal/MakeTransactionModal';
import BlockchainSettingsModal from '../../components/BlockchainSettingsModal/BlockchainSettingsModal';

interface blockchainProps {}

const Blockchain: React.FC<blockchainProps> = ({}) => {
	//@ts-ignore
	const [API, setAPI]: [Core, any] = useState(null);

	const [wallets, setWallets]: [Wallet[], any] = useState([]);
	const [currentWalletIndex, setCurrentWalletIndex]: [
		number,
		React.Dispatch<React.SetStateAction<number>>
	] = useState(0);

	const [blocksArray, setBlocksArray]: [typeof BlockchainBlock[], any] =
		useState([]);
	const [transactions, setTransactions]: [Transaction[], any] = useState([]);
	const [balance, setBalance] = useState(0);
	const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(true);

	function updateBalance() {
		if (!wallets || !wallets[currentWalletIndex]) return;
		setBalance(wallets[currentWalletIndex].balance);
	}

	useEffect(() => {
		updateBalance();
	}, [currentWalletIndex]);

	function addWallet(ApiCore = API) {
		const w = ApiCore.createWallet();
		setWallets((prevState: Wallet[]) => {
			const newState = [...prevState];
			newState.push(w);
			return newState;
		});
	}
	useEffect(() => {
		const coin = new BlockchainClass(2);
		const API = new Core(coin);
		setAPI(API);
		setBlocksArray(API.chain.chain);

		addWallet(API);
		addWallet(API);

		console.log(wallets);

		API.debug();
	}, []);

	function showTransactions(transactions: Transaction[]) {
		const elements = transactions.map((value) => {
			if (value.sender === null) value.sender = 'SYSTEM';
			if (!value.signature) value.signature = 'UNSIGNED';
			const row = (
				<tr>
					<td className={value.sender === 'SYSTEM' ? 'default' : 'hash'}>
						{value.sender}
					</td>
					<td>{value.amount}</td>
					<td className='hash'>{value.recipient}</td>
					<td className={value.signature === 'UNSIGNED' ? 'default' : 'hash'}>
						{value.signature}
					</td>
				</tr>
			);
			return row;
		});

		setTransactions(elements);
	}

	function renderBlocks() {
		if (!API) return [];
		let chainDetails = API.chain.chain;

		const blocks = chainDetails.map((value, idx) => {
			const { hash, nonce, previousHash, timestamp, transactions } = value;
			return (
				<BlockchainBlock
					index={idx}
					hash={hash}
					nonce={nonce}
					previousHash={previousHash}
					timestamp={timestamp.getTime()}
					transactions={transactions}
					showTransactionsFunction={showTransactions}
				/>
			);
		});

		console.log(blocks);

		return blocks.reverse();
	}

	function renderTransactions() {
		console.log(transactions);
		return transactions;
	}

	function renderWalletsDropdown() {
		const walletElements = wallets.map((value, idx) => {
			if (!value) return <option>Test</option>;
			return (
				<option
					className={idx === currentWalletIndex ? 'currentWallet' : undefined}>
					{idx === currentWalletIndex ? '> ' : ''}
					{value.address}
				</option>
			);
		});

		walletElements.push(<option>Create Wallet</option>);
		return walletElements;
	}

	const targetWallets = [...wallets];
	targetWallets.splice(currentWalletIndex, 1);

	return (
		<div className='blockchainContainer'>
			<nav>
				<select
					onChange={(e) => {
						const value = e.target.value;
						if (value === 'Create Wallet') {
							addWallet();
							e.target.value = wallets[wallets.length - 1].address;
						}
						const addresses: string[] = wallets.map((value) => value.address);
						setCurrentWalletIndex(addresses.indexOf(value));
					}}>
					{renderWalletsDropdown()}
				</select>
				<button
					onClick={() => {
						showTransactions(API.chain.pendingTransactions);
					}}>
					View Pending Transaction
				</button>
				<button onClick={() => setIsTransactionModalOpen(true)}>
					Create Transaction
				</button>
				<button
					onClick={() => {
						wallets[currentWalletIndex].mine();
						setBlocksArray([]);
						updateBalance();
					}}>
					Mine Block
				</button>
				<button onClick={() => setIsSettingsModalOpen(true)}>Settings</button>
				<p>Balance {balance}</p>
			</nav>
			<main>
				<div className='blocks'>{renderBlocks()}</div>
				<div>
					<table>
						<tr>
							<th>Sender</th>
							<th>Amount</th>
							<th>Recipient</th>
							<th>Signature</th>
						</tr>
						{renderTransactions()}
					</table>
				</div>
			</main>
			{isTransactionModalOpen ? (
				<MakeTransactioModal
					closeFunction={() => setIsTransactionModalOpen(false)}
					sender={wallets[currentWalletIndex]}
					executeTransactionFunction={(
						sender: Wallet,
						targetAddress,
						amount
					) => {
						sender.sendToAddress(targetAddress, amount);
						console.log('Sent');
						setIsTransactionModalOpen(false);
					}}
					possibleTargets={targetWallets}
				/>
			) : null}
			{isTransactionModalOpen ? (
				<MakeTransactioModal
					closeFunction={() => setIsTransactionModalOpen(false)}
					sender={wallets[currentWalletIndex]}
					executeTransactionFunction={(
						sender: Wallet,
						targetAddress,
						amount
					) => {
						sender.sendToAddress(targetAddress, amount);
						console.log('Sent');
						setIsTransactionModalOpen(false);
					}}
					possibleTargets={targetWallets}
				/>
			) : null}
			{isSettingsModalOpen && !!API ? (
				<BlockchainSettingsModal
					closeFunction={() => setIsSettingsModalOpen(false)}
					currentDifficulty={API.chain.difficulty}
					currentMiningReward={API.chain.miningReward}
					setDifficultyFunction={(value: number) => {
						API.chain.difficulty = value;
						console.log('TRIGGER');
						console.log(API.chain.difficulty);
					}}
					setMiningRewardFunction={(value: number) => {
						API.chain.miningReward = value;
					}}
				/>
			) : null}
		</div>
	);
};

export default Blockchain;
