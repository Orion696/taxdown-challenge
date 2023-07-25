import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './components/LoginForm/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import { RootState } from './store/reducer';

const App: React.FC = () => {
  const { username } = useSelector((state: RootState) => state);

  return (
    <Routes>
      <Route path="/" element={username ? <Dashboard /> : <LoginForm />} />
    </Routes>
  );
};

export default App;
