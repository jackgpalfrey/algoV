import enGeneral from '../data/locales/en/general.json';
import enAlgoData from '../data/locales/en/algorithmInfo.json';
import enChangeLog from '../data/locales/en/changelogData.json';
import enDocs from '../data/locales/en/docs';

import spGeneral from '../data/locales/sp/general.json';
import spAlgoData from '../data/locales/sp/algorithmInfo.json';
import spChangeLog from '../data/locales/sp/changelogData.json';
import spDocs from '../data/locales/sp/docs';

const localeData = {
	en: {
		general: enGeneral,
		algorithmInfo: enAlgoData,
		changeLog: enChangeLog,
		docs: enDocs,
	},
	sp: {
		general: spGeneral,
		algorithmInfo: spAlgoData,
		changeLog: spChangeLog,
		docs: spDocs,
	},
};

const defaultLang = 'en';

function getLocaleText(dataSet, language) {
	let savedLangCookie = document.cookie
		.split('; ')
		.find((row) => row.startsWith('lang='));

	let savedLang;
	if (savedLangCookie) {
		savedLang = savedLangCookie.split('=')[1];
	} else {
		savedLang = defaultLang;
	}

	let lang = language || savedLang;

	console.log(`Language: ${lang}`);
	let langData = localeData[lang];
	if (langData !== undefined) {
		if (langData[dataSet]) {
			return langData[dataSet];
		} else {
			return localeData['en'][dataSet];
		}
	} else {
		return localeData['en'][dataSet];
	}
}

export default getLocaleText;
