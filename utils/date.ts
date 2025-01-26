
export const formatDate = (date?: string): string => {
    const newDate = date ? new Date(date) : new Date();

    const formattedDate = newDate.toLocaleDateString("es-ES", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    return formattedDate.charAt(0).toUpperCase() + formattedDate.substring(1);
};
