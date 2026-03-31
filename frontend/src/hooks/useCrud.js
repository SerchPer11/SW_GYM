import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createCrudService } from "@/services/apiService";

const DEFAULT_META = { current_page: 1, last_page: 1, total: 0 };
const RESERVED_RESPONSE_KEYS = new Set(["data", "meta", "links"]);

export function useCrud(endpoint, resourceName = 'register', options = {}) {
    const service = createCrudService(endpoint);
    const { includeExtras = false, extraKeys = [] } = options;

    const [data, setData] = useState([]);
    const [extras, setExtras] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [meta, setMeta] = useState(DEFAULT_META);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, clientId: null });
    const [filters, setFilters] = useState({
        search: "",
        status: ""
    });
    const [statusFilter, setStatusFilter] = useState("all");

    const extractExtras = (response) => {
        if (!includeExtras || !response || typeof response !== "object") {
            return {};
        }

        if (Array.isArray(extraKeys) && extraKeys.length > 0) {
            return extraKeys.reduce((acc, key) => {
                if (Object.prototype.hasOwnProperty.call(response, key)) {
                    acc[key] = response[key];
                }
                return acc;
            }, {});
        }

        return Object.keys(response).reduce((acc, key) => {
            if (!RESERVED_RESPONSE_KEYS.has(key)) {
                acc[key] = response[key];
            }
            return acc;
        }, {});
    };

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
            setMeta(response.meta || DEFAULT_META);
            setExtras(extractExtras(response));
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
            if (error.response) {
                toast.error(`Error al crear ${resourceName}.`);
            }

            else if (error.request) {
                console.error("No se recibió respuesta del servidor.");
                toast.error("No se recibió respuesta del servidor. Por favor, inténtalo de nuevo más tarde.");
            }

            else {
                console.error("Error de configuración:", error.message);
                toast.error("Error de configuración. Por favor, inténtalo de nuevo más tarde.");
            }
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

    return { data, extras, isLoading, page, setPage, perPage, setPerPage, filters, setFilters, statusFilter, setStatusFilter, meta, confirmModal, setConfirmModal, fetchData, getOne, create, update, remove, errors, setErrors };

}