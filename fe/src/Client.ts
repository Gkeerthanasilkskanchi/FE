import axios from 'axios';

export const Client = async (method: string, url: string, data?: any,) => {
  const config = {
    method: method,
    url: url,
    data: data,
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await axios(config);
  return response;
};
