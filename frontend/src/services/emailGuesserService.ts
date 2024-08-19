import axios from 'axios';

const emailGuesserService = async (
  firstName: string,
  lastName: string,
  companyDomain: string
) => {
  const emailGuesserUrl = 'http://localhost:3001/email';

  try {
    const result = await axios.get(emailGuesserUrl, {
      params: {
        firstName,
        lastName,
        companyDomain,
      },
    });
    return result.data;
  } catch (error: any) {
    throw error.response?.data.message;
  }
};

export default emailGuesserService;
