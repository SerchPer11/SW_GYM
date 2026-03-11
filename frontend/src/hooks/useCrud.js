import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createCrudService } from "@/services/apiService";

export function useCrud(endpoint, resourceName = 'register') {
    const service = createCrudService(endpoint);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, clientId: null });
    const [filters, setFilters] = useState({
        search: "",
        status: ""
    });
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchData = async (currentPage = page, currentFilters = filters, currentPerPage = perPage, currentStatusFilter = statusFilter) => {
        setIsLoading(true);

        try {
            const response = await service.getAll({
                page: currentPage,
                filters: currentFilters,
                perPage: currentPerPage,
                currentStatus: currentStatusFilter
            });
            setData(response.data);
            setMeta(response.meta);
        } catch (error) {
            toast.error(`Error al cargar ${resourceName}s.`);
        } finally {
            setIsLoading(false);
        }
    };

    const getOne = async (id) => {
        setIsLoading(true);
        try {
            const response = await service.getOne(id);
            return response;
        } catch (error) {
            toast.error(`Error al cargar ${resourceName}.`);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const create = async (data) => {
        setIsLoading(true);
        setErrors({});
        try {
            await service.create(data);
            toast.success(`${resourceName} creado exitosamente.`);
            fetchData();
            return true;
        } catch (error) {
            toast.error(`Error al crear ${resourceName}.`);
            setErrors(error.response.data.errors);
            return false;
        } finally {
            setIsLoading(false);

        }
    }

    const update = async (id, data) => {
        setIsLoading(true);
        setErrors({});
        try {
            await service.update(id, data);
            toast.success(`${resourceName} actualizado exitosamente.`);
            fetchData();
            return true;
        } catch (error) {
            toast.error(`Error al actualizar ${resourceName}.`);
            setErrors(error.response.data.errors);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const remove = async (id) => {
        setIsLoading(true);
        try {
            await service.remove(confirmModal.itemId);
            toast.success(`${resourceName} eliminado exitosamente.`);
            fetchData();
            return true;
        } catch (error) {
            toast.error(`Error al eliminar ${resourceName}.`);
        } finally {
            setIsLoading(false);
            setConfirmModal({ isOpen: false, itemId: null });
            return false;
        }
    };

    useEffect(() => { fetchData(page, filters, perPage, statusFilter); }, [page]);

    useEffect(() => {
        setPage(1);
        fetchData(1, filters, perPage, statusFilter);
    }, [perPage, filters, statusFilter]);

    return { data, isLoading, page, setPage, perPage, setPerPage, filters, setFilters, statusFilter, setStatusFilter, meta, confirmModal, setConfirmModal, fetchData, getOne, create, update, remove, errors, setErrors };

}