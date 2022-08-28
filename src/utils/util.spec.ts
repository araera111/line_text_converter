import { Message } from '../main';
import { convertLineDate, isLineDate } from './util';

describe('isLineDate', () => {
	it('case1:2019/1/17(木) -> true', () => {
		const str = '2019/1/17(木)';
		expect(isLineDate(str)).toBe(true);
	});

	it('case2:takeda -> fa', () => {
		const str = '2019/1/17(木)';
		expect(isLineDate(str)).toBe(true);
	});
});

describe('convertLineDate', () => {
	it('case1:2019/1/17(木)', () => {
		const str = '2019/1/17(木)';
		const result: Message = {
			type: 'date',
			name: 'date',
			time: '',
			text: '2019/1/17(木)',
			date: '2019-01-17'
		};
		expect(convertLineDate(str)).toStrictEqual(result);
	});

	it('case1:2019/2/17(木)', () => {
		const str = '2019/2/17(木)';
		const result: Message = {
			type: 'date',
			name: 'date',
			time: '',
			text: '2019/2/17(木)',
			date: '2019-02-17'
		};
		expect(convertLineDate(str)).toStrictEqual(result);
	});
});
