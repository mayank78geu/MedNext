import api from './axios';

export const AddDoctorAvailability = async (availabilityData) => {
    try {
        const response = await api.post("/api/availability", availabilityData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to add availability" };
    }
};

export const GetDoctorAvailability = async (doctorId) => {
    try {
        const response = await api.get(`/api/availability/${doctorId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch availability" };
    }
};
