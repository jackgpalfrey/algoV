import React from 'react';
import { Transaction } from '../../util/Blockchain';
import './style.css';

interface BlockchainBlockProps {
	hash: string;
	nonce: number;
	previousHash: string;
	timestamp: number;
	transactions: Transaction[];
	showTransactionsFunction: (transactions: Transaction[]) => any;
}

const BlockchainBlock: React.FC<BlockchainBlockProps> = ({
	hash,
	nonce,
	previousHash,
	timestamp,
	transactions,
	showTransactionsFunction,
}) => {
	if (!previousHash || previousHash === '') previousHash = 'GENESIS';

	return (
		<div
			className='blockchainBlock'
			onClick={() => {
				showTransactionsFunction(transactions);
			}}>
			<p>
				<span>Hash:</span>
				<br /> <span className='hash'>{hash}</span>
			</p>
			<p>
				<span>Timestamp:</span>
				<br /> {timestamp}
			</p>
			<p>
				<span>Nonce:</span>
				<br /> {nonce}
			</p>
			<p>
				<span>Previous Hash:</span>
				<br /> {previousHash}
				{previousHash === 'GENESIS' ? [<br />, 'BLOCK'] : null}
			</p>
			<p>
				<span>Transactions:</span>
				<br /> {transactions.length}
			</p>
		</div>
	);
};

export default BlockchainBlock;
