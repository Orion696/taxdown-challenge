import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { username, taxes } = useSelector((state: RootState) => ({ username: state.username, taxes: state.taxes }));


  return (
    <div>
      <h1 className="dashboard-title">Welcome, {username}!</h1>
      <h3 className="taxes-title">Your active tax seasons:</h3>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {taxes && taxes.map(tax => (
            <tr key={tax.id}>
              <td>{tax.id}</td>
              <td>{tax.name}</td>
              <td>{tax.year}</td>
              <td>
                <div className="link-container">
                  <Link to={`/taxes/${tax.id}/form`}>Agregar entradas</Link>
                  <Link to={`/taxes/${tax.id}/submissions`}>Ver envíos</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default Dashboard;
