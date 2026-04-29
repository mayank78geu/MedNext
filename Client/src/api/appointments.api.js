import api from './axios';

export const BookAppointment = async (appointmentData) => {
    try {
        const response = await api.post("/api/appointments", appointmentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to book appointment" };
    }
};

export const GetPatientAppointments = async () => {
    try {
        const response = await api.get("/api/appointments/patient");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch appointments" };
    }
};

export const GetAppointmentsByPatientId = async (patientId) => {
    try {
        const response = await api.get(`/api/appointments/patient/${patientId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch patient appointments" };
    }
};

export const GetAppointmentsByDoctorId = async (doctorId) => {
    try {
        const response = await api.get(`/api/appointments/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch doctor appointments" };
    }
};

export const GetAppointmentsByHospitalId = async (hospitalId) => {
    try {
        const response = await api.get(`/api/appointments/hospital/${hospitalId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch hospital appointments" };
    }
};

export const GetAppointmentsByDate = async (date) => {
    try {
        const response = await api.get(`/api/appointments/date?date=${date}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch appointments for date" };
    }
};

/** Get all appointments for the currently logged-in doctor (JWT-resolved) */
export const GetDoctorAppointments = async () => {
    try {
        const response = await api.get("/api/appointments/doctor");
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch doctor appointments" };
    }
};

