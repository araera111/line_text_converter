import { readFileSync } from 'fs';
import { includes } from 'rambda';
import { insertLineMessage } from './db';
import { convertLineDate, convertLineMessage, isLineDate } from './utils/util';

export type MessageType = 'text' | 'date';

export type Message = {
	type: MessageType;
	name: string;
	date: string;
	time: string;
	text: string;
};

const hasTab = (str: string): boolean => includes('\t', str);

const conv = (str: string): Message[] => {
	const splitStr = str.split('\n');
	let isContinueMessage = false;
	let continueMessage = '';
	let result: Message[] = [];
	let date: string;
	splitStr.forEach((message) => {
		if (isLineDate(message)) {
			isContinueMessage = false;
			const beforeDate = date;
			date = message;
			result =
				continueMessage !== ''
					? [...result, convertLineMessage(continueMessage, beforeDate), convertLineDate(message)]
					: [...result, convertLineDate(message)];
			continueMessage = '';
		}
		if (hasTab(message)) {
			isContinueMessage = true;
			result =
				continueMessage !== ''
					? [...result, convertLineMessage(continueMessage, date)]
					: [...result];
			continueMessage = message;
		}
		if (!hasTab(message) && isContinueMessage) {
			continueMessage = continueMessage + message + '\n';
		}
	});

	return result;
};

const main = async () => {
	const file = await readFileSync('talk.txt', 'utf-8');
	const split = conv(file);
	insertLineMessage(split);
};
main();
