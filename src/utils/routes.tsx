import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import App from '../components/App/App';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { Chats } from '../components/ChatList/ChatList.styles';
import { ChatList } from '../components/ChatList/ChatList';
import Chat from '../components/Chat/Chat';
import { ChatHeader } from '../components/ChatHeader/ChatHeader';
import { ChatInput } from '../components/ChatInput/ChatInput';
import { SearchUsers } from '../components/SearchUsers/SearchUsers';
import { ProfileImg } from '../components/Chat/Chat.styles';
import { ProfileInfo } from '../components/ProfileInfo/ProfileInfo';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chats" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chats"
        element={
          <PrivateRoute>
            <App>
              <ChatList />
            </App>
          </PrivateRoute>
        }
      />
      <Route
        path="/chats/:chatId"
        element={
          <PrivateRoute>
            <App>
              <ChatHeader />
              <Chat />
              <ChatInput />
            </App>
          </PrivateRoute>
        }
      />
      <Route
        path="/chats/add"
        element={
          <PrivateRoute>
            <App>
              <SearchUsers />
            </App>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <App>
              <ProfileInfo />
            </App>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
