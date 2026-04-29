import api from './axios';

export const CreateHospital = async (hospitalData) => {
    try {
        const response = await api.post("/api/hospitals", hospitalData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to create hospital" };
    }
};

export const RegisterDoctorForHospital = async (hospitalId, requestData) => {
    try {
        const response = await api.post(`/api/hospitals/${hospitalId}/doctors/register`, requestData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to register doctor for hospital" };
    }
};

export const RegisterPatientFromHospital = async (hospitalId, requestData) => {
    try {
        const response = await api.post(`/api/hospitals/${hospitalId}/patients/register`, requestData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to register patient" };
    }
};

export const GetAllHospitals = async () => {
    try {
        const response = await api.get("/api/hospitals");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch hospitals" };
    }
};

export const GetHospitalById = async (id) => {
    try {
        const response = await api.get(`/api/hospitals/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch hospital" };
    }
};

export const GetHospitalByUserId = async (userId) => {
    try {
        const response = await api.get(`/api/hospitals/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch hospital by user ID" };
    }
};

export const UpdateHospital = async (id, hospitalData) => {
    try {
        const response = await api.put(`/api/hospitals/${id}`, hospitalData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update hospital" };
    }
};

export const DeleteHospital = async (id) => {
    try {
        const response = await api.delete(`/api/hospitals/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete hospital" };
    }
};
