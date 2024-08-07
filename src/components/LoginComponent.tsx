import React, { useState } from 'react';
import { TribeClient } from '@tribeplatform/gql-client/client';

const client = new TribeClient({
  graphqlUrl: 'https://api.bettermode.com',
});

interface LoginComponentProps {
  onLoginSuccess: (token: string) => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = ({
  onLoginSuccess,
}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const guestTokens = await client.getTokens(
        { networkDomain: 'podders-uccbycyx.bettermode.io' },
        'all',
      );
      client.setToken(guestTokens.accessToken);

      const { accessToken } = await client.mutation({
        name: 'loginNetwork',
        args: {
          variables: {
            input: {
              usernameOrEmail,
              password,
            },
          },
          fields: 'basic',
        },
      });

      onLoginSuccess(accessToken);
    } catch (error) {
      setError('Login failed');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="usernameOrEmail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username or Email:
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginComponent;
