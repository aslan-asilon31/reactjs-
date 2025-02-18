// src/api/axiosConfig.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Ganti dengan URL API Anda
  withCredentials: false, // Matikan pengiriman cookie
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // Hapus header X-CSRF-TOKEN
  },
});

export default apiClient;
