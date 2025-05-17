import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute isProtected={true} />}>
        <Route path="/" element={<Chat />} />
      </Route>
      <Route element={<ProtectedRoute isProtected={false} />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
