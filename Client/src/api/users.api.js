import api from './axios';

export const GetUserById = async (id) => {
    try {
        const response = await api.get(`/api/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch user" };
    }
};

export const GetUserByEmail = async (email) => {
    try {
        const response = await api.get(`/api/users/email?email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch user by email" };
    }
};

export const UpdateUser = async (id, userData) => {
    try {
        const response = await api.put(`/api/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update user" };
    }
};

export const DeleteUser = async (id) => {
    try {
        const response = await api.delete(`/api/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete user" };
    }
};
