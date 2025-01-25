
export const formatDate = (date?: string): string => {
    const newDate = date ? new Date(date) : new Date();

    return newDate.toLocaleDateString("es-ES", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    });
};