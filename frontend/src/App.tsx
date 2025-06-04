import { Route, Routes } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<AuthGuard isProtected={true} />}>
        <Route path="/" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route element={<AuthGuard isProtected={false} />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
