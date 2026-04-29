import api from './axios';

export const CreateDoctor = async (doctorData) => {
    try {
        const response = await api.post("/api/doctors", doctorData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to create doctor" };
    }
};

export const GetAllDoctors = async () => {
    try {
        const response = await api.get("/api/doctors");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch doctors" };
    }
};

export const GetDoctorById = async (id) => {
    try {
        const response = await api.get(`/api/doctors/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch doctor" };
    }
};

export const GetDoctorByUserId = async (userId) => {
    try {
        const response = await api.get(`/api/doctors/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch doctor by user ID" };
    }
};

export const GetDoctorsByHospitalId = async (hospitalId) => {
    try {
        const response = await api.get(`/api/doctors/hospital/${hospitalId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch doctors by hospital ID" };
    }
};

export const SearchDoctorsByName = async (name) => {
    try {
        const response = await api.get(`/api/doctors/search/name?name=${name}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to search doctors by name" };
    }
};

export const SearchDoctorsBySpecialization = async (specialization) => {
    try {
        const response = await api.get(`/api/doctors/search/specialization?specialization=${specialization}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to search doctors by specialization" };
    }
};

export const UpdateDoctor = async (id, doctorData) => {
    try {
        const response = await api.put(`/api/doctors/${id}`, doctorData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update doctor" };
    }
};

export const DeleteDoctor = async (id) => {
    try {
        const response = await api.delete(`/api/doctors/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete doctor" };
    }
};

/** Get the profile of the currently logged-in doctor (JWT-resolved on backend) */
export const GetDoctorMe = async () => {
    try {
        const response = await api.get("/api/doctors/me");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch doctor profile" };
    }
};
