type GetLocalStorageResult<T> = T | null;

export function getLocalStorageUser<T>(key: string): GetLocalStorageResult<T> {
    const data = localStorage.getItem(key);

    if (data) {
        return JSON.parse(data);
    }

    return null;
}

function getheaders() {
    return {};
}

export {getheaders};
