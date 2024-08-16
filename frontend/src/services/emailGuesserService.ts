import axios from 'axios';

const emailGuesserService = async (
  firstName: string,
  lastName: string,
  companyDomain: string
) => {
  const emailGuesserUrl = process.env.EMAIL_GUESSER_URL || '';
  console.log('Email guesser service', firstName, lastName, companyDomain);

  const result = await axios.get('http://localhost:3001/email', {
    params: {
      firstName,
      lastName,
      companyDomain,
    },
  });
  return result.data;
};

export default emailGuesserService;
