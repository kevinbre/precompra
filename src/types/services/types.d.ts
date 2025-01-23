interface IDataService {
    url: string;
    params?: {[key: string]: any};
}

interface IGeneralResponse<Q> {
    body: Q;
    error: boolean;
    status: number;
}

interface IDefaultResponse {
    Id: number;
    Message: string;
}

type IGenericResponse<T = undefined> = T extends undefined ? IDefaultResponse : T;

type Methods = "get" | "post" | "put" | "delete" | "patch";
