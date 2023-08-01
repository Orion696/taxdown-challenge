import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import TaxForm from "./components/TaxForm/TaxForm";
import TaxSubmissions from "./components/TaxSubmissions/TaxSubmissions";
import { RootState } from "./store/reducer";

const App: React.FC = () => {
  const { username } = useSelector((state: RootState) => state);

  return (
    <Routes>
      <Route path="/" element={username ? <Dashboard /> : <LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/taxes/:taxId/form" element={<TaxForm />} />
      <Route path="/taxes/:taxId/submissions" element={<TaxSubmissions />} />
    </Routes>
  );
};

export default App;

