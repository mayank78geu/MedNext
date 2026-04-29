import api from './axios';

export const GetPatientById = async (id) => {
    try {
        const response = await api.get(`/api/patients/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch patient" };
    }
};

export const GetPatientByUserId = async (userId) => {
    try {
        const response = await api.get(`/api/patients/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch patient by user ID" };
    }
};

export const UpdatePatient = async (id, patientData) => {
    try {
        const response = await api.put(`/api/patients/${id}`, patientData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update patient" };
    }
};

export const UpdatePatientByUserId = async (userId, patientData) => {
    try {
        const response = await api.put(`/api/patients/user/${userId}`, patientData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update patient" };
    }
};
