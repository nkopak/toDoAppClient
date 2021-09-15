import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegisterComponent from '../components/Register/Register';

describe('Register component testing', () => {
  beforeEach(() => {
    const initialState = {
      inputError: '',
      registerStatus: false,
      loading: false,
      token: ''
    };

    const userData = {
      firstName: ''
    };

    const mockStore = configureStore();

    const store: any = mockStore(initialState);
    render(
      <Provider store={store}>
        <RegisterComponent userData={userData} registerData={initialState} />
      </Provider>
    );
  });

  test('default state rendered', () => {
    const firstNameInput = screen.getByTestId(
      'firstNameInput'
    ) as HTMLInputElement;
    const lastNameInput = screen.getByTestId(
      'lastNameInput'
    ) as HTMLInputElement;
    const emailInput = screen.getByTestId('emailInput') as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      'passwordInput'
    ) as HTMLInputElement;
    const submitButton = screen.getByTestId('submitButton');

    expect(firstNameInput).toBeTruthy();
    expect(firstNameInput.value).toBe('');

    expect(lastNameInput).toBeTruthy();
    expect(lastNameInput.value).toBe('');

    expect(emailInput).toBeTruthy();
    expect(emailInput.value).toBe('');

    expect(passwordInput).toBeTruthy();
    expect(passwordInput.value).toBe('');

    expect(submitButton).toHaveClass('Mui-disabled');
  });

  test('rendered inputs are empty', () => {
    const firstNameInput = screen.getByTestId(
      'firstNameInput'
    ) as HTMLInputElement;
    const lastNameInput = screen.getByTestId(
      'lastNameInput'
    ) as HTMLInputElement;
    const emailInput = screen.getByTestId('emailInput') as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      'passwordInput'
    ) as HTMLInputElement;

    expect(firstNameInput.value).toBe('');
    expect(lastNameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('enable submit button when inputs are filled with data', () => {
    const firstNameInput = screen.getByTestId(
      'firstNameInput'
    ) as HTMLInputElement;
    const lastNameInput = screen.getByTestId(
      'lastNameInput'
    ) as HTMLInputElement;
    const emailInput = screen.getByTestId('emailInput') as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      'passwordInput'
    ) as HTMLInputElement;
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(firstNameInput, { target: { value: 'firstNameInput' } });
    fireEvent.change(lastNameInput, { target: { value: 'lastNameInput' } });
    fireEvent.change(passwordInput, { target: { value: 'passwordInput' } });
    fireEvent.change(emailInput, { target: { value: 'emailInput' } });
    expect(submitButton).not.toHaveClass('Mui-disabled');
  });
});
