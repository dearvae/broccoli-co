import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import RequestInviteModal from './components/RequestInviteModal/RequestInviteModal';

describe('App Component', () => {
    // Example of testing user interactions
    test('button click handler works', async () => {
        render(<App />);

        await userEvent.click(screen.getByText('Request an invite'));
        const modal = screen.getByRole('dialog', { name: /Request an invite/i });
        expect(modal).toBeInTheDocument();
    });

    // test('user can fill the form and submit - error case', async () => {
    //     render(<RequestInviteModal visible={true} onHide={() => {}} />);

    //     const inputFullname = screen.getByRole('textbox', { name: /Full name/i });
    //     const inputEmail = screen.getByTestId('email-input');
    //     const inputConfirmEmail = screen.getByTestId('confirm-email-input');

    //     const submitButton = screen.getByRole('button', { name: /submit/i });

    //     await userEvent.type(inputFullname, 'test name');
    //     await userEvent.type(inputEmail, 'usedemail@airwallex.com');
    //     await userEvent.type(inputConfirmEmail, 'usedemail@airwallex.com');
    //     await userEvent.click(submitButton);
    //     const errorMessage = screen.getByText('Bad Request: Email is already in use');
    //     expect(errorMessage).toBeInTheDocument();
    // });
});
