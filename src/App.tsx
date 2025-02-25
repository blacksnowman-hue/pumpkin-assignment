import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import { MessageSquare, LogOut } from 'lucide-react';
import { useUserStore } from './store/userStore';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { user, setUser, setChatUsers } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setChatUsers([]);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-semibold text-gray-900">chat</span>
          </div>
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={!user ? <SignUp /> : <Navigate to="/chat" />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;