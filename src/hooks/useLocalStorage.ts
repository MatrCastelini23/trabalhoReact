import { useEffect, useState } from "react";

interface IUseLocalStorageProps {
    key: string,
    value: string,
}

export function useLocalStorage(key: string, value: {}) {
    const [valor, setValor] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : value;
        } catch (error) {
            return value
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(valor));
        } catch (error) {
            console.log(error)
        }
    }, [key, valor]);

    return [valor, setValor];
}