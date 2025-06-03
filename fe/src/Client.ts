import axios from 'axios';

export const Client = async (method: string, url: string, data?: any) => {
  const headers = (url === "http://localhost:8081/users/products" ||  url === "http://localhost:8081/users/editProduct")
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
