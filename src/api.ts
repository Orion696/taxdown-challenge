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

export const getTaxSubmissions = (taxId: string) => {
  return api.get(`/taxes/${taxId}/submissions`);
}

export const editTaxSubmission = (taxId: string, submissionId: string, updatedSubmission: any) => {
  return api.put(`/taxes/${taxId}/submissions/${submissionId}`, updatedSubmission);
}

export const deleteTaxSubmission = (taxId: string, submissionId: string) => {
  return api.delete(`/taxes/${taxId}/submissions/${submissionId}`);
}

export default api;
