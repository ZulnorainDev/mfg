import axios from "axios";

const API_BASE = "https://mfgprodbot.hellommj.com";

// ==================== COMPANY ====================

export const getCompanyInfo = () =>
  axios.get(`${API_BASE}/api/get_company_info/`);
export const saveCompanyInfo = (data) =>
  axios.post(`${API_BASE}/about_and_company_info_insert_update/`, data);
export const deleteCompanyInfo = (id) =>
  axios.delete(`${API_BASE}/delete_company_info/${id}`);

// ==================== DOCTORS ====================
export const getAllDoctors = () =>
  axios.get(`${API_BASE}/api/get_all_doctors/`);
export const getDoctor = (id) => axios.get(`${API_BASE}/Get_doctor/${id}`);
export const saveDoctor = (data) =>
  axios.post(`${API_BASE}/insert_update_single_doctors/`, data);
export const saveDoctorsBulk = (data) =>
  axios.post(`${API_BASE}/doctors/bulk/`, data);
export const deleteDoctor = (id) =>
  axios.delete(`${API_BASE}/delete_doctor/${id}`);

// ==================== MEDICAL ====================
export const getMedicalInfo = () =>
  axios.get(`${API_BASE}/api/medical_marijuana_info/`);
export const saveMedicalInfoBulk = (data) =>
  axios.post(`${API_BASE}/medical_marijuana_info_bulk/`, data);
export const updateMedicalInfo = (id, data) =>
  axios.patch(`${API_BASE}/update_medical_marijuana_info/${id}/`, data);
export const deleteMedicalInfo = (id) =>
  axios.delete(`${API_BASE}/delete_medical_marijuana_info/${id}`);

// ==================== FAQ ====================
export const getFaqs = () => axios.get(`${API_BASE}/api/get_faqs/`);
export const saveFaq = (data) =>
  axios.post(`${API_BASE}/insert_update_single_faq/`, data);
export const saveFaqsBulk = (data) =>
  axios.post(`${API_BASE}/insert_faqs_bulk/`, data);
export const deleteFaq = (id) => axios.delete(`${API_BASE}/delete_faqs/${id}`);
