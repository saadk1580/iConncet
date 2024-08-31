import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../components/Auth/Auth';
import { useEffect, useState } from 'react';

export const useMessages = (chatId?: string) => {
	if (!chatId) {
		return;
	}

	const [messages, setMessages] = useState<DocumentData[]>([]);

	useEffect(() => {
		const q = query(collection(db, `chats/${chatId}/messages`), orderBy('createdAt'));
		const unsub = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((chat) => chat.data());
			setMessages(data);
		});

		window.scrollTo(0, document.body.scrollHeight);
		return () => unsub();
	}, [chatId]);

	return messages;
};
