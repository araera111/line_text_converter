import { MongoClient, ObjectId } from 'mongodb';
import { MessageType } from './main';

export const MONGODB_URI = 'ここにMONGODB_URIを入れる';

export type LineMessage = {
	_id?: ObjectId;
	type: MessageType;
	name: string;
	date: string;
	time: string;
	text: string;
};

export const insertLineMessage = async (lineMessages: LineMessage[]) => {
	const client = new MongoClient(MONGODB_URI);
	const database = client.db('line');
	const novel = database.collection<LineMessage>('LineMessages');

	await novel.insertMany(lineMessages);
	await client.close();
};
