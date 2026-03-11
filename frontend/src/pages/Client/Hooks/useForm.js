import { useCrud } from "@/hooks/useCrud";

export function useForm(client, onSuccessCallback) {

    const {
        create: handleCreate,
        update: handleUpdate,
        errors,
        isLoading,
    } = useCrud("/clients", "Socio");

    const isEditMode = !!client;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        let response;

        if (isEditMode) {
            response = await handleUpdate(client.id, data);
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
    };
}