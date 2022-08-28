import dayjs from 'dayjs';
import { Message } from '../main';
export const isLineDate = (str: string): boolean => {
	return /^\d{4}\/\d{1,}\/\d{1,}\(.\)/.test(str);
};

export const convertLineDate = (str: string): Message => {
	const result: Message = {
		type: 'date',
		date: dayjs(str).format('YYYY-MM-DD'),
		name: 'date',
		time: '',
		text: str
	};
	return result;
};

export const convertLineMessage = (str: string, date: string): Message => {
	const splitT = str.split('\t');
	const [time, name, text] = splitT;
	const result: Message = {
		type: 'text',
		name,
		time,
		text,
		date: dayjs(date).format('YYYY-MM-DD')
	};
	return result;
};
