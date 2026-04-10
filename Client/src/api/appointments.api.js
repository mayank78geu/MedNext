import api from './axios';

export const GetPatientAppointments = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await api.get("/api/appointments/patient", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch appointments" };
    }
};
