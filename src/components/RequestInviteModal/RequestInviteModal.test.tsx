// src/components/MyForm/MyForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import RequestInviteModal from './RequestInviteModal';
import userEvent from '@testing-library/user-event';

const mockFetch = jest.fn();
global.fetch = mockFetch;
const API_URL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
const TEST_NAME = 'test name';
const TEST_EMAIL = 'test@test.com';
const TEST_USED_EMAIL = 'usedemail@airwallex.com';
describe('RequestInviteModal', () => {
    beforeEach(() => {
        // Clear mock before each test
        mockFetch.mockClear();
    });
    test('handles successful form submission', async () => {
        // Mock successful API response
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Registered successfully' }),
            })
        );

        render(<RequestInviteModal visible={true} onHide={() => {}} />);
        const inputFullname = screen.getByRole('textbox', { name: /Full name/i });
        const inputEmail = screen.getByTestId('email-input');
        const inputConfirmEmail = screen.getByTestId('confirm-email-input');

        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(inputFullname, TEST_NAME);
        await userEvent.type(inputEmail, TEST_EMAIL);
        await userEvent.type(inputConfirmEmail, TEST_EMAIL);
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: TEST_NAME,
                    email: TEST_EMAIL,
                }),
            });
        });
        const successMessage = await screen.findByText('You are successfully registered!');
        expect(successMessage).toBeInTheDocument();
    });

    test('handles failed form submission', async () => {
        // Mock successful API response
        mockFetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () =>
                    Promise.resolve({ errorMessage: 'Bad Request: Email is already in use' }),
            })
        );

        render(<RequestInviteModal visible={true} onHide={() => {}} />);

        const inputFullname = screen.getByRole('textbox', { name: /Full name/i });
        const inputEmail = screen.getByTestId('email-input');
        const inputConfirmEmail = screen.getByTestId('confirm-email-input');

        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(inputFullname, TEST_NAME);
        await userEvent.type(inputEmail, TEST_USED_EMAIL);
        await userEvent.type(inputConfirmEmail, TEST_USED_EMAIL);
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: TEST_NAME,
                    email: TEST_USED_EMAIL,
                }),
            });
        });
        const successMessage = await screen.findByText('Bad Request: Email is already in use');
        expect(successMessage).toBeInTheDocument();
    });
});
