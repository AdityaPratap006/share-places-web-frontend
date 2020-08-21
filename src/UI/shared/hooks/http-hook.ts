import { useState, useCallback, useRef, useEffect } from 'react';

type HttpHeaders = Headers | string[][] | Record<string, string> | undefined;
type HttpBody = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined;
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ResponseData {
    message?: string;
}

export const useHttpClient = <T extends ResponseData>() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<string>();

    const activeHttpRequests = useRef<AbortController[]>([]);

    const sendRequest = useCallback(async (url: string, method: HttpMethod = 'GET', body: HttpBody = null, headers: HttpHeaders = {}) => {
        setIsLoading(true);
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);

        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortController.signal,
            });

            const responseData: T = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortController);

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData;
        } catch (err) {
            const error = err as Error;
            setIsLoading(false);
            setResponseError(error.message.toUpperCase() || `Something went wrong, please try again.`);
            throw error;
        }
    }, []);

    const clearError = () => {
        setResponseError(undefined);
    }

    useEffect(() => {
        const currentRequests = activeHttpRequests.current;
        return () => {
            currentRequests.forEach(abortCtrl => {
                abortCtrl.abort();
            });
        };
    }, []);

    return {
        isLoading,
        responseError,
        sendRequest,
        clearError,
    };
};