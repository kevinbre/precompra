import {getheaders} from "./headers-service";

async function callFetch<Q>(metodo: Methods, dataService: IDataService) {
    try {
        const {url, params = {}} = dataService;

        let resp;

        const options = {
            method: metodo,
            headers: getheaders(),
        };

        if (options.method !== "get") {
            resp = await fetch(url, {...options, body: JSON.stringify(params)});
        } else {
            resp = await fetch(url, options);
        }

        const parseData = (await resp.json()) as IGeneralResponse<Q>;

        if (resp.ok) {
            return {
                ok: true,
                data: parseData.body,
                error: null,
            } as {ok: true; data: Q; error: null};
        }

        throw parseData;
    } catch (error) {
        const e = error as IGeneralResponse<Q>;

        if (e.body) {
            const errorObject = {
                statusCode: e.status,
                data: e.body,
            };

            return {
                ok: false,
                data: null,
                error: errorObject,
            } as {ok: false; data: null; error: typeof errorObject};
        }

        return {
            ok: false,
            error: {
                statusCode: 500,
                data: "Error Generico",
            },
            data: null,
        } as {ok: false; data: null; error: {statusCode: 500; data: "Error Generico"}};
    }
}

function get<Q>(dataService: IDataService) {
    return callFetch<Q>("get", dataService);
}
function post<Q>(dataService: IDataService) {
    return callFetch<Q>("post", dataService);
}
function put<Q>(dataService: IDataService) {
    return callFetch<Q>("put", dataService);
}
function patch<Q>(dataService: IDataService) {
    return callFetch<Q>("patch", dataService);
}
function remove<Q>(dataService: IDataService) {
    return callFetch<Q>("delete", dataService);
}

export {get, post, put, patch, remove};
