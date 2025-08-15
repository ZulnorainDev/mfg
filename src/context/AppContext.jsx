import React, { createContext, useState } from "react";
import * as api from "../api/ApiService";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicalInfo, setMedicalInfo] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navvalue, setnavvalue] = useState("home");

  // Fetch all initial data
  // const fetchAllData = async () => {
  //   setLoading(true);
  //   try {
  //     const [companyRes, doctorsRes, medicalRes, faqsRes] = await Promise.all([
  //       api.getCompanyInfo(),
  //       api.getAllDoctors(),
  //       api.getMedicalInfo(),
  //       api.getFaqs(),
  //     ]);
  //     setCompanyInfo(companyRes.data);
  //     setDoctors(doctorsRes.data);
  //     setMedicalInfo(medicalRes.data);
  //     setFaqs(faqsRes.data);

  //     console.log("hello");
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchAllData();
  // }, []);

  // CRUD Methods
  // const addOrUpdateCompanyInfo = async (data) => {
  //   await api.saveCompanyInfo(data);
  //   fetchAllData();
  // };

  // const removeCompanyInfo = async (id) => {
  //   await api.deleteCompanyInfo(id);
  //   fetchAllData();
  // };

  // const addOrUpdateDoctor = async (data) => {
  //   await api.saveDoctor(data);
  //   fetchAllData();
  // };

  // const removeDoctor = async (id) => {
  //   await api.deleteDoctor(id);
  //   fetchAllData();
  // };

  // const addOrUpdateMedicalInfo = async (data) => {
  //   await api.saveMedicalInfoBulk(data);
  //   fetchAllData();
  // };

  // const updateMedicalInfoItem = async (id, data) => {
  //   await api.updateMedicalInfo(id, data);
  //   fetchAllData();
  // };

  // const removeMedicalInfo = async (id) => {
  //   await api.deleteMedicalInfo(id);
  //   fetchAllData();
  // };

  // const addOrUpdateFaq = async (data) => {
  //   await api.saveFaq(data);
  //   fetchAllData();
  // };

  // const removeFaq = async (id) => {
  //   await api.deleteFaq(id);
  //   fetchAllData();
  // };

  //*********************************************** */ get doctors data **********************
  const fetcdochdata = async () => {
    try {
      const [doctorsRes] = await Promise.all([api.getAllDoctors()]);

      console.log("doctor res", doctorsRes);
      setDoctors(doctorsRes.data);
      console.log("doctors list : ", doctors);
    } catch (err) {
      console.log("catch error : ", err);
    }
  };

  // faq
  // Inside your Faq component
  const fetcfaqhdata = async () => {
    try {
      const [faqRes] = await Promise.all([api.getFaqs()]);
      // Reverse instead of sorting by updated_at
      const reversedFaqs = (faqRes.data || []).slice().reverse();
      setFaqs(reversedFaqs);
    } catch (err) {
      console.log("catch error : ", err);
    }
  };

  // medical info
  const fetchmedidata = async () => {
    try {
      const [mediRes] = await Promise.all([api.getMedicalInfo()]);

      console.log("all medi res", mediRes);

      // Sort by updated_at (latest first)
      const sortedData = [...mediRes.data].sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

      setMedicalInfo(sortedData);

      console.log("medi list (sorted): ", sortedData);
    } catch (err) {
      console.log("catch error : ", err);
    }
  };

  // company info
  const fetchCompanydata = async () => {
    try {
      console.log("company info fetch start");
      const [companyRes] = await Promise.all([api.getCompanyInfo()]);

      console.log("all faq res", companyRes);
      setCompanyInfo(companyRes.data);
      console.log("faq list : ", companyRes);
    } catch (err) {
      console.log("catch error : ", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        companyInfo,
        doctors,
        medicalInfo,
        faqs,
        // fetchAllData,
        // addOrUpdateCompanyInfo,
        // removeCompanyInfo,
        // addOrUpdateDoctor,
        // removeDoctor,
        // addOrUpdateMedicalInfo,
        // updateMedicalInfoItem,
        // removeMedicalInfo,
        // addOrUpdateFaq,
        // removeFaq,
        navvalue,
        setnavvalue,

        fetcdochdata,
        fetcfaqhdata,
        fetchmedidata,
        fetchCompanydata,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
