import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: (): { push: jest.Mock } => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }): React.ReactNode =>
      children,
  };
});

jest.mock('../../hooks/AuthContext', () => {
  return {
    useAuth: (): { signIn: jest.Mock } => ({ signIn: mockedSignIn }),
  };
});

jest.mock('../../hooks/ToastContext', () => {
  return {
    useToast: (): { addToast: jest.Mock } => ({ addToast: mockedAddToast }),
  };
});

describe('SignIn page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() =>
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard'),
    );
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  });

  it('should display error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: 'abcdefgh' } });

    fireEvent.click(buttonElement);

    await wait(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      ),
    );
  });
});
