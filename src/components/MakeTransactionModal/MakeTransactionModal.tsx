import React, { useState } from 'react';
import { Wallet } from '../../util/Blockchain/API';
import './style.css';

interface MakeTransactionModalProps {
	closeFunction: () => any;
	sender: Wallet;
	executeTransactionFunction: (
		sender: Wallet,
		targetAddress: string,
		amount: number
	) => any;
	possibleTargets: Wallet[];
}

const MakeTransactionModal: React.FC<MakeTransactionModalProps> = ({
	closeFunction,
	sender,
	executeTransactionFunction,
	possibleTargets,
}) => {
	const [senderAddress, setSenderAddress]: [
		string,
		React.Dispatch<React.SetStateAction<string>>
	] = useState(!sender ? '' : sender.address);
	const [targetAddress, setTargetAddress]: [
		string,
		React.Dispatch<React.SetStateAction<string>>
	] = useState(possibleTargets[0].address);
	const [amount, setAmount]: [
		number,
		React.Dispatch<React.SetStateAction<number>>
	] = useState(0);
	const [wallets, setWallets]: [
		Wallet[],
		React.Dispatch<React.SetStateAction<Wallet[]>>
	] = useState(possibleTargets);

	function submit() {
		console.log('Address' + targetAddress);
		executeTransactionFunction(sender, targetAddress, amount);
	}

	function renderTargetDropdown() {
		return wallets.map((value) => {
			if (!value) return <option>Test</option>;
			return <option>{value.address}</option>;
		});
	}

	return (
		<div className='makeTransactionModalContainer'>
			<div className='makeTransactionModal'>
				<h1>Create Transaction</h1>
				<label htmlFor='myaddress'>Sender Address: {'  '}</label>
				<input id='myaddress' value={senderAddress} disabled />
				<label htmlFor='address'>Target Address: {'  '}</label>
				<select
					onChange={(e) => {
						console.log('Test:' + e.target.value);
						setTargetAddress(e.target.value);
					}}>
					value={targetAddress}
					{renderTargetDropdown()}
				</select>
				<label htmlFor='amount'>Amount: {'  '}</label>
				<input
					id='amount'
					type='number'
					onChange={(e) => setAmount(parseInt(e.target.value))}
				/>
				<div className='blockchainMakeTransactionButtons'>
					<button onClick={submit}>Send</button>
					<button onClick={closeFunction}>Cancel</button>
				</div>
			</div>
		</div>
	);
};

export default MakeTransactionModal;
