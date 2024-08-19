import React, { useState } from 'react';
import '../styles/EmailForm.css';
import emailGuesserService from '../services/emailGuesserService';

const EmailForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setEmail('');
    if (!firstName.trim() || !lastName.trim() || !companyDomain.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (firstName.trim().match(' ') || lastName.trim().match(' ')) {
      setError('First name and last name cannot contain spaces');
      setIsLoading(false);
      return;
    }

    try {
      const emailResult = await emailGuesserService(
        firstName.trim(),
        lastName.trim(),
        companyDomain
      );
      setEmail(emailResult);
      setIsLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setIsLoading(false);
    }
  };

  return (
    <div className='email-form'>
      <h1 className='email-guesser-title'>Email Guesser</h1>
      <hr className='email-guesser-hr' />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='first-name-input'
          placeholder='First Name'
          value={firstName}
          maxLength={20}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          className='last-name-input'
          placeholder='Last Name '
          value={lastName}
          maxLength={20}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type='text'
          className='company-domain-input'
          placeholder='Company Domain'
          value={companyDomain}
          onChange={(e) => setCompanyDomain(e.target.value)}
        />
        <button type='submit' className='submit-button'>
          Submit
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {email && <p className='email-result'>{email}</p>}
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
};

export default EmailForm;
