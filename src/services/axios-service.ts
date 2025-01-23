import axios, {AxiosResponse} from "axios";

import {getheaders} from "./headers-service";

const axiosInstance = axios.create({
    timeout: 8000,
});

async function callAxios<Q>(metodo: Methods, dataService: IDataService) {
    const {url, params = {}} = dataService;

    const config = {
        headers: getheaders(),
    };

    try {
        let expression: AxiosResponse<IGeneralResponse<Q>>;

        switch (metodo) {
            case "get":
                expression = await axiosInstance.get(url, config);

                break;

            case "post":
                expression = await axiosInstance.post(url, params, config);

                break;

            case "put":
                expression = await axiosInstance.put(url, params, config);

                break;

            case "patch":
                expression = await axiosInstance.patch(url, params, config);

                break;

            case "delete":
                expression = await axiosInstance.delete(url, config);

                break;

            default:
                expression = await axiosInstance.get(url, config);

                break;
        }

        const objData = {
            ok: true,
            data: expression.data.body ? expression.data.body : expression.data,
            error: null,
        };

        return objData as {ok: true; data: Q; error: null};
    } catch (error) {
        if (axios.isAxiosError<IGeneralResponse<string>>(error)) {
            let errorObject = {
                statusCode: 500,
                data: error.message,
            };

            if (error.response) {
                errorObject = {
                    statusCode: error.response.status,
                    data: error.response.data.body,
                };
            }

            return {
                ok: false,
                data: null,
                error: errorObject,
            } as {ok: false; data: null; error: typeof errorObject};
        }

        return {
            ok: false,
            data: null,
            error: {
                data: "Error Generico",
                statusCode: 500,
            },
        } as {ok: false; data: null; error: {data: "Error Generico"; statusCode: 500}};
    }
}

function get<Q>(dataService: IDataService) {
    return callAxios<Q>("get", dataService);
}
function post<Q>(dataService: IDataService) {
    return callAxios<Q>("post", dataService);
}
function put<Q>(dataService: IDataService) {
    return callAxios<Q>("put", dataService);
}
function patch<Q>(dataService: IDataService) {
    return callAxios<Q>("patch", dataService);
}
function remove<Q>(dataService: IDataService) {
    return callAxios<Q>("delete", dataService);
}

export {get, post, put, patch, remove};
