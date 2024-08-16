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
    console.log(firstName, ' <> ', lastName, ' <> ', companyDomain);

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
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='First Name '
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Last Name '
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Company Domain'
          value={companyDomain}
          onChange={(e) => setCompanyDomain(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {email && <EmailResults email={email} />}
    </div>
  );
};

export default EmailForm;
