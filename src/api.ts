import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000'
});

export const getTaxForm = (taxId: string) => {
  return api.get(`/forms/${taxId}`);
}

export const submitTaxForm = (taxId: string, data: any) => {
  return api.post(`/submissions`, { ...data, taxId });
}


export default api;
