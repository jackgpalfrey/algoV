import React, { useState } from 'react';
import './style.css';

interface BlockchainSettingsModalProps {
	currentMiningReward: number;
	setMiningRewardFunction: (value: number) => any;
	currentDifficulty: number;
	setDifficultyFunction: (value: number) => any;
	closeFunction: (miningReward: number, difficulty: number) => any;
}

const BlockchainSettingsModal: React.FC<BlockchainSettingsModalProps> = ({
	currentDifficulty,
	currentMiningReward,
	setDifficultyFunction,
	setMiningRewardFunction,
	closeFunction,
}) => {
	const [miningReward, setMiningRewardState] = useState(currentMiningReward);
	const [difficulty, setDifficultyState] = useState(currentDifficulty);

	function close() {
		let reward = miningReward;
		let diff = difficulty;
		if (!reward || reward < 0) reward = 0;
		if (!diff || diff <= 0) diff = 1;
		closeFunction(reward, diff);
	}

	function setDifficulty(newVal: number) {
		if (newVal <= 0) return false;
		setDifficultyState(newVal);
		if (!newVal) newVal = 0;
		setDifficultyFunction(newVal);
	}

	function setMiningReward(newVal: number) {
		if (newVal < 0) return false;
		setMiningRewardState(newVal);
		if (!newVal) newVal = 0;
		setMiningRewardFunction(newVal);
	}

	return (
		<div className='makeTransactionModalContainer'>
			<div className='makeTransactionModal'>
				<h1>Blockchain Settings</h1>
				<label htmlFor='myaddress'>Mining Reward: {'  '}</label>
				<input
					id='myaddress'
					value={miningReward}
					type='number'
					onChange={(e) => {
						setMiningRewardFunction(parseInt(e.target.value));
						setMiningReward(parseInt(e.target.value));
					}}
				/>
				<label htmlFor='amount'>Difficulty: {'  '}</label>
				<input
					value={difficulty}
					id='amount'
					type='number'
					onChange={(e) => {
						setDifficultyFunction(parseInt(e.target.value));
						setDifficulty(parseInt(e.target.value));
					}}
				/>
				<button onClick={() => close()}>Close</button>
			</div>
		</div>
	);
};

export default BlockchainSettingsModal;
