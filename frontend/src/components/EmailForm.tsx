import React, { useState } from 'react';
import '../styles/EmailForm.css';
import EmailResults from './EmailResults';
import emailGuesserService from '../services/emailGuesserService';

const EmailForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const emailResult = await emailGuesserService(
      firstName,
      lastName,
      companyDomain
    );
    setEmail(emailResult);
    setIsLoading(false);
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
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          className='last-name-input'
          placeholder='Last Name '
          value={lastName}
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
      {email && <EmailResults email={email} />}
    </div>
  );
};

export default EmailForm;
