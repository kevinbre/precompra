import {get, post, put, patch, remove} from "./fetch-service";

function getService<Q>(dataService: IDataService) {
    return get<Q>(dataService);
}

function postService<Q = undefined>(dataService: IDataService) {
    return post<IGenericResponse<Q>>(dataService);
}
function patchService<Q = undefined>(dataService: IDataService) {
    return patch<IGenericResponse<Q>>(dataService);
}

function putService<Q = undefined>(dataService: IDataService) {
    return put<IGenericResponse<Q>>(dataService);
}

function removeService<Q = undefined>(dataService: IDataService) {
    return remove<IGenericResponse<Q>>(dataService);
}

export {getService, postService, putService, removeService, patchService};
