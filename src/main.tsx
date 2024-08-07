import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import PostDetail from './components/PostDetail';
import './index.css';
import './App.css';
import ApolloAppProvider from '../ApolloProvider';
import { useQuery } from '@apollo/client';
import { getBearerToken } from './constants/queries';

const Main: React.FC = () => {
  return (
    <ApolloAppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </ApolloAppProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
