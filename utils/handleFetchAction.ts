

export const handleFetchAction = async <T>(
    values: T, method: "POST" | "PUT" | "DELETE", url: string, 
    callback: (isCompleted: boolean, message: string) => void
) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(values),
        });

        const { message } = await response.json();

        if (!response.ok) {
            console.error("message: ", message);

            callback(false, message);
        } else {
            callback(true, message);
        }
    } catch (error) {
        callback(false, (error as Error).message);

        console.error(error);
    }
}

export const handleDeleteAction = async (
    url: string, callback: (isCompleted: boolean, message: string
) => void) => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const { message } = await response.json();

        if (!response.ok) {
            console.error("message: ", message);

            callback(false, message);
        } else {
            callback(true, message);
        }
    } catch (error) {
        callback(false, (error as Error).message);

        console.error(error);
    }
}

export const getListData = async <T>(url: string): Promise<T[]> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) return [];

        const { data } = await response.json();

        return data;
    } catch (error) {
        console.error(error);

        return [];
    }
}
