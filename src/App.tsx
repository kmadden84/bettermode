import { useState, useEffect, useCallback } from 'react';
import { PostsComponent } from './components/PostsComponent';
import { LoginComponent } from './components/LoginComponent';

export const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem('auth_token'),
  );

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setAuthToken(token);
  }, []);

  const handleLogout = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem('auth_token');
    setAuthToken(null);
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('auth_token', token);
    setAuthToken(token);
  };
  return (
    <div className="relative">
      {authToken && (
        <a
          href="/logout"
          onClick={handleLogout}
          className="absolute -top-80 left-4 font-bold text-white hover:text-gray-200 transition-colors"
        >
          Logout
        </a>
      )}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {authToken ? (
          <PostsComponent />
        ) : (
          <LoginComponent onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
};

export default App;
