// import * as ReactDOM from 'react-dom';
// import Login from '../pages/auth/login';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginComponent from '../components/Login/Login';

describe('Login component', () => {
  beforeEach(() => {
    const initialState = {
      inputError: '',
      loginStatus: false,
      loading: false,
      token: ''
    };

    const userData = {
      firstName: ''
    };

    const mockStore = configureStore();
    // let store: any;
    // let wrapper;

    const store: any = mockStore(initialState);
    render(
      <Provider store={store}>
        <LoginComponent userData={userData} loginData={initialState} />
      </Provider>
    );
  });

  test('renders default state', () => {
    const divHeader = screen.getByTestId('header');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByTestId('button');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
    expect(loginButton).toHaveClass('Mui-disabled');
    expect(divHeader).toBeTruthy();
  });

  // test('button title change after click', async () => {
  //   await act(async () => {
  //     const loginButton = screen.getByTestId('button');
  //     console.log(loginButton.firstChild);
  //     const buttonTitle = 'Wait';
  //     await fireEvent.click(loginButton, { target: { value: buttonTitle } });
  //     expect(loginButton.).toBe(buttonTitle);
  //   });
  // });

  test('rendered inputs are empty', () => {
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('keep submit button disabled when only email is provided', () => {
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const submitButton = screen.getByTestId('button');

    fireEvent.change(emailInput, { target: { value: 'email' } });
    expect(submitButton).toHaveClass('Mui-disabled');
  });

  test('keep submit button disabled when only password is provided', () => {
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const submitButton = screen.getByTestId('button');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(submitButton).toHaveClass('Mui-disabled');
  });

  test('enable submit button when inputs are filled with data', () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('button');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(emailInput, { target: { value: 'email' } });

    expect(submitButton).not.toHaveClass('Mui-disabled');
  });
});
