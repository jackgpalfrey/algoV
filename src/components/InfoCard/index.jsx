import React, { useState } from 'react';
import './style.css';

import getLocaleText from '../../util/getLocaleText';
const text = getLocaleText('general').infoCard;
const data = getLocaleText('algorithmInfo');

function InfoCard({ algorithmType, algorithmID }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenHover, setIsOpenHover] = useState(false);

	let title = 'No Information Available';
	let avgTimeComplexity = '';
	let worstTimeComplexity = '';
	let bestTimeComplexity = '';
	let memoryComplexity = '';
	let stable = '';
	let descriptionArray = [];
	let creditText = '';
	let credit = '';

	if (data[algorithmType][algorithmID]) {
		title = data[algorithmType][algorithmID].title || 'Unknown';
		avgTimeComplexity =
			data[algorithmType][algorithmID].avgTimeComplexity || 'Unknown';
		worstTimeComplexity =
			data[algorithmType][algorithmID].worstTimeComplexity || 'Unknown';
		bestTimeComplexity =
			data[algorithmType][algorithmID].bestTimeComplexity || 'Unknown';
		memoryComplexity =
			data[algorithmType][algorithmID].memoryComplexity || 'Unknown';
		stable = data[algorithmType][algorithmID].stable || 'Unknown';
		try {
			descriptionArray = data[algorithmType][algorithmID].description.split(
				'\n'
			);
		} catch {
			descriptionArray = [];
		}

		creditText =
			data[algorithmType][algorithmID].creditText || 'Description From';
		credit = data[algorithmType][algorithmID].credit;
	}

	let card = (
		<div
			className='card scrollable-bright' /*onMouseOver={() => setIsOpenHover(true)} onMouseLeave={() => setIsOpenHover(false)}*/
		>
			<p className='title'>{title}</p>
			<hr></hr>
			<p className='meta'>
				<span className='metaTitle'>{text.worstCaseTimeMeta}</span>
				{` ${worstTimeComplexity}`}
			</p>
			<p className='meta'>
				<span className='metaTitle'>{text.avgTimeMeta}</span>
				{` ${avgTimeComplexity}`}
			</p>
			<p className='meta'>
				<span className='metaTitle'>{text.bestCaseTimeMeta}</span>
				{` ${bestTimeComplexity}`}
			</p>
			<p className='meta'>
				<span className='metaTitle'>{text.memoryMeta}</span>
				{` ${memoryComplexity}`}
			</p>
			<p className='meta'>
				<span className='metaTitle'>{text.stableMeta}</span>
				{` ${stable}  `}
				<i className={'material-icons help'} title={text.stableMetaDesc}>
					help
				</i>
			</p>
			<hr></hr>
			{descriptionArray.map((item, idx) => (
				<p className='description'>{item}</p>
			))}
			{credit ? (
				<a className='credit' href={credit}>{`${creditText}: ${credit}`}</a>
			) : null}
		</div>
	);
	return (
		<div
			className='card-container' /*onMouseOver={() => setIsOpenHover(true)} onMouseLeave={() => setIsOpenHover(false)}*/
		>
			{isOpen || isOpenHover ? card : null}
			<button onClick={() => setIsOpen(!isOpen)} className='openCardButton'>
				{isOpen ? (
					<i className='material-icons clickable dark'>close</i>
				) : (
					<i className='material-icons clickable dark'>info</i>
				)}
			</button>
		</div>
	);
}

export default InfoCard;
