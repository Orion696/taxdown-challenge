import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { RootState } from '../../store/reducer';
import LoginForm from './LoginForm';


const testState: RootState = {
  username: null,
  isLoading: false,
  error: 'Datos de usuario inválido',
  taxes: [],
  submissions: {},
};

test('shows error message for invalid credentials', () => {

  const store = configureStore({ reducer, preloadedState: testState });


  const { getByText } = render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );

  const errorMessage = getByText((content, element) => {
    return content.includes('Datos de usuario inválido');
  });

  expect(errorMessage).toBeInTheDocument();
});
