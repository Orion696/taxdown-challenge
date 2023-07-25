import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../store/actions';
import { RootState } from '../../store/reducer';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => ({ isLoading: state.isLoading, error: state.error }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Por favor ingresar credenciales de acceso");
      return;
    }
  
    if (username !== 'admin' || password !== 'taxdown') {
      alert("Datos de usuario inválido");
      return;
    }

    dispatch(loginRequest(username, password));
  };

  return (
    <div className="container">
      <div className="text-container">
        <h1 className="taxdown-title">Taxdown</h1>
        <p className="taxdown-text">Te ayudamos a gestionar tus impuestos de manera fácil, rapido y segura</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
