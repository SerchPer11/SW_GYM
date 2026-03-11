import api from "@/lib/axios";

export const createCrudService = (endpoint) => ({

    getAll: async (params) => {
        const response = await api.get(endpoint, { params: params });
        return response.data;
    },

    getOne: async (id) => {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data.data;
    },

    create: async (data) => {
        const response = await api.post(endpoint, data);
        return response.data.data;
    },

    update: async (id, data) => {
        const response = await api.put(`${endpoint}/${id}`, data);
        return response.data.data;
    },

    remove: async (id) => {
        const response = await api.delete(`${endpoint}/${id}`);
        return response.data.data;
    }
});