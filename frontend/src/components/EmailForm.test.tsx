import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmailForm from './EmailForm';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EmailForm Component', () => {
  test('renders the form with all input fields and submit button', () => {
    render(<EmailForm />);

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company Domain')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('shows error message when fields are empty and form is submitted', () => {
    render(<EmailForm />);
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  // test('shows error message when first name or last name contains spaces', () => {
  //   render(<EmailForm />);
  //   fireEvent.change(screen.getByPlaceholderText('First Name'), {
  //     target: { value: 'John ' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Last Name'), {
  //     target: { value: 'Doe' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Company Domain'), {
  //     target: { value: 'example.com' },
  //   });
  //   fireEvent.click(screen.getByText('Submit'));
  //   expect(
  //     screen.getByText('First name and last name cannot contain spaces')
  //   ).toBeInTheDocument();
  // });

  // test('calls emailGuesserService and displays the result', async () => {
  //   mockedAxios.get.mockResolvedValue({ data: 'john.doe@example.com' });

  //   render(<EmailForm />);
  //   fireEvent.change(screen.getByPlaceholderText('First Name'), {
  //     target: { value: 'John' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Last Name'), {
  //     target: { value: 'Doe' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Company Domain'), {
  //     target: { value: 'example.com' },
  //   });
  //   fireEvent.click(screen.getByText('Submit'));

  //   expect(await screen.findByText('john.doe@example.com')).toBeInTheDocument();
  // });

  // test('displays error message when emailGuesserService fails', async () => {
  //   mockedAxios.get.mockRejectedValue(new Error('Service error'));

  //   render(<EmailForm />);
  //   fireEvent.change(screen.getByPlaceholderText('First Name'), {
  //     target: { value: 'John' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Last Name'), {
  //     target: { value: 'Doe' },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Company Domain'), {
  //     target: { value: 'example.com' },
  //   });
  //   fireEvent.click(screen.getByText('Submit'));

  //   expect(await screen.findByText('Service error')).toBeInTheDocument();
  // });
});
