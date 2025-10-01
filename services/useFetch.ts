import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);
            const result = await fetchFunction();

            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    },[]);

    return {data, loading, error, refetch: fetchData, reset};
}

export default useFetch;