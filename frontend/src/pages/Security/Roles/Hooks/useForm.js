import { useCrud } from "@/hooks/useCrud";
import { useMemo, useState } from "react";

export function useForm(role, permissions = [], modules = [], onSuccessCallback) {

    const {
        create: handleCreate,
        update: handleUpdate,
        errors,
        isLoading,
    } = useCrud("security/roles", "Rol");

    const [selectedModuleKey, setSelectedModuleKey] = useState("all");

    const isEditMode = !!role;

    const moduleOptions = useMemo(
        () => [
            { label: "Todos los modulos", value: "all" },
            ...(modules?.map((module) => ({
                label: module.name,
                value: module.key,
            })) || []),
        ],
        [modules],
    );

    const filteredPermissions = useMemo(() => {
        if (selectedModuleKey === "all") {
            return permissions || [];
        }

        return (permissions || []).filter(
            (permission) => permission.module_key === selectedModuleKey,
        );
    }, [permissions, selectedModuleKey]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.permissions = formData
            .getAll("permissions")
            .filter((value) => value !== "");

        let response;

        if (isEditMode) {
            response = await handleUpdate(role.id, data);
        } else {
            response = await handleCreate(data);
        }

        if (response) {
            if (onSuccessCallback) onSuccessCallback();
        }
    };

    return {
        handleSubmit,
        errors: errors || {},
        isLoading,
        isEditMode,
        selectedModuleKey,
        setSelectedModuleKey,
        moduleOptions,
        filteredPermissions,
    };
}