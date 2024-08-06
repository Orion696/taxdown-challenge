import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../store/actions';
import { RootState } from '../../store/reducer';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
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

    if (username !== 'usuario' || password !== 'contraseña') {
      alert("Datos de usuario inválido");
      return;
    }

    dispatch(loginRequest(username, password));
  };

  return (
    <div className="container">
      <div className="text-container">
        <h1 className="taxdown-title">Taxdown</h1>
        <p className="taxdown-text">Te ayudamos a gestionar tus impuestos de manera fácil, rápido y segura</p>
      </div>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Usuario</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresar Usuario" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Ingresar Contraseña" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </Form.Group>
        
        {error && <Alert variant="danger">Error: {error}</Alert>}
        
        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
      </Form>
      {isLoading && (
        <div className="spinner-overlay">
          <Spinner animation="border" variant="light" />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
