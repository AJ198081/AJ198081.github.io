import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";

import type {operations, paths} from "../assets/schema";

export const backendClient = axios.create({baseURL: `${import.meta.env.VITE_API_BASE_URL}`});

export const apiClient = <T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return backendClient.request({
        ...config
    });
}

export type BackendPaths = paths[keyof paths];

export type BackendPath = BackendPaths[keyof BackendPaths];

export type BackendOperation = BackendPath[keyof BackendPath];

export type BackendResponse<T> = T extends BackendOperation ? Awaited<ReturnType<T>> : never;


const jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhal9hZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzY4MDgwMDExLCJleHAiOjE3Njg5NDQwMTF9.eJMk2w_IScwcAyqjhZaaUs-yDL_dy4XN6Q_KywBexr2pBgKQP2ixlp-p_qYgbSLZVRlOCkhFYArrUVa0LokXcg";

backendClient.interceptors.request.use(config => {
    config.headers.set(
        'Authorization', `Bearer ${jwtToken}`
    );
    return config;
});


export const getAllProducts = () => backendClient
    .get<BackendResponse<operations["getAllProducts"]>>("/api/v1/products/all");
