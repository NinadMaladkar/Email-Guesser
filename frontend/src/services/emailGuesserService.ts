import axios, { AxiosResponse } from 'axios';

const getEmail = async (
  firstName: string,
  lastName: string,
  companyDomain: string
): Promise<string> => {
  const emailGuesserUrl: string = 'http://localhost:3001/email';

  try {
    const result: AxiosResponse<string> = await axios.get(emailGuesserUrl, {
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

export default getEmail;
