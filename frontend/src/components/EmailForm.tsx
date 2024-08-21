import React, { useState } from 'react';
// @ts-ignore
import styled from 'styled-components';
import getEmail from '../services/emailGuesserService';

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
      const emailResult: string = await getEmail(
        firstName.trim(),
        lastName.trim(),
        companyDomain.trim()
      );
      setEmail(emailResult);
      setIsLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setIsLoading(false);
    }
  };

  return (
    <EmailFormContainer>
      <Title>Email Guesser</Title>
      <Hr />
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='First Name'
          value={firstName}
          maxLength={20}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
        />
        <Input
          type='text'
          placeholder='Last Name'
          value={lastName}
          maxLength={20}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
        />
        <Input
          type='text'
          placeholder='Company Domain'
          value={companyDomain}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCompanyDomain(e.target.value)
          }
        />
        <SubmitButton type='submit'>Submit</SubmitButton>
      </Form>
      {isLoading && <p>Loading...</p>}
      {email && <EmailResult>Derived email: {email}</EmailResult>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </EmailFormContainer>
  );
};

export default EmailForm;

const EmailFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;

  &:focus {
    border-color: #4285f4;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  color: #fff;
  background-color: rgb(254, 77, 1);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(229, 69, 1);
  }
`;

const EmailResult = styled.p`
  font-size: 16px;
  color: green;
  margin-top: 3%;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 3%;
`;

const Hr = styled.hr`
  color: rgba(184, 191, 199, 0.4);
  width: 60%;
  margin-bottom: 30px;
`;
