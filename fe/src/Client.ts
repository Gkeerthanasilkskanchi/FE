import axios from 'axios';

export const Client = async (method: string, url: string, data?: any) => {
  const headers = (url === "https://g-be.onrender.com/users/products" ||  url === "https://g-be.onrender.com/users/editProduct")
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };

  const config = {
    method: method,
    url: url,
    data: data,
    headers: headers  
  };

  const response = await axios(config);
  return response;
};
