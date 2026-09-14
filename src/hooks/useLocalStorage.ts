import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
    const [valor, setValor] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(valor));
        } catch (error) {
            console.log(error);
        }
    }, [key, valor]);

    return [valor, setValor];
}