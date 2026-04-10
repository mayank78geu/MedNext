import api from './axios';

export const FindDoctor = async () => {
    try {
        const response = await api.get("/api/doctors");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Doctors not found" };
    }
};