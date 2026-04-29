import api from './axios';

/** Save or update a prescription for an appointment */
export const SavePrescription = async (prescriptionData) => {
    try {
        const response = await api.post('/api/prescriptions', prescriptionData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to save prescription' };
    }
};

/** Get prescription for a specific appointment (returns null if none) */
export const GetPrescriptionByAppointment = async (appointmentId) => {
    try {
        const response = await api.get(`/api/prescriptions/appointment/${appointmentId}`);
        return response.data?.success ? response.data.data : null;
    } catch {
        return null;
    }
};

/** Get all prescriptions written by the logged-in doctor */
export const GetDoctorPrescriptions = async () => {
    try {
        const response = await api.get('/api/prescriptions/doctor');
        return response.data?.success ? (response.data.data || []) : [];
    } catch {
        return [];
    }
};

/** Get all prescriptions for a specific patient */
export const GetPatientPrescriptions = async (patientId) => {
    try {
        const response = await api.get(`/api/prescriptions/patient/${patientId}`);
        return Array.isArray(response.data) ? response.data : [];
    } catch {
        return [];
    }
};

/** Get all prescriptions for the currently logged-in patient (JWT-resolved) */
export const GetMyPrescriptions = async () => {
    try {
        const response = await api.get('/api/prescriptions/patient');
        return response.data?.success ? (response.data.data || []) : [];
    } catch {
        return [];
    }
};

