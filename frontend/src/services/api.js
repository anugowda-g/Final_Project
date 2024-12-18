//client/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
    // Customer endpoints
    getCustomers: () => axios.get(`${API_URL}/customers`),
    addCustomer: (customerData) => axios.post(`${API_URL}/customers`, customerData),
    getCustomerStats: () => axios.get(`${API_URL}/customers/stats`),
    
    // Policy endpoints
    getPolicies: () => axios.get(`${API_URL}/policies`),
    addPolicy: (policyData) => axios.post(`${API_URL}/policies`, policyData),
    getPolicyStats: () => axios.get(`${API_URL}/policies/stats`),
    getDueForRenewal: () => axios.get(`${API_URL}/policies/due-for-renewal`),


    getCampaigns: () => axios.get(`${API_URL}/campaigns`),
    createCampaign: (campaignData) => axios.post(`${API_URL}/campaigns`, campaignData),
    updateCampaign: (id, data) => axios.put(`${API_URL}/campaigns/${id}`, data),
    deleteCampaign: (id) => axios.delete(`${API_URL}/campaigns/${id}`)
};