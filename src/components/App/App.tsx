import '../Auth/Auth';
import { PropsWithChildren, createContext } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useStateObserver } from '../../hooks/useStateOberser';

import { Content, MidContainer, Container, LogoutButton, DeleteButton } from './App.styles';
import { Spinner } from '../Icons/Spinner';

import { useParams } from 'react-router';
import { NavigationBar } from '../NavBar/NavBar';

export type Data = {
	users: DocumentData[];
	chats: DocumentData[];
};

export const UserContext = createContext<DocumentData>({});

function App({ children }: PropsWithChildren) {
	const { userDetails } = useStateObserver();

	const { chatId } = useParams();

	if (userDetails === undefined) return <Spinner width={50} color="black" />;

	return (
		<UserContext.Provider value={userDetails}>
			<Container>
				<Content>
					{children}
					{!chatId && <NavigationBar />}
				</Content>
			</Container>
		</UserContext.Provider>
	);
}

export default App;
